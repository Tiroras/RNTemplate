import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  SectionList,
  Text,
  View,
} from 'react-native'
import styled from 'styled-components/native'

import { useEpisodesQuery } from 'src/generated/graphql'
import { GET_LIST_OF_EPISODES } from 'src/graphql/queries/episode'
import { colors } from 'src/theme/colors'

import { EpisodesElement } from './episodes-element'
import { Episode } from './types'

const ListOfEpisodes = styled.SectionList`
  background-color: ${colors.white};
  height: 90%;
`

const Season = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.gray[0]};
  padding: 10px;
  margin-top: 20px;
`

const Pages = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

const Page = styled.Text`
  font-weight: bold;
  font-size: 20px;
`

const Buttons = styled.View`
  flex-direction: row;
`

const ButtonContainer = styled.View`
  width: 50%;
`

export const EpisodeScreen = () => {
  const [page, setPage] = useState(1)
  const { loading, error, data, fetchMore } = useEpisodesQuery()

  const DATA = [
    {
      title: 'Season 1',
      data: data?.episodes?.results?.filter((ep) =>
        ep?.episode?.includes('S01'),
      ),
    },
    {
      title: 'Season 2',
      data: data?.episodes?.results?.filter((ep) =>
        ep?.episode?.includes('S02'),
      ),
    },
    {
      title: 'Season 3',
      data: data?.episodes?.results?.filter((ep) =>
        ep?.episode?.includes('S03'),
      ),
    },
    {
      title: 'Season 4',
      data: data?.episodes?.results?.filter((ep) =>
        ep?.episode?.includes('S04'),
      ),
    },
    {
      title: 'Season 5',
      data: data?.episodes?.results?.filter((ep) =>
        ep?.episode?.includes('S05'),
      ),
    },
  ]

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>
  if (!data) return null

  const prevPageHandler = () => {
    if (page !== 1) {
      setPage(page - 1)
      fetchMore({
        query: GET_LIST_OF_EPISODES,
        variables: { page: page - 1 },
      })
    }
  }

  const nextPageHandler = () => {
    if (page !== data.episodes?.info?.pages) {
      setPage(page + 1)
      fetchMore({
        query: GET_LIST_OF_EPISODES,
        variables: { page: page + 1 },
      })
    }
  }

  const pageHandler = (selectedPage: number) => () => {
    setPage(selectedPage)
    fetchMore({
      query: GET_LIST_OF_EPISODES,
      variables: { page: selectedPage },
    })
  }

  const toFirstPageHandler = pageHandler(1)

  const toLastPageHandler = pageHandler(data.episodes.info.pages)

  return (
    <View>
      <ListOfEpisodes
        sections={DATA}
        renderItem={({ item }) => (
          <EpisodesElement
            key={item.id}
            episode={item.episode}
            air_date={item.air_date}
            name={item.name}
          />
        )}
        renderSectionHeader={({ section }) =>
          section.data.length !== 0 ? <Season>{section.title}</Season> : null
        }
      />
      <View>
        <Pages>
          <Page onPress={toFirstPageHandler}>1</Page>
          <Page>{page}</Page>
          <Page onPress={toLastPageHandler}>{data.episodes?.info?.pages}</Page>
        </Pages>
        <Buttons>
          <ButtonContainer>
            <Button
              title="Prev"
              color={colors.purple}
              onPress={prevPageHandler}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              title="Next"
              color={colors.purple}
              onPress={nextPageHandler}
            />
          </ButtonContainer>
        </Buttons>
      </View>
    </View>
  )
}

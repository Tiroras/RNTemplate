import React, { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import styled from 'styled-components/native'

import { useEpisodesQuery } from 'src/generated/graphql'
import { GET_LIST_OF_EPISODES } from 'src/graphql/queries/episode'
import { colors } from 'src/theme/colors'
import { getEpisodes } from 'src/utils/getEpisodes'

import { EpisodesElement } from './episodes-element'

const ListOfEpisodes = styled.SectionList`
  background-color: ${colors.white};
`

const Season = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.gray[0]};
  padding: 10px;
  margin-top: 20px;
`

export const EpisodeScreen = () => {
  const [page, setPage] = useState(1)
  const { loading, error, data, fetchMore } = useEpisodesQuery()

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>
  if (!data) return null

  const episodes = getEpisodes(data.episodes.results)

  const handlerEndReached = () => {
    setPage(page + 1)
    fetchMore({
      query: GET_LIST_OF_EPISODES,
      variables: { page: page + 1 },
      updateQuery: (prevRes, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevRes
        if (!prevRes) return null
        const prevEps = prevRes.episodes?.results
        const newEps = fetchMoreResult.episodes?.results
        const pageInfo = fetchMoreResult.episodes?.info

        return {
          episodes: {
            __typename: prevRes.__typename,
            results: [...prevEps, ...newEps],
            info: pageInfo,
          },
        }
      },
    })
  }

  return (
    <View>
      <ListOfEpisodes
        sections={episodes}
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
        onEndReached={handlerEndReached}
      />
    </View>
  )
}

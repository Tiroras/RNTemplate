import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'

import { useEpisodesQuery } from 'src/generated/graphql'
import { GET_LIST_OF_EPISODES } from 'src/graphql/queries/episode'
import { colors } from 'src/theme/colors'

import { EpisodesElement } from './episodes-element'
import { Episode } from './types'

const ListOfEpisodes = styled.View`
  background-color: ${colors.white};
`

const Season = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.gray[0]};
  padding: 10px;
`

const Pages = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
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

const SeasonEpisodes = styled.View`
  padding: 10px;
`

export const EpisodeScreen = () => {
  const [first_season, setFirstSeason] = useState<Episode[]>([])
  const [second_season, setSecondSeason] = useState<Episode[]>([])
  const [third_season, setThirdSeason] = useState<Episode[]>([])
  const [fourth_season, setFourthSeason] = useState<Episode[]>([])
  const [fith_season, setFifthSeason] = useState<Episode[]>([])
  const [page, setPage] = useState(1)
  const { loading, error, data, fetchMore } = useEpisodesQuery()

  useEffect(() => {
    if (data?.episodes?.results) {
      const episodes = data.episodes.results
      setFirstSeason(episodes.filter((ep) => ep.episode.includes('S01')))
      setSecondSeason(episodes.filter((ep) => ep.episode.includes('S02')))
      setThirdSeason(episodes.filter((ep) => ep.episode.includes('S03')))
      setFourthSeason(episodes.filter((ep) => ep.episode.includes('S04')))
      setFifthSeason(episodes.filter((ep) => ep.episode.includes('S05')))
    }
  }, [data?.episodes?.results])

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
    <ScrollView>
      <ListOfEpisodes>
        {first_season.length !== 0 && (
          <View>
            <Season>Season 1</Season>
            <SeasonEpisodes>
              {first_season.map((episode) => (
                <EpisodesElement
                  key={episode.id}
                  name={episode.name}
                  air_date={episode.air_date}
                  episode={episode.episode}
                />
              ))}
            </SeasonEpisodes>
          </View>
        )}
        {second_season.length !== 0 && (
          <View>
            <Season>Season 2</Season>
            <SeasonEpisodes>
              {second_season.map((episode) => (
                <EpisodesElement
                  key={episode.id}
                  name={episode.name}
                  air_date={episode.air_date}
                  episode={episode.episode}
                />
              ))}
            </SeasonEpisodes>
          </View>
        )}
        {third_season.length !== 0 && (
          <View>
            <Season>Season 3</Season>
            <SeasonEpisodes>
              {third_season.map((episode) => (
                <EpisodesElement
                  key={episode.id}
                  name={episode.name}
                  air_date={episode.air_date}
                  episode={episode.episode}
                />
              ))}
            </SeasonEpisodes>
          </View>
        )}
        {fourth_season.length !== 0 && (
          <View>
            <Season>Season 4</Season>
            <SeasonEpisodes>
              {fourth_season.map((episode) => (
                <EpisodesElement
                  key={episode.id}
                  name={episode.name}
                  air_date={episode.air_date}
                  episode={episode.episode}
                />
              ))}
            </SeasonEpisodes>
          </View>
        )}
        {fith_season.length !== 0 && (
          <View>
            <Season>Season 5</Season>
            <SeasonEpisodes>
              {fith_season.map((episode) => (
                <EpisodesElement
                  key={episode.id}
                  name={episode.name}
                  air_date={episode.air_date}
                  episode={episode.episode}
                />
              ))}
            </SeasonEpisodes>
          </View>
        )}
      </ListOfEpisodes>
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
    </ScrollView>
  )
}

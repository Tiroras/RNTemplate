import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, ScrollView, Text, View } from 'react-native'
import { useQuery } from '@apollo/client'
import styled from 'styled-components/native'

import { GET_LIST_OF_EPISODES } from 'src/graphql/queries/episode'
import { colors } from 'src/theme/colors'

import { EpisodesElement } from './element/episodes-element'
import { Episode, Episodes } from './types'

const ListOfEpisodes = styled.View`
  background-color: ${colors.white};
`

const Season = styled.Text`
  font-size: 20;
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
  const [episodes, setEpisodes] = useState<Episode[]>()
  const [first_season, setFirstSeason] = useState<Episode[]>([])
  const [second_season, setSecondSeason] = useState<Episode[]>([])
  const [third_season, setThirdSeason] = useState<Episode[]>([])
  const [fourth_season, setFourthSeason] = useState<Episode[]>([])
  const [fith_season, setFifthSeason] = useState<Episode[]>([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { loading, error, data } = useQuery<Episodes>(GET_LIST_OF_EPISODES, {
    variables: {
      page,
    },
  })

  useEffect(() => {
    if (!loading) setEpisodes(data?.episodes.results)
    if (data?.episodes.info.pages) setMaxPage(data?.episodes.info.pages)
  }, [data?.episodes.info.pages, data?.episodes.results, loading])

  useEffect(() => {
    if (episodes) {
      setFirstSeason(episodes.filter((ep) => ep.episode.includes('S01')))
      setSecondSeason(episodes.filter((ep) => ep.episode.includes('S02')))
      setThirdSeason(episodes.filter((ep) => ep.episode.includes('S03')))
      setFourthSeason(episodes.filter((ep) => ep.episode.includes('S04')))
      setFifthSeason(episodes.filter((ep) => ep.episode.includes('S05')))
    }
  }, [episodes])

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>
  if (!data) return null

  const prevPageHandler = () => {
    if (page !== 1) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  const nextPageHandler = () => {
    if (page !== maxPage) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const toFirstPageHandler = () => {
    setPage(1)
  }

  const toLastPageHandler = () => {
    setPage(maxPage)
  }

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
          <Page onPress={toLastPageHandler}>{maxPage}</Page>
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

import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useQuery } from '@apollo/client'

import { GET_LIST_OF_EPISODES } from 'src/graphql/queries/episode'

import { Episode, Episodes } from './types'

export const EpisodeScreen = () => {
  const [episodes, setEpisodes] = useState<Episode[]>()
  const [first_season, setFirstSeason] = useState()
  const { loading, error, data } = useQuery<Episodes>(GET_LIST_OF_EPISODES)

  useEffect(() => {
    if (!loading) {
      setEpisodes(data?.episodes.results)
    }
  }, [data?.episodes.results, loading])

  if (loading) return ''
  if (error) return `Error: ${error.message}`
  if (!data) return null

  return (
    <ScrollView>
      <View>
        {episodes?.map((ep) => (
          <View key={ep.id}>
            <Text>{ep.episode}</Text>
            <Text>{ep.name}</Text>
            <Text>{ep.air_date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

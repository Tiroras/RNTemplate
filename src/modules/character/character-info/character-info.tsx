import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { useQuery } from '@apollo/client'

import { GET_CHARACTER } from 'src/graphql/queries/character'
import { colors } from 'src/theme/colors'

import { CharacterInfoType } from '../types'
import { CharacterInformation } from './information/information'

interface IProps {
  id: number
}

export const CharacterInfo = ({ id }: IProps) => {
  const [character, setCharacter] = useState<CharacterInfoType>()
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: {
      id,
    },
  })

  useEffect(() => {
    if (!loading) {
      setCharacter(data.character)
    }
  }, [loading, data])

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return `Error: ${error.message}`
  if (!character) return null

  return (
    <ScrollView>
      <View>
        <View>
          <ImageBackground
            source={{ uri: 'assets/images/character/background.png' }}>
            <Image source={{ uri: character.image }} />
          </ImageBackground>
          <View>
            <Text>{character.status}</Text>
            <Text>{character.name}</Text>
            <Text>{character.species}</Text>
          </View>
        </View>
      </View>
      <CharacterInformation
        gender={character.gender}
        type={character.type}
        origin={character.origin.name}
        location={character.location}
      />
      <View>
        <Text>Episodes</Text>
        <View>
          {character.episode.map((ep) => (
            <View key={ep.id}>
              <Text>{ep.episode}</Text>
              <Text>{ep.name}</Text>
              <Text>{ep.air_date}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

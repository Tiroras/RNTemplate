import React from 'react'
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native'

import { useCharacterQuery } from 'src/generated/graphql'
import { colors } from 'src/theme/colors'

import { AboutCharacter } from './about-character'

interface IProps {
  id: number
}

export const CharacterInfo = ({ id }: IProps) => {
  const { loading, error, data } = useCharacterQuery({
    variables: { character_id: String(id) },
  })

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return `Error: ${error.message}`
  if (!data || !data.character) return null

  return (
    <ScrollView>
      <View>
        <View>
          <ImageBackground
            source={{ uri: 'assets/images/character/background.png' }}>
            {data.character.image && (
              <Image source={{ uri: data.character.image }} />
            )}
          </ImageBackground>
          <View>
            <Text>{data.character.status}</Text>
            <Text>{data.character.name}</Text>
            <Text>{data.character.species}</Text>
          </View>
        </View>
      </View>
      <AboutCharacter
        gender={data.character.gender}
        type={data.character.type}
        origin={data.character.origin.name}
        location={data.character.location}
      />
      <View>
        <Text>Episodes</Text>
        <View>
          {data.character.episode.map((ep) => (
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

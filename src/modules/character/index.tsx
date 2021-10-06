import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { useQuery } from '@apollo/client'
import styled from 'styled-components/native'

import { GET_LIST_OF_CHARACTERS } from 'src/graphql/queries/character'
import { colors } from 'src/theme/colors'
import { Character, Characters } from 'src/utils/types/character/character'

import { CharacterElement } from './list-element/character-element'

const ListOfCharacters = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const CharacterScreen = () => {
  const [characters, setCharacters] = useState<Character[]>()
  const [length, setLength] = useState(0)
  const { loading, error, data } = useQuery<Characters>(
    GET_LIST_OF_CHARACTERS,
    {
      variables: {
        page: 1,
      },
    },
  )

  useEffect(() => {
    if (!loading) {
      setCharacters(data?.characters.results)
    }
  }, [data?.characters.results, loading])

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return `Error: ${error.message}`
  if (!characters) return null

  return (
    <ScrollView>
      <ListOfCharacters>
        {characters.map((char) => (
          <CharacterElement
            key={char.id}
            image={char.image}
            status={char.status}
            name={char.name}
          />
        ))}
      </ListOfCharacters>
    </ScrollView>
  )
}

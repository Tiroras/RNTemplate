import React from 'react'
import { ActivityIndicator, FlatList, Text } from 'react-native'

import { GET_LIST_OF_CHARACTERS } from 'src/graphql/queries/character'
import { colors } from 'src/theme/colors'
import { useCharacters } from 'src/utils/hooks/useCharacters'

import { CharacterElement } from './character-element'

export const CharacterScreen = () => {
  const { loading, error, data, fetchMore } = useCharacters()

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>

  const handlerNewCharacters = () => {
    fetchMore({
      query: GET_LIST_OF_CHARACTERS,
      variables: { page: data?.characters.info.next },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult
        const newCharacters = fetchMoreResult.characters.results
        const pageInfo = fetchMoreResult.characters.info

        return newCharacters.length
          ? {
              characters: {
                __typename: prevResult.characters.__typename,
                results: [...prevResult.characters.results, ...newCharacters],
                info: pageInfo,
              },
            }
          : prevResult
      },
    })
  }

  return (
    <FlatList
      data={data?.characters.results}
      renderItem={CharacterElement}
      horizontal={false}
      numColumns={2}
      onEndReached={handlerNewCharacters}
    />
  )
}

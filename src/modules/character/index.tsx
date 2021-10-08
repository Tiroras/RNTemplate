/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text } from 'react-native'
import { useQuery } from '@apollo/client'
import styled from 'styled-components/native'

import { GET_LIST_OF_CHARACTERS } from 'src/graphql/queries/character'
import { colors } from 'src/theme/colors'

import { CharacterElement } from './character-element'
import { Character, Characters } from './types'

const ListOfCharacters = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const CharactesFlatList = styled.FlatList`
  flex-wrap: wrap;
`

export const CharacterScreen = () => {
  const { loading, error, data, fetchMore } = useQuery<Characters>(
    GET_LIST_OF_CHARACTERS,
    {
      variables: {
        page: 1,
      },
    },
  )

  useEffect(() => {
    if (!loading && data?.characters.results) {
      //setCharacters((chars) => chars.concat(data?.characters.results))
    }
  }, [data?.characters.info.pages, data?.characters.results, loading])

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>

  const handler = () => {
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
    }).catch((e) => console.log(e))
  }

  return (
    <FlatList
      data={data?.characters.results}
      renderItem={CharacterElement}
      horizontal={false}
      numColumns={2}
      onEndReached={handler}
    />
  )
}

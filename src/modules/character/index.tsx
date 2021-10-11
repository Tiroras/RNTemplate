import React, { useState } from 'react'
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { useCharactersQuery } from 'src/generated/graphql'
import { GET_LIST_OF_CHARACTERS } from 'src/graphql/queries/character'
import { colors } from 'src/theme/colors'

import { CharacterElement } from './character-element'

const ListOfCharapters = styled.FlatList`
  height: 90%;
`

const Pages = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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

export const CharacterScreen = () => {
  const { loading, error, data, fetchMore } = useCharactersQuery()
  const [page, setPage] = useState(1)

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>
  if (!data) return null

  const pageHandler = (selectedPage: number) => () => {
    setPage(selectedPage)
    fetchMore({
      query: GET_LIST_OF_CHARACTERS,
      variables: { page: selectedPage },
    })
  }

  const toFirstPageHandler = pageHandler(1)
  const toLastPageHandler = pageHandler(data.characters?.info?.pages)

  const toNextPageHandler = () => {
    if (page !== data.characters?.info?.pages) {
      setPage((prevPage) => prevPage + 1)
      fetchMore({
        query: GET_LIST_OF_CHARACTERS,
        variables: { page: page + 1 },
      })
    }
  }

  const toPrevPageHandler = () => {
    if (page !== 1) {
      setPage((prevPage) => prevPage - 1)
      fetchMore({
        query: GET_LIST_OF_CHARACTERS,
        variables: { page: page - 1 },
      })
    }
  }

  return (
    <SafeAreaView>
      <ListOfCharapters
        data={data.characters.results}
        renderItem={CharacterElement}
        horizontal={false}
        numColumns={2}
      />
      <View>
        <Pages>
          <Page onPress={toFirstPageHandler}>1</Page>
          <Page>{page}</Page>
          <Page onPress={toLastPageHandler}>
            {data.characters?.info?.pages}
          </Page>
        </Pages>
        <Buttons>
          <ButtonContainer>
            <Button
              title={'Prev'}
              onPress={toPrevPageHandler}
              color={colors.purple}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              title={'Next'}
              onPress={toNextPageHandler}
              color={colors.purple}
            />
          </ButtonContainer>
        </Buttons>
      </View>
    </SafeAreaView>
  )
}

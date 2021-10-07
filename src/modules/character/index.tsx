import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, ScrollView, Text, View } from 'react-native'
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

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const ButtonContainer = styled.View`
  width: 50%;
`

const Pagination = styled.View`
  border: 1px solid ${colors.gray[0]};
`

const Pages = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 5px;
`

const Page = styled.Text`
  font-weight: bold;
  font-size: 20px;
`

export const CharacterScreen = () => {
  const [characters, setCharacters] = useState<Character[]>()
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { loading, error, data } = useQuery<Characters>(
    GET_LIST_OF_CHARACTERS,
    {
      variables: {
        page,
      },
    },
  )

  useEffect(() => {
    if (data?.characters.info.pages) {
      setMaxPage(data?.characters.info.pages)
    }

    if (!loading) {
      setCharacters(data?.characters.results)
    }
  }, [data?.characters.info.pages, data?.characters.results, loading])

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>
  if (!characters) return null

  const prevHandler = () => {
    if (page !== 1) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  const nextHandler = () => {
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
      <Pagination>
        <Pages>
          <Page onPress={toFirstPageHandler}>1</Page>
          <Page>{page}</Page>
          <Page onPress={toLastPageHandler}>{maxPage}</Page>
        </Pages>
        <Buttons>
          <ButtonContainer>
            <Button title="Prev" onPress={prevHandler} color={colors.purple} />
          </ButtonContainer>
          <ButtonContainer>
            <Button title="Next" onPress={nextHandler} color={colors.purple} />
          </ButtonContainer>
        </Buttons>
      </Pagination>
    </ScrollView>
  )
}

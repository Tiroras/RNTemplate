import React, { useState } from 'react'
import { ActivityIndicator, Button, Text, View } from 'react-native'
import styled from 'styled-components/native'

import { useLocationsQuery } from 'src/generated/graphql'
import { GET_LIST_OF_LOCATIONS } from 'src/graphql/queries/location'
import { colors } from 'src/theme/colors'

import { LocationElement } from './location-element'

const ListOfLocations = styled.FlatList`
  background-color: ${colors.white};
  height: 90%;
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
`

const Page = styled.Text`
  font-weight: bold;
  font-size: 20px;
`

export const LocationScreen = () => {
  const [page, setPage] = useState(1)
  const { loading, error, data, fetchMore } = useLocationsQuery()

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>
  if (!data?.locations?.results) return null

  const prevHandler = () => {
    if (page !== 1) {
      setPage(page - 1)
      fetchMore({
        query: GET_LIST_OF_LOCATIONS,
        variables: { page: page - 1 },
      })
    }
  }

  const nextHandler = () => {
    if (page !== data.locations.info?.pages) {
      setPage(page + 1)
      fetchMore({
        query: GET_LIST_OF_LOCATIONS,
        variables: { page: page + 1 },
      })
    }
  }

  const pageHandler = (selectedPage: number) => () => {
    setPage(selectedPage)
    fetchMore({
      query: GET_LIST_OF_LOCATIONS,
      variables: { page: selectedPage },
    })
  }

  const toFirstPageHandler = pageHandler(1)

  const toLastPageHandler = pageHandler(data.locations.info?.pages)

  return (
    <View>
      <ListOfLocations
        data={data.locations.results}
        renderItem={LocationElement}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
      />
      <View>
        <Pagination>
          <Pages>
            <Page onPress={toFirstPageHandler}>1</Page>
            <Page>{page}</Page>
            <Page onPress={toLastPageHandler}>
              {data.locations.info?.pages}
            </Page>
          </Pages>
          <Buttons>
            <ButtonContainer>
              <Button
                title="Prev"
                onPress={prevHandler}
                color={colors.purple}
              />
            </ButtonContainer>
            <ButtonContainer>
              <Button
                title="Next"
                onPress={nextHandler}
                color={colors.purple}
              />
            </ButtonContainer>
          </Buttons>
        </Pagination>
      </View>
    </View>
  )
}

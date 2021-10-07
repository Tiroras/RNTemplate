import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, ScrollView, Text, View } from 'react-native'
import { useQuery } from '@apollo/client'
import styled from 'styled-components/native'

import { GET_LIST_OF_LOCATIONS } from 'src/graphql/queries/location'
import { colors } from 'src/theme/colors'

import { LocationElement } from './location-element/location-element'
import { Location, Locations } from './types'

const ListOfLocations = styled.View`
  background-color: ${colors.white};
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

export const LocationScreen = () => {
  const [locations, setLocations] = useState<Location[]>()
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { loading, error, data } = useQuery<Locations>(GET_LIST_OF_LOCATIONS)

  useEffect(() => {
    if (!loading) setLocations(data?.locations.results)
    if (data?.locations.info.pages) setMaxPage(data?.locations.info.pages)
  }, [data?.locations.info.pages, data?.locations.results, loading])

  if (loading) return <ActivityIndicator size="large" color={colors.purple} />
  if (error) return <Text>{`Error: ${error.message}`}</Text>
  if (!locations) return null

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
      <ListOfLocations>
        {locations.map((loc) => (
          <LocationElement key={loc.id} name={loc.name} type={loc.type} />
        ))}
      </ListOfLocations>
      <View>
        <Pagination>
          <Pages>
            <Page onPress={toFirstPageHandler}>1</Page>
            <Page>{page}</Page>
            <Page onPress={toLastPageHandler}>{maxPage}</Page>
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
    </ScrollView>
  )
}

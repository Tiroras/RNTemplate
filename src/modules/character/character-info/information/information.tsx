import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

import { colors } from 'src/theme/colors'

const CategoryHeader = styled.Text`
  font-weight: bold;
`

const CategoryText = styled.Text`
  color: ${colors.gray[4]};
`

interface IProps {
  gender: string
  origin: string
  type: string
  location: {
    id: number
    name: string
  }
}

export const CharacterInformation = (props: IProps) => {
  return (
    <View>
      <Text>Information</Text>
      <View>
        <CategoryHeader>Gender</CategoryHeader>
        <CategoryText>{props.gender}</CategoryText>
      </View>
      <View>
        <CategoryHeader>Origin</CategoryHeader>
        <CategoryText>{props.origin}</CategoryText>
      </View>
      <View>
        <CategoryHeader>Type</CategoryHeader>
        <CategoryText>{props.type}</CategoryText>
      </View>
      <View>
        <CategoryHeader>Location</CategoryHeader>
        <CategoryText>{props.location.name}</CategoryText>
      </View>
    </View>
  )
}

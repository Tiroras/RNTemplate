import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

import { colors } from './../../../theme/colors'

const Filter = styled.Text`
  color: ${colors.purple};
`

const PageName = styled.Text`
  font-size: 34px;
`

interface IProps {
  page_name: string
}

export const Header: React.FC<IProps> = ({ page_name }) => {
  return (
    <View>
      <Filter>Filter</Filter>
      <PageName>{page_name}</PageName>
    </View>
  )
}

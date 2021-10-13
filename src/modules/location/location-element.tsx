import React from 'react'
import styled from 'styled-components/native'

import { CoreLocationFieldsFragment } from 'src/generated/graphql'
import { colors } from 'src/theme/colors'

const Type = styled.Text`
  color: ${colors.gray[0]};
  font-size: 11px;
`

const Name = styled.Text`
  color: ${colors.black};
  font-weight: bold;
  font-size: 17px;
`

const Wrapper = styled.View`
  width: 180px;
  height: 110px;
  border: 1px solid ${colors.gray[0]};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`

interface IProps {
  item: CoreLocationFieldsFragment
}

export const LocationElement = ({ item }: IProps) => {
  return (
    <Wrapper>
      <Type>{item.type}</Type>
      <Name>{item.name}</Name>
    </Wrapper>
  )
}

import React from 'react'
import { Image, ImageProps, Text, View } from 'react-native'
import styled from 'styled-components/native'

import { colors } from 'src/theme/colors'
import { CoreCharacterFieldsFragment } from 'src/generated/graphql'

const Element = styled.View`
  height: 220px;
  width: 160px;
  margin: 10px;
  margin-bottom: 40px;
`

const CharacterPicture = styled.Image`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 160px;
  height: 160px;
`

const Info = styled.View`
  border: 1px solid ${colors.gray[2]};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 12px;
  height: 80px;
`

const Status = styled.Text`
  font-size: 11px;
  color: ${colors.gray[1]};
`

const Name = styled.Text`
  font-weight: bold;
`

interface IProps {
  item: CoreCharacterFieldsFragment
}

export const CharacterElement = ({ item }: IProps) => {
  if (!item) return null

  return (
    <Element>
      {item.image && <CharacterPicture source={{ uri: item.image }} />}
      <Info>
        <Status>{item.status}</Status>
        <Name>{item.name}</Name>
      </Info>
    </Element>
  )
}

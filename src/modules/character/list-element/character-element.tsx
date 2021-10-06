import React from 'react'
import { Image, ImageProps, Text, View } from 'react-native'
import styled from 'styled-components/native'

import { colors } from 'src/theme/colors'

const Element = styled.View`
  height: 220px;
  width: 160px;
  margin: 10px;
`

const CharacterPicture = styled.Image`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  image: string
  status: 'Alive' | 'Dead' | 'unknown'
  name: string
}

export const CharacterElement: React.FC<IProps> = (props) => {
  return (
    <Element>
      <CharacterPicture
        source={{ uri: props.image, width: 160, height: 140 }}
      />
      <Info>
        <Status>{props.status}</Status>
        <Name>{props.name}</Name>
      </Info>
    </Element>
  )
}

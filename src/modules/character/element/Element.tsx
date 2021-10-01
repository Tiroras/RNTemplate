import React from 'react'
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native'

interface IProps {
  name: string
  status: 'Dead' | 'Alive' | 'unknown'
  image: ImageSourcePropType
}

export const CharacherElement: React.FC<IProps> = (props) => {
  return (
    <View>
      <ImageBackground source={props.image} />
      <View>
        <Text>{props.status}</Text>
        <Text>{props.name}</Text>
      </View>
    </View>
  )
}

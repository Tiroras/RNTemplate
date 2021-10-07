import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

import { colors } from 'src/theme/colors'

const StyledEpisode = styled.Text`
  color: ${colors.black};
  font-weight: bold;
  font-size: 17px;
`

const EpisodeName = styled.Text`
  color: ${colors.gray[1]};
  font-size: 15px;
`

const EpisodeData = styled.Text`
  color: ${colors.gray[0]};
  font-weight: bold;
  font-size: 11px;
`

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${colors.gray[0]};
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
`

interface IProps {
  episode: string
  name: string
  air_date: string
}

export const EpisodesElement = ({ episode, name, air_date }: IProps) => {
  return (
    <Wrapper>
      <View>
        <StyledEpisode>{episode}</StyledEpisode>
        <EpisodeName>{name}</EpisodeName>
        <EpisodeData>{air_date}</EpisodeData>
      </View>
      <View>
        <Text>{'>'}</Text>
      </View>
    </Wrapper>
  )
}

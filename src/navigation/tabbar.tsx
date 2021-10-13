import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { CharacterScreen } from 'src/modules/character'
import { EpisodeScreen } from 'src/modules/episode'
import { LocationScreen } from 'src/modules/location'
import { colors } from 'src/theme/colors'

import { CharacterActiveIcon } from './icons/CharacterActiveIcon'
import { CharacterIcon } from './icons/CharacterIcon'
import { EpisodeActiveIcon } from './icons/EpisodeActiveIcon'
import { EpisodeIcon } from './icons/EpisodeIcon'
import { LocationActiveIcon } from './icons/LocationActiveIcon'
import { LocationIcon } from './icons/LocationIcon'
import { Routes } from './routes'

const Tab = createBottomTabNavigator()

export const TabBar = () => {
  return (
    <Tab.Navigator initialRouteName={Routes.CharacterScreen}>
      <Tab.Screen
        name={Routes.CharacterScreen}
        component={CharacterScreen}
        options={{
          headerTitle: 'Characters',
          tabBarActiveTintColor: colors.purple,
          tabBarIcon: ({ focused }) =>
            focused ? <CharacterActiveIcon /> : <CharacterIcon />,
        }}
      />
      <Tab.Screen
        name={Routes.LocationScreen}
        component={LocationScreen}
        options={{
          headerTitle: 'Location',
          tabBarActiveTintColor: colors.purple,
          tabBarIcon: ({ focused }) =>
            focused ? <LocationActiveIcon /> : <LocationIcon />,
        }}
      />

      <Tab.Screen
        name={Routes.EpisodeScreen}
        component={EpisodeScreen}
        options={{
          headerTitle: 'Episode',
          tabBarActiveTintColor: colors.purple,
          tabBarIcon: ({ focused }) =>
            focused ? <EpisodeActiveIcon /> : <EpisodeIcon />,
        }}
      />
    </Tab.Navigator>
  )
}

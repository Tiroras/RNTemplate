import {
  NavigationProp,
  useNavigation as useNativeNavigation,
} from '@react-navigation/native'

export enum Routes {
  EpisodeScreen = 'Episode',
  CharacterScreen = 'Character',
  MainNavigator = 'MainNavigator',
  LocationScreen = 'Location',
}

export const useNavigation = () =>
  useNativeNavigation<NavigationProp<Record<string, unknown>, Routes>>()

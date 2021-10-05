import { gql } from '@apollo/client'

import { CHARACTER_FRAGMENT, EPISODE_FRAGMENT } from '../fragments/Fragments'

export const GET_LIST_OF_EPISODES = gql`
  ${EPISODE_FRAGMENT}
  query Episodes($page: number) {
    episodes(page: $page) {
      results {
        ...CoreEpisodeFields
      }
    }
  }
`

export const GET_EPISODE = gql`
  ${EPISODE_FRAGMENT}
  ${CHARACTER_FRAGMENT}
  query Episode($id: number) {
    episode(id: $id) {
      ...CoreEpisodeFields
      characters {
        ...CoreCharacterFields
      }
    }
  }
`

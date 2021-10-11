import { gql } from '@apollo/client'

import { CHARACTER_FRAGMENT, EPISODE_FRAGMENT } from '../fragments/fragments'

export const GET_LIST_OF_EPISODES = gql`
  ${EPISODE_FRAGMENT}
  query Episodes($page: Int) {
    episodes(page: $page) {
      info {
        pages
        next
        count
      }
      results {
        ...CoreEpisodeFields
      }
    }
  }
`

export const GET_EPISODE = gql`
  ${EPISODE_FRAGMENT}
  ${CHARACTER_FRAGMENT}
  query Episode($id: ID!) {
    episode(id: $id) {
      ...CoreEpisodeFields
      characters {
        ...CoreCharacterFields
      }
    }
  }
`

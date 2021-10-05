import { gql } from '@apollo/client'

import { CHARACTER_FRAGMENT } from '../fragments/Fragments'

export const GET_LIST_OF_CHARACTERS = gql`
  ${CHARACTER_FRAGMENT}
  query Characters($page: number) {
    characters(page: $page) {
      results {
        ...CoreCharacterFields
      }
    }
  }
`

export const GET_CHARACTER = gql`
  ${CHARACTER_FRAGMENT}
  query Character($character_id: number) {
    character(id: $character_id) {
      ...CoreCharacterFields
      species
      origin {
        id
        name
      }
      type
      location {
        id
        name
      }
      episode {
        id
        episode
        air_date
        name
      }
    }
  }
`

import { gql } from '@apollo/client'

export const GET_LIST_OF_CHARACTERS = gql`
  query Characters($page: number) {
    characters(page: $page) {
      results {
        id
        name
        status
        gender
        image
      }
    }
  }
`

export const GET_CHARACTER = gql`
  query Character($character_id: number) {
    character(id: $character_id) {
      id
      name
      status
      gender
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

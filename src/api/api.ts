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
      origin {
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

export const GET_LIST_OF_LOCATIONS = gql`
  query Locations($page: number) {
    locations(page: $page) {
      results {
        id
        name
        type
      }
    }
  }
`

export const GET_LOCATION = gql`
  query Location($id: number) {
    location(id: $id) {
      name
      id
      type
      dimension
      residents {
        id
        name
        status
        image
      }
    }
  }
`

export const GET_LIST_OF_EPISODES = gql`
  query Episodes($page: number) {
    episodes(page: $page) {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`

export const GET_EPISODE = gql`
  query Episode($id: number) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        status
        image
      }
    }
  }
`

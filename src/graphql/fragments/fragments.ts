import { gql } from '@apollo/client'

export const CHARACTER_FRAGMENT = gql`
  fragment CoreCharacterFields on Character {
    id
    name
    status
    gender
    image
  }
`

export const EPISODE_FRAGMENT = gql`
  fragment CoreEpisodeFields on Episode {
    id
    name
    air_date
    episode
  }
`

export const LOCATION_FRAGMENT = gql`
  fragment CoreLocationFields on Location {
    id
    name
    type
  }
`

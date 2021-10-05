import { gql } from '@apollo/client'

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

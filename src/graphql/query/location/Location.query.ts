import { gql } from '@apollo/client'

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

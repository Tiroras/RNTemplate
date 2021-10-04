import { gql } from '@apollo/client'

export const GET_LIST_OF_CHARACTER = gql`
  query Characters($page: number) {
    characters(page: $page) {
      results {
        id
        name
        status
        image
      }
    }
  }
`

import { gql } from '@apollo/client'

import { CHARACTER_FRAGMENT, LOCATION_FRAGMENT } from '../fragments/Fragments'

export const GET_LIST_OF_LOCATIONS = gql`
  ${LOCATION_FRAGMENT}
  query Locations($page: number) {
    locations(page: $page) {
      results {
        ...CoreLocationFields
      }
    }
  }
`

export const GET_LOCATION = gql`
  ${LOCATION_FRAGMENT}
  ${CHARACTER_FRAGMENT}
  query Location($id: number) {
    location(id: $id) {
      ...CoreLocationFields
      dimension
      residents {
        ...CoreCharacterFields
      }
    }
  }
`

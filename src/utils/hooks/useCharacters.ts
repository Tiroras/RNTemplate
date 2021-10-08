import { useQuery } from '@apollo/client'

import { GET_LIST_OF_CHARACTERS } from 'src/graphql/queries/character'
import { Characters } from 'src/modules/character/types'

export const useCharacters = () => {
  const { loading, error, data, fetchMore } = useQuery<Characters>(
    GET_LIST_OF_CHARACTERS,
    {
      variables: {
        page: 1,
      },
    },
  )

  return { loading, error, data, fetchMore }
}

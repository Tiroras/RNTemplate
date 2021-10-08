export type Characters = {
  characters: {
    info: {
      pages: number
      next: number
    }
    results: Character[]
    __typename: string
  }
}

export type Character = {
  id: number
  name: string
  image: string
  status: 'Alive' | 'Dead' | 'unknown'
  gender: 'Male' | 'Female' | 'unknown' | 'Genderless'
}

export type CharacterInfoType = {
  id: number
  name: string
  image: string
  status: 'Alive' | 'Dead' | 'unknown'
  gender: 'Male' | 'Female' | 'unknown' | 'Genderless'
  species: string
  origin: {
    id: number
    name: string
  }
  type: string
  location: {
    id: number
    name: string
  }
  episode: {
    id: number
    episode: string
    air_date: string
    name: string
  }[]
}

export type Characters = {
  characters: {
    info: CharactersInfoType
    results: Character[]
    __typename: string
  }
}

export type CharactersInfoType = {
  pages: number
  next: number
  count: number
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
  origin: OriginType
  type: string
  location: CharLocationType
  episode: CharEpisodeType[]
}

export type OriginType = {
  id: number
  name: string
}

export type CharLocationType = {
  id: number
  name: string
}

export type CharEpisodeType = {
  id: number
  episode: string
  air_date: string
  name: string
}

export type Episodes = {
  episodes: EpisodesObject
}

export type EpisodesObject = {
  info: EpisodesInfo
  results: Episode[]
}

export type EpisodesInfo = {
  pages: number
  next: number
  count: number
}

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
}

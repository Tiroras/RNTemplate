export type Episodes = {
  episodes: {
    results: Episode[]
  }
}

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
}

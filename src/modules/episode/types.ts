export type Episodes = {
  episodes: {
    info: {
      pages: number
    }
    results: Episode[]
  }
}

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
}

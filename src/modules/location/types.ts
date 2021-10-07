export type Locations = {
  locations: {
    info: {
      pages: number
    }
    results: Location[]
  }
}

export type Location = {
  id: number
  type: string
  name: string
}

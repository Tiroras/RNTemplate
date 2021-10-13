export type Locations = {
  locations: {
    info: {
      pages: number
      next: number
      count: number
    }
    results: Location[]
  }
}

export type LocationsObject = {
  info: LocationsInfo
  results: Location[]
}

export type LocationsInfo = {
  pages: number
  next: number
  count: number
}

export type Location = {
  id: number
  type: string
  name: string
}

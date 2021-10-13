import { CoreEpisodeFieldsFragment } from 'src/generated/graphql'

export const getEpisodes = (episodes: CoreEpisodeFieldsFragment[]) => {
  return [
    {
      title: 'Season 1',
      data: episodes.filter((ep) => ep.episode?.includes('S01')),
    },
    {
      title: 'Season 2',
      data: episodes.filter((ep) => ep.episode?.includes('S02')),
    },
    {
      title: 'Season 3',
      data: episodes.filter((ep) => ep.episode?.includes('S03')),
    },
    {
      title: 'Season 4',
      data: episodes.filter((ep) => ep.episode?.includes('S04')),
    },
    {
      title: 'Season 5',
      data: episodes.filter((ep) => ep.episode?.includes('S05')),
    },
  ]
}

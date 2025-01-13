import { GuildpadConfig } from '../../config/constants/types'
import fetchGuildpad from './fetchGuildpad'

const fetchGuildpads = async (guildpadsToFetch: GuildpadConfig[]) => {
  const data = await Promise.all(
    guildpadsToFetch.map(async (guildpadConfig) => {
      const guildpad = await fetchGuildpad(guildpadConfig)
      return guildpad
    }),
  )

  return data
}

export default fetchGuildpads

import { Guildpad } from '../types'
import fetchPublicGuildpadData from './fetchPublicGuildpadData'

const fetchGuildpad = async (guildpad: Guildpad): Promise<Guildpad> => {
  const guildpadPublicData = await fetchPublicGuildpadData(guildpad)
  return { ...guildpad, ...guildpadPublicData }
}

export default fetchGuildpad

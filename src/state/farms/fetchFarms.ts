import { FarmConfig } from '../../config/constants/types'
import fetchFarm from './fetchFarm'

const fetchFarms = async (farmsToFetch: FarmConfig[], chain) => {
  const data = await Promise.all(
    farmsToFetch.map(async (farmConfig) => {
      const farm = await fetchFarm(farmConfig, chain)
      return farm
    }),
  )
  return data
}

export default fetchFarms

import { getAddress } from '../../utils/addressHelpers'
import { Guildpad } from '../types'
import { isAddress } from '../../utils'
import fetchINODetails, { fetchIDODetails } from './guildpadDataHelpers'

const fetchPublicGuildpadData = async (guildpad: Guildpad) => {
  const { contractAddress } = guildpad
  const guildpadAddress = getAddress(contractAddress)

  if (!isAddress(guildpadAddress) || guildpad.isStatic) {
    return guildpad
  }

  let data = {}

  switch (guildpad.type) {
    case 'IGO':
      data = await fetchIDODetails(guildpad)
      break
    default:
      data = await fetchINODetails(guildpad)
  }
  return {
    ...data,
  }
}

export default fetchPublicGuildpadData

import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { ARCHIVED_NODE } from '..//config/constants/endpoints'
import getRpcUrl from './getRpcUrl'

const RPC_URL = getRpcUrl()

const httpProvider = new Web3.providers.HttpProvider(RPC_URL)
const web3NoAccount = new Web3(httpProvider)

const archivedHttpProvider = new Web3.providers.HttpProvider(ARCHIVED_NODE)
export const web3WithArchivedNodeProvider = new Web3(archivedHttpProvider)

export const getWeb3NoAccount = (chainId) => {
  const RPC_URL2 = getRpcUrl(chainId)
  const httpProvider2 = new Web3.providers.HttpProvider(RPC_URL2)
  return new Web3(httpProvider2)
}

export default web3NoAccount

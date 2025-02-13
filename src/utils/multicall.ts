import Web3 from 'web3'
import { Interface } from '@ethersproject/abi'
import web3NoAccount, { getWeb3NoAccount } from './web3'
import { getMulticallContract } from './contractHelpers'
import { MAINNET_CHAIN_ID } from '../config'

interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  web3?: Web3
  blockNumber?: number
  requireSuccess?: boolean
}

const multicall = async (abi: any[], calls: Call[], options: MulticallOptions = {}, chainId = MAINNET_CHAIN_ID) => {
  const multi = getMulticallContract(options.web3 || getWeb3NoAccount(chainId), chainId)
  const itf = new Interface(abi)
  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData }: any = await multi.methods.aggregate(calldata).call(undefined, options.blockNumber)
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

  return res
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return inclues a boolean whether the call was successful e.g. [wasSuccessfull, callResult]
 */
export const multicallv2 = async (abi: any[], calls: Call[], options: MulticallOptions = {}): Promise<any> => {
  const multi = getMulticallContract(options.web3 || web3NoAccount)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const returnData: any = await multi.methods
    .tryAggregate(options.requireSuccess === undefined ? true : options.requireSuccess, calldata)
    .call(undefined, options.blockNumber)
  const res = returnData.map((call, i) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res
}

export default multicall

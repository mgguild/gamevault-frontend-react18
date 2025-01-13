import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { useAppDispatch } from '../state'
import { MAINNET_CHAIN_ID } from '../config'
import { updateUserStakedBalance, updateUserBalance } from '../state/actions'
import { stake, sousStake, sousStakeBnb, stakeFixedAprPool } from '../utils/callHelpers'
import { useMasterchef, useSousChef, useFixedAprPoolContract } from './useContract'

const useStake = (pid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string, contract: Contract) => {
      const txHash = await stake(contract ?? masterChefContract, pid, amount, account, !!contract)
      console.info(txHash)
    },
    [account, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId: number, isUsingBnb = false) => {
  const dispatch: any = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (sousId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, decimals, account)
      }
      const chain = chainId ? chainId.toString() : MAINNET_CHAIN_ID
      dispatch(updateUserStakedBalance(sousId, account, chain))
      dispatch(updateUserBalance(sousId, account, chain))
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, chainId],
  )

  return { onStake: handleStake }
}

export const useFixedAprPoolStake = (contractAddress: string) => {
  const { account } = useWeb3React()
  const fixedAprPoolContract = useFixedAprPoolContract(contractAddress)

  const handleStake = useCallback(
    async (tier: string, amount, contract?: Contract) => {
      const txHash = await stakeFixedAprPool(contract ?? fixedAprPoolContract, account, tier, amount)
      console.info(txHash)
      return txHash
    },
    [account, fixedAprPoolContract],
  )

  return { onFixedAprPoolStake: handleStake }
}

export default useStake

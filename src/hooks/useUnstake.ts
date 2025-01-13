import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from '../state'
import { MAINNET_CHAIN_ID } from '../config'
import {
  updateUserBalance,
  updateUserPendingReward,
  updateUserStakedBalance,
  updateUserFixedAprDetails,
} from '../state/actions'
import { exit, sousEmergencyUnstake, sousUnstake, unstake, unstakeFixedAprPool } from '../utils/callHelpers'
import { useLPStakingContract, useMasterchef, useSousChef, useFixedAprPoolContract } from './useContract'

export const useExit = (contract: string) => {
  const { account } = useWeb3React()
  const stakingContract: any = useLPStakingContract(contract)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await exit(stakingContract, account)
      console.info(txHash)
    },
    [account, stakingContract],
  )

  return { onUnstake: handleUnstake }
}

const useUnstake = (pid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.info(txHash)
    },
    [account, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useSousUnstake = (sousId, enableEmergencyWithdraw = false) => {
  const dispatch: any = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (enableEmergencyWithdraw) {
        const txHash = await sousEmergencyUnstake(sousChefContract, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, decimals, account)
        console.info(txHash)
      }
      const chain = chainId ? chainId.toString() : MAINNET_CHAIN_ID
      dispatch(updateUserStakedBalance(sousId, account, chain))
      dispatch(updateUserBalance(sousId, account, chain))
      dispatch(updateUserPendingReward(sousId, account, chain))
    },
    [account, chainId, dispatch, enableEmergencyWithdraw, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export const useFixedAprPoolUnstake = (sousId: number, contractAddress: string) => {
  const dispatch: any = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const fixedAprPoolContract = useFixedAprPoolContract(contractAddress)

  const handleUnstake = useCallback(
    async (id: number) => {
      const txHash = await unstakeFixedAprPool(fixedAprPoolContract, account, id)
      console.info(txHash)

      const chain = chainId ? chainId.toString() : MAINNET_CHAIN_ID
      dispatch(updateUserStakedBalance(sousId, account, chain))
      dispatch(updateUserBalance(sousId, account, chain))
      dispatch(updateUserFixedAprDetails(sousId, account, chain))

      return txHash
    },
    [account, chainId, fixedAprPoolContract, sousId, dispatch],
  )

  return { onFixedAprUnstake: handleUnstake }
}

export default useUnstake

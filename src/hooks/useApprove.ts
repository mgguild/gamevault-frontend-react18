import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from '../state'
import { MAINNET_CHAIN_ID } from '../config'
import { updateUserAllowance } from '../state/actions'
import { approve, approveContract, approveWithAmount } from '../utils/callHelpers'
import { useTranslation } from '../contexts/Localization'
import { useCake, useCakeVaultContract, useERC20, useLottery, useSousChef } from './useContract'
import useToast from './useToast'
import useLastUpdated from './useLastUpdated'

// Approve a Farm
export const useApprove = (lpContract: Contract, contractAddress: Contract) => {
  const { account } = useWeb3React()
  const handleApprove = useCallback(async () => {
    try {
      return await approve(lpContract, contractAddress, account)
    } catch (e) {
      return false
    }
  }, [account, lpContract, contractAddress])

  return { onApprove: handleApprove }
}

// Approve a Guildpad
export const useApproveGuildpad = (tokenContractAddress: string, contractAddress: string) => {
  const { account } = useWeb3React()
  const tokenContract: any = useERC20(tokenContractAddress)
  const handleApprove = useCallback(async () => {
    try {
      return await approveContract(tokenContract, contractAddress, account)
    } catch (e) {
      return false
    }
  }, [account, tokenContract, contractAddress])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId, earningTokenSymbol) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const dispatch: any = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await approve(lpContract, sousChefContract, account)
      const chain = chainId ? chainId.toString() : MAINNET_CHAIN_ID
      dispatch(updateUserAllowance(sousId, account, chain))
      if (tx) {
        toastSuccess(
          t('Contract Enabled'),
          t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol }),
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e: any) {
      console.error(e)
      toastError(t('Error'), e?.message)
      setRequestedApproval(false)
    }
  }, [
    account,
    chainId,
    dispatch,
    lpContract,
    sousChefContract,
    sousId,
    earningTokenSymbol,
    t,
    toastError,
    toastSuccess,
  ])

  return { handleApprove, requestedApproval }
}

export const useSousApproveWithAmount = (lpContract: Contract, sousId, earningTokenSymbol, stakingAmount) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const dispatch: any = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await approveWithAmount(lpContract, sousChefContract, account, stakingAmount.toString())
      const chain = chainId ? chainId.toString() : MAINNET_CHAIN_ID
      dispatch(updateUserAllowance(sousId, account, chain))
      if (tx) {
        toastSuccess(
          t('Contract Enabled'),
          t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol }),
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e: any) {
      console.error(e)
      toastError(t('Error'), e?.message)
      setRequestedApproval(false)
    }
  }, [
    account,
    chainId,
    dispatch,
    lpContract,
    sousChefContract,
    sousId,
    earningTokenSymbol,
    stakingAmount,
    t,
    toastError,
    toastSuccess,
  ])

  return { handleApprove, requestedApproval }
}

// Approve CAKE auto pool
export const useVaultApprove = (setLastUpdated: () => void) => {
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const cakeVaultContract = useCakeVaultContract()
  const cakeContract = useCake()

  const handleApprove = () => {
    cakeContract.methods
      .approve(cakeVaultContract.options.address, ethers.constants.MaxUint256)
      .send({ from: account })
      .on('sending', () => {
        setRequestedApproval(true)
      })
      .on('receipt', () => {
        toastSuccess(t('Contract Enabled'), t('You can now stake in the %symbol% vault!', { symbol: 'CAKE' }))
        setLastUpdated()
        setRequestedApproval(false)
      })
      .on('error', (error) => {
        console.error(error)
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      })
  }

  return { handleApprove, requestedApproval }
}

export const useCheckVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const cakeVaultContract = useCakeVaultContract()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response: any = await cakeContract.methods.allowance(account, cakeVaultContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, cakeContract, cakeVaultContract, lastUpdated])

  return { isVaultApproved, setLastUpdated }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      return await approve(cakeContract, lotteryContract, account)
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods.approve(spenderAddress, ethers.constants.MaxUint256).send({ from: account })
    return tx
  }, [account, spenderAddress, tokenContract])

  return onApprove
}

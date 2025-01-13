import BigNumber from 'bignumber.js'
import erc20ABI from '../../config/abi/erc20.json'
import multicall from '../../utils/multicall'
import { getAddress } from '../../utils/addressHelpers'
import { FarmConfig } from '../../config/constants/types'
import lpStakingAbi from '../../config/abi/lpStaking.json'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[], chain: string) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses, chain)
    return {
      address: lpContractAddress,
      name: 'allowance',
      params: [account, getAddress(farm.stakingAddresses, chain)],
    }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls, {}, chain)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: FarmConfig[], chain: string) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses, chain)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls, {}, chain)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: FarmConfig[], chain: string) => {
  const calls = farmsToFetch.map((farm) => {
    return {
      address: getAddress(farm.stakingAddresses, chain),
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawStakedBalances = await multicall(lpStakingAbi, calls, {}, chain)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[], chain: string) => {
  const calls = farmsToFetch.map((farm) => {
    return {
      address: getAddress(farm.stakingAddresses, chain),
      name: 'earned',
      params: [account],
    }
  })

  const rawEarnings = await multicall(lpStakingAbi, calls, {}, chain)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}

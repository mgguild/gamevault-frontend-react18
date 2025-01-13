import BigNumber from 'bignumber.js'
import masterchefABI from '../../config/abi/masterchef.json'
import { now } from 'lodash'
import erc20 from '../../config/abi/erc20.json'
import { getAddress, getMasterChefAddress } from '../../utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from '../../utils/bigNumber'
import multicall from '../../utils/multicall'
import lpStaking from '../../config/abi/lpStaking.json'
import { Farm, SerializedBigNumber } from '../types'

type PublicFarmData = {
  totalDeposits: SerializedBigNumber
  rewardRate: SerializedBigNumber
  totalRewardRate: SerializedBigNumber
  hasEnded: boolean
  remainingDays: string
  tokenAmountMc: SerializedBigNumber
  quoteTokenAmountMc: SerializedBigNumber
  tokenAmountTotal: SerializedBigNumber
  quoteTokenAmountTotal: SerializedBigNumber
  lpTotalInQuoteToken: SerializedBigNumber
  lpTotalSupply: SerializedBigNumber
  tokenPriceVsQuote: SerializedBigNumber
  poolWeight: SerializedBigNumber
  multiplier: string
}

const fetchFarm = async (farm: Farm, chain: string): Promise<any> => {
  const { pid, lpAddresses, token, quoteToken, stakingAddresses } = farm
  if (farm.chain !== chain) {
    return farm
  }
  const lpAddress = getAddress(lpAddresses, farm.chain)
  const mainTokenAddress = getAddress(token.address, chain)
  const quoteTokenAddress = getAddress(quoteToken.address, chain)
  const calls = [
    // Balance of token in the LP contract
    {
      address: mainTokenAddress,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteTokenAddress,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: mainTokenAddress,
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: quoteTokenAddress,
      name: 'decimals',
    },
  ]

  const [tokenBalanceLP, quoteTokenBalanceLP, lpTotalSupply, tokenDecimals, quoteTokenDecimals] = await multicall(
    erc20,
    calls,
    {},
    chain,
  )
  const stakingAddress = getAddress(stakingAddresses, chain)
  const lpStakingCalls = [
    // Total deposits in staking address
    {
      address: stakingAddress,
      name: 'totalSupply',
    },
    // Total deposits in staking address
    {
      address: stakingAddress,
      name: 'periodFinish',
    },
    {
      address: stakingAddress,
      name: 'rewardRate',
    },
  ]
  const [totalSupply, periodFinish, rewardRate] = await multicall(lpStaking, lpStakingCalls, {}, chain)

  // Total Deposits in staking address
  const totalDeposits = new BigNumber(totalSupply)

  // total reward rate
  const totalRewardRate = new BigNumber(rewardRate).times(60 * 60 * 24 * 7)
  const endDate = new Date(0).setUTCSeconds(periodFinish)
  const hasEnded = endDate < now()
  const remainingDays = Math.max(0, Math.ceil((endDate - now()) / 1000 / 60 / 60 / 24)).toString()

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))
  return {
    totalDeposits: totalDeposits.toJSON(),
    rewardRate: new BigNumber(rewardRate).toJSON(),
    totalRewardRate: totalRewardRate.toJSON(),
    hasEnded,
    remainingDays,
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
  }
}

export default fetchFarm

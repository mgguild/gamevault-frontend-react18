import BigNumber from 'bignumber.js'
import poolsConfig from '../../config/constants/pools'
import sousChefABI from '../../config/abi/sousChef.json'
import wbnbABI from '../../config/abi/weth.json'
import sousChefV2 from '../../config/abi/sousChefV2.json'
import fixedAprPoolABI from '../../config/abi/fixedAprPool.json'
import multicall from '../../utils/multicall'
import { getAddress, getWbnbAddress } from '../../utils/addressHelpers'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getSouschefV2Contract } from '../../utils/contractHelpers'
import { PoolCategory } from '../../config/constants/types'
import { MAINNET_CHAIN_ID, TESTNET_CHAIN_ID } from '../../config'

export const fetchPoolsBlockLimits = async (chain: string) => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0 && p.poolCategory !== PoolCategory.FIXEDAPR)

  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress, poolConfig.chain),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress, poolConfig.chain),
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock, {}, chain)
  const ends = await multicall(sousChefABI, callsEndBlock, {}, chain)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async (chain: string) => {
  const nonBnbPools = poolsConfig.filter(
    (p) => p.stakingToken.symbol !== 'BNB' && p.poolCategory !== PoolCategory.FIXEDAPR,
  )
  const bnbPool = poolsConfig.filter((p) => p.stakingToken.symbol === 'BNB')
  const fixedAprPools = poolsConfig.filter((p) => p.poolCategory === PoolCategory.FIXEDAPR)

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress, poolConfig.chain),
      name: 'totalDeposit',
      params: [],
    }
  })

  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress, poolConfig.chain)],
    }
  })

  const callsFixedAprPools = fixedAprPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress, poolConfig.chain),
      name: 'totalStaked',
      params: [],
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(sousChefV2, callsNonBnbPools, {}, chain)
  const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools, {}, chain)
  const fixedAprPoolsTotalStaked = await multicall(fixedAprPoolABI, callsFixedAprPools, {}, chain)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    })),
    ...fixedAprPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(fixedAprPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolStakingLimit = async (sousId: number): Promise<BigNumber> => {
  try {
    const sousContract = getSouschefV2Contract(sousId)
    const stakingLimit: any = await sousContract.methods.poolLimitPerUser().call()
    return new BigNumber(stakingLimit)
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit: number[],
): Promise<{ [key: string]: BigNumber }> => {
  const validPools = poolsConfig
    .filter((p) => p.stakingToken.symbol !== 'BNB' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validPools.map((validPool) => fetchPoolStakingLimit(validPool.sousId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validPools[index].sousId]: stakingLimit,
    }
  }, {})
}

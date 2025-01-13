import poolsConfig from '../../config/constants/pools'
import sousChefABI from '../../config/abi/sousChef.json'
import erc20ABI from '../../config/abi/erc20.json'
import fixedAprPoolABI from '../../config/abi/fixedAprPool.json'
import multicall from '../../utils/multicall'
import { getMasterchefContract } from '../../utils/contractHelpers'
import { getAddress } from '../../utils/addressHelpers'
import web3NoAccount from '../../utils/web3'
import BigNumber from 'bignumber.js'
import { PoolCategory, PoolConfig } from '../../config/constants/types'
import { MAINNET_CHAIN_ID, TESTNET_CHAIN_ID } from '../../config'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((p) => p.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0 && p.poolCategory !== PoolCategory.FIXEDAPR)
const fixedAPRPools = poolsConfig.filter((p) => p.poolCategory === PoolCategory.FIXEDAPR)
// const masterChefContract = getMasterchefContract()

export const fetchPoolsAllowance = async (account, chain: string) => {
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.stakingToken.address, p.chain),
    name: 'allowance',
    params: [account, getAddress(p.contractAddress, p.chain)],
  }))

  const allowances = await multicall(erc20ABI, calls, {}, chain)

  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account, chain: string) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.stakingToken.address, p.chain),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls, {}, chain)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance: any = await web3NoAccount.eth.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account, chain: string) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress, p.chain),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls, {}, chain)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const { amount: masterPoolAmount }: any = await getMasterchefContract(null, chain).methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewards = async (account, chain: string) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress, p.chain),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls, {}, chain)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward: any = await getMasterchefContract(null, chain).methods.pendingCake('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}

export const fetchFixedAPRClaimables = async (account, chain: string, fixedAprDetails) => {
  const newStakesDetails = { ...fixedAprDetails }

  await fixedAPRPools.reduce(async (promise, pool) => {
    await promise

    const callGetClaimableAmount = fixedAprDetails[pool.sousId].stakesDetails.map((stake) => ({
      address: getAddress(pool.contractAddress, pool.chain),
      name: 'getClaimableAmount',
      params: [stake.id],
    }))

    const claimables = await multicall(fixedAprPoolABI, callGetClaimableAmount, {}, chain)
    claimables.forEach((profit, index) => {
      newStakesDetails[pool.sousId].stakesDetails[index].profit = new BigNumber(profit[0]._hex).toJSON()
    })
  }, Promise.resolve())

  return newStakesDetails
}

export const fetchUserFixedAprDetails = async (account, chain: string) => {
  const callUserFixedAprStakedOf = fixedAPRPools.map((p) => ({
    address: getAddress(p.contractAddress, p.chain),
    name: 'stakedOf',
    params: [account],
  }))

  const callUserAllStakesDetails = fixedAPRPools.map((p) => ({
    address: getAddress(p.contractAddress, p.chain),
    name: 'getAllStakeDetails',
    params: [account],
  }))

  const userStakedOf = await multicall(fixedAprPoolABI, callUserFixedAprStakedOf, {}, chain)
  const allStakesDetails = await multicall(fixedAprPoolABI, callUserAllStakesDetails, {}, chain)

  const parseDetails = {}

  fixedAPRPools.forEach((p, index) => {
    const parseStakes = []

    allStakesDetails[index][0].forEach((detail) => {
      parseStakes.unshift({
        id: new BigNumber(detail.id._hex).toNumber(),
        owner: detail.owner,
        tier: new BigNumber(detail.tier._hex).toJSON(),
        amount: new BigNumber(detail.amount._hex).toJSON(),
        claimed: new BigNumber(detail.claimed._hex).toJSON(),
        stakedAt: new BigNumber(detail.stakedAt._hex).toJSON(),
        lastClaimedAt: new BigNumber(detail.lastClaimedAt._hex).toJSON(),
      })
    })

    parseDetails[p.sousId] = {
      totalStaked: new BigNumber(userStakedOf[index][0]._hex).toJSON(),
      stakesDetails: parseStakes,
    }
  })

  return parseDetails
}

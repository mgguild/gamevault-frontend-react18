import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from '../config'
import { ethers } from 'ethers'
import { Pair, Token, TokenAmount } from '@pancakeswap-libs/sdk'
import { Contract } from 'web3-eth-contract'
import { getLpContract, getLpStakingContract, getMasterchefContract } from '../utils/contractHelpers'
import farms from '../config/constants/farms'
import { getAddress, getCakeAddress } from '../utils/addressHelpers'
import tokens from '../config/constants/tokens'
import { web3WithArchivedNodeProvider } from './web3'
import { getBalanceAmount, getDecimalAmount } from './formatBalance'
import { BIG_TEN, BIG_ZERO } from './bigNumber'
import { useERC20 } from '../hooks/useContract'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveContract = async (tokenContract: Contract, spender: string, account) => {
  return tokenContract.methods.approve(spender, ethers.constants.MaxUint256).send({ from: account })
}

export const buyBox = async (inoContract, rarity, account, amount) => {
  return inoContract.methods.buy(rarity).send({ from: account, value: getDecimalAmount(amount) })
}

export const buyIgo = async (igoContract, account, amount) => {
  return igoContract.methods.buyTokens(getDecimalAmount(amount).toString()).send({ from: account })
}

export const claimVesting = async (vestingContract, account) => {
  return vestingContract.methods.claimAll().send({ from: account })
}

export const stakeFixedAprPool = async (contract, account, tier, amount) => {
  return contract.methods.stake(tier, getDecimalAmount(amount).toString()).send({ from: account })
}

export const unstakeFixedAprPool = async (contract, account, id) => {
  return contract.methods.unstake(id).send({ from: account })
}

export const approveWithAmount = async (lpContract, masterChefContract, account, amount) => {
  return lpContract.methods.approve(masterChefContract.options.address, amount).send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account, useV2 = false) => {
  if (useV2) {
    return masterChefContract.methods
      .stake(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
      .send({ from: account, gas: DEFAULT_GAS_LIMIT })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (pid === 0) {
    return masterChefContract.methods
      .enterStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
      .send({ from: account, gas: DEFAULT_GAS_LIMIT })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({
      from: account,
      gas: DEFAULT_GAS_LIMIT,
      value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
    })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  if (pid === 0) {
    return masterChefContract.methods
      .leaveStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
      .send({ from: account, gas: DEFAULT_GAS_LIMIT })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const exit = async (contract: Contract, account) => {
  return contract.methods
    .exit()
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const claim = async (contract, account) => {
  return contract.methods
    .getReward()
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  if (pid === 0) {
    return masterChefContract.methods
      .leaveStaking('0')
      .send({ from: account, gas: DEFAULT_GAS_LIMIT })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, gas: DEFAULT_GAS_LIMIT, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
const cakeBnbPid = 251
const cakeBnbFarm = farms.find((farm) => farm.pid === cakeBnbPid)

// const CAKE_TOKEN = new Token(chainId, getCakeAddress(), 18)
// const WBNB_TOKEN = new Token(chainId, tokens.wbnb.address[chainId], 18)
// const CAKE_BNB_TOKEN = new Token(chainId, getAddress(cakeBnbFarm.lpAddresses), 18)
//
// /**
//  * Returns the total CAKE staked in the CAKE-BNB LP
//  */
// export const getUserStakeInCakeBnbLp = async (account: string, block?: number) => {
//   try {
//     const masterContract = getMasterchefContract(web3WithArchivedNodeProvider)
//     const cakeBnbContract = getLpContract(getAddress(cakeBnbFarm.lpAddresses), web3WithArchivedNodeProvider)
//     const totalSupplyLP = await cakeBnbContract.methods.totalSupply().call(undefined, block)
//     const reservesLP = await cakeBnbContract.methods.getReserves().call(undefined, block)
//     const cakeBnbBalance = await masterContract.methods.userInfo(cakeBnbPid, account).call(undefined, block)
//
//     const pair: Pair = new Pair(
//       new TokenAmount(CAKE_TOKEN, reservesLP._reserve0.toString()),
//       new TokenAmount(WBNB_TOKEN, reservesLP._reserve1.toString()),
//     )
//     const cakeLPBalance = pair.getLiquidityValue(
//       pair.token0,
//       new TokenAmount(CAKE_BNB_TOKEN, totalSupplyLP.toString()),
//       new TokenAmount(CAKE_BNB_TOKEN, cakeBnbBalance.amount.toString()),
//       false,
//     )
//
//     return new BigNumber(cakeLPBalance.toSignificant(18))
//   } catch (error) {
//     console.error(`CAKE-BNB LP error: ${error}`)
//     return BIG_ZERO
//   }
// }

export const getLPStakingDetails = async (stakingAddresses, account: string) => {
  try {
    const contract = getLpStakingContract(getAddress(stakingAddresses))

    return {
      stakedTokens: await contract.methods.balanceOf(account).call(),
      totalDeposits: await contract.methods.totalSupply().call(),
      rewardRate: await contract.methods.rewardRate().call(),
    }
  } catch (error) {
    console.error(`LP Staking error: ${error}`)
    return {
      totalDeposits: '-',
    }
  }
}

/**
 * Gets the cake staked in the main pool
 */
export const getUserStakeInCakePool = async (account: string, block?: number) => {
  try {
    const masterContract = getMasterchefContract(web3WithArchivedNodeProvider)
    const response: any = await masterContract.methods.userInfo(0, account).call(undefined, block)

    return getBalanceAmount(new BigNumber(response.amount))
  } catch (error) {
    console.error('Error getting stake in CAKE pool', error)
    return BIG_ZERO
  }
}

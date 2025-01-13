import BigNumber from 'bignumber.js'
import { Guildpad } from '../types'
import { getAddress } from '../../utils/addressHelpers'
import { multicallv2 } from '../../utils/multicall'
import ino from '../../config/abi/ino.json'
import ido from '../../config/abi/ido.json'
import { getBalanceAmount, toBigNumber } from '../../utils/formatBalance'

const fetchINODetails = async (guildpad: Guildpad) => {
  const guildpadAddress = getAddress(guildpad.contractAddress)

  const calls = [
    // check if guildpad already started
    {
      address: guildpadAddress,
      name: 'isStart',
    },
    {
      address: guildpadAddress,
      name: 'getIsFinished',
    },
    {
      address: guildpadAddress,
      name: 'getTotalRaritySupply',
    },
    {
      address: guildpadAddress,
      name: 'getRarity',
      params: [1],
    },
    {
      address: guildpadAddress,
      name: 'getTotalRaritySold',
    },
    {
      address: guildpadAddress,
      name: 'getTotalRaised',
    },
    {
      address: guildpadAddress,
      name: 'getSoldRarity',
      params: [1],
    },
    {
      address: guildpadAddress,
      name: 'getLimitPerAddressEnable',
    },
    {
      address: guildpadAddress,
      name: 'getLimitPerAddress',
      params: [1],
    },
    {
      address: guildpadAddress,
      name: 'getWhitelistEnable',
    },
  ]

  const [
    hasStarted,
    hasEnded,
    totalSupply,
    boxInfo,
    totalSold,
    tRaise,
    soldRarity1,
    buyLimitEnabled,
    buyLimit,
    whitelistEnabled,
  ] = await multicallv2(ino, calls)

  const boxPrice = getBalanceAmount(new BigNumber(boxInfo.rarityPrice.toString()))
  const percentSold = new BigNumber(
    new BigNumber(soldRarity1.toString()).div(new BigNumber(boxInfo.raritySupply.toString())).toString(),
  ).multipliedBy(new BigNumber(100).toString())
  const totalRaise = getBalanceAmount(tRaise, guildpad.buyingCoin.decimals)
  const tSold = toBigNumber(totalSold)
  const remainingSupply = toBigNumber(totalSupply).minus(tSold)
  return {
    hasStarted: hasStarted[0],
    hasEnded: hasEnded[0],
    totalSupply: totalSupply.toString(),
    boxInfo: {
      1: {
        price: boxPrice.toString(),
        supply: boxInfo.raritySupply.toString(),
        sold: soldRarity1.toString(),
        percentSold: percentSold.toPrecision(4).toString(),
      },
    },
    totalSold: totalSold.toString(),
    totalRaise: totalRaise.toString(),
    buyLimitEnabled: buyLimitEnabled[0],
    buyLimit: buyLimit.toString(),
    whitelistEnabled: whitelistEnabled[0],
    remainingSupply: remainingSupply.toString(),
  }
}

export const fetchIDODetails = async (guildpad: Guildpad) => {
  const guildpadAddress = getAddress(guildpad.contractAddress)

  const calls = [
    // check if guildpad already started
    {
      address: guildpadAddress,
      name: 'isStart',
    },
    {
      address: guildpadAddress,
      name: 'isFinished',
    },
    {
      address: guildpadAddress,
      name: 'startTime',
    },
    {
      address: guildpadAddress,
      name: 'totalRewardTokens',
    },
    {
      address: guildpadAddress,
      name: 'totalRaise',
    },
    {
      address: guildpadAddress,
      name: 'tokenRate',
    },
    {
      address: guildpadAddress,
      name: 'soldAmount',
    },
    {
      address: guildpadAddress,
      name: 'totalParticipant',
    },
  ]

  // const expectedSales = tokenRate.multiply(totalForSaleTokens);
  // const totalSoldTokens = new TokenAmount(project.sellingCoin, await contract.soldAmount());
  // const remainingForSaleTokens = totalForSaleTokens.subtract(totalSoldTokens);
  // const totalParticipants = await contract.totalParticipant();
  // const percentage = totalSales.divide(expectedSales).multiply(BigInt(100));

  const [hasStarted, hasEnded, startTime, totalRewardTokens, totRaise, tokRate, soldAmount, totalParticipant] =
    await multicallv2(ido, calls)
  const expectedSales = getBalanceAmount(tokRate, guildpad.buyingCoin.decimals).multipliedBy(
    getBalanceAmount(totalRewardTokens, guildpad.buyingCoin.decimals),
  )
  const totalSupply = getBalanceAmount(totalRewardTokens, guildpad.sellingCoin.decimals)
  const totalSold = getBalanceAmount(soldAmount, guildpad.sellingCoin.decimals)
  const tokenRate = getBalanceAmount(tokRate.toString(), guildpad.buyingCoin.decimals)
  const totalRaise = getBalanceAmount(totRaise, guildpad.buyingCoin.decimals)
  const percentage = totalRaise.dividedBy(expectedSales).multipliedBy(100)

  return {
    hasStarted: hasStarted[0],
    hasEnded: hasEnded[0],
    startTime: startTime.toString(),
    totalSold: totalSold.toPrecision(6),
    totalParticipants: totalParticipant[0].toString(),
    expectedSales: expectedSales.toPrecision(),
    totalSupply: totalSupply.toPrecision(),
    remainingSupply: totalSupply.minus(totalSold).toString(),
    tokenRate: tokenRate.toPrecision(),
    totalRaise: totalRaise.toPrecision(),
    percentage: percentage.toPrecision(6),
  }
}

export default fetchINODetails

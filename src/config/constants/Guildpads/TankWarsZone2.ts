import BigNumber from 'bignumber.js'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE, DISTRIBUTION } from '../types'
import tokens from '../tokens'

const socials = {
  website: 'https://www.tankwars.zone/',
  twitter: 'https://twitter.com/TankWarsZone',
  telegram: 'https://t.me/TankWarsZone',
  discord: 'https://discord.com/invite/82jCm7QyRA',
  medium: 'https://tankwarszone.medium.com/',
}
const guildpad = {
  description:
    'Tank wars zone is a metaverse-ready exciting and visually refreshing action game built on blockchain technology. Being the first blockchain game on Fantom & invested by the Fantom Foundation, the game will have very low transactions fees, the lowest time confirmations, and supportive communities for players. With various gameplays, you can play solo, or gather your friends, form a team, and battle with others while being able to earn money just by playing or staking your NFTs.',
  socials,
  type: TYPE.INO,
  round: '2',
  distribution: DISTRIBUTION.AIRDROP,
  status: GUILDPAD_STATUS.completed,
  contractAddress: {
    97: '0xE673E67bD59A7390725ED98cBead9A5928F6f51E',
    56: '0x00e05c0d19eB1a3B504da862c47282C7Dc046934',
  },
  buyingCoin: tokens.bnb,
  sellingCoin: tokens.TankWarsZone,
  inoDetails: {
    price: '0.3073',
    boxes: '300',
    priceFiat: '126 USD',
  },
  date: {
    start: 'February 18, 2022 1PM UTC',
    end: 'February 19, 2022 1PM UTC',
  },
  boxDetails: {
    redeemInfo: 'Mystery Box can be later redeemed for Tanks after the Game Official Launch.',
    rewardList: [
      // made into array in case tokens & nfts are both rewards
      {
        description: 'There are 5 different tank rarity levels:',
        rarityLevels: [
          '5923 Common Tanks',
          '2200 Uncommon Tanks',
          '1100 Rare Tanks',
          '555 Epic Tanks',
          '222 Legendary Tanks',
        ],
      },
    ],
  },
  projectTokenEquivalent: '1425 WBOND',
  asOfPriceInProjectToken: 1645362000000,
  epochEndDate: 1645362000000,
}

export default guildpad

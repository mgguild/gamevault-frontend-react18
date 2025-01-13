import { DISTRIBUTION, GUILDPAD_STATUS, TYPE } from '../types'
import tokens from '../tokens'

const socials = {
  website: 'https://wizardia.co/35ObEcS',
  twitter: 'https://twitter.com/PlayWizardia',
  telegram: 'https://t.me/Wizardia',
  medium: 'https://medium.com/@wizardia',
}
const guildpad = {
  description:
    'Wizardia is a Play-to-Earn online role-playing strategy game with unique NFTs at its core. It’s built on three core gameplay pillars: innovative turn-based combat, player-decision driven game evolution and upgrade-based character progression. $WZRD is the Solana-powered utility token that also acts as in-game currency and can be spent as well as earned or exchanged by every player inside and outside of the game. Wizardia rewards those who contribute to the game’s metaverse and its real-valued economy system so there are no one-way investments.',
  socials,
  type: TYPE.IDO,
  round: '1',
  distribution: DISTRIBUTION.VESTING,
  distributionDesc: '20% TGE and 20% per month for next 4 months',
  status: GUILDPAD_STATUS.completed,
  contractAddress: {
    97: '0x002',
    56: '0x76B5FE982860573B5a872eE1303b32a68c8CA4A6',
  },
  buyingCoin: tokens.busd,
  sellingCoin: tokens.Wizardia,
  igoDetails: {
    price: '0.12 USD',
    fundsTarget: '60,000 USD',
  },
  date: {
    start: 'March 9, 2022 1:00 PM UTC',
    end: 'March 10, 2022 1:00 PM UTC',
  },
  // projectTokenEquivalent: '1425 WBOND',
  // asOfPriceInProjectToken: 1645362000000,
  epochEndDate: 1646917200000,
  nextRoundDate: 1646917200000,
}

export default guildpad

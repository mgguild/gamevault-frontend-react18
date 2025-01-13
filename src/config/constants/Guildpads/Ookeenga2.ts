import { DISTRIBUTION, GUILDPAD_STATUS, TYPE } from '../types'
import tokens from '../tokens'

const socials = {
  website: 'https://ookeenga.io/',
  twitter: 'https://twitter.com/ookeenga',
  telegram: 'https://t.me/ookeenga_global',
  youtube: 'https://www.youtube.com/channel/UCqQpViSkkAq_aFP3hj3GL8w',
}
const guildpad = {
  description:
    'Ookeenga (OKG) is 3D NFT gaming project which combines blockchain technology with breath-taking graphics, appealing world-building, and addictive gameplay to create a uniquely immersive play-to-earn experience developed by CROS Gamestudio and published by SPORES Network. OKG is set in a world where insects have evolved and built a massive civilization in an ancient forest called Glaik (The Sacred Forest), which divided into 2 factions: the Akhah (Pureblood) and the Ahika (Mixedblood).',
  socials,
  type: TYPE.IDO,
  round: '2',
  distribution: DISTRIBUTION.VESTING,
  distributionDesc: '5% up-front at TGE, 3 month cliff, then quarterly vesting over 4 quarters',
  status: GUILDPAD_STATUS.completed,
  contractAddress: {
    97: '0x002',
    56: '0xF8feb75031145524008C0f9565acA43599f202Ac',
  },
  buyingCoin: tokens.busd,
  sellingCoin: tokens.Ookeenga,
  igoDetails: {
    price: '0.04 USD',
    fundsTarget: '50,000 USD',
  },
  date: {
    start: 'March 26, 2022 1:00 PM UTC',
    end: 'March 27, 2022 1:00 PM UTC',
  },
  // projectTokenEquivalent: '1425 WBOND',
  // asOfPriceInProjectToken: 1645362000000,
  epochEndDate: 1648386000000,
  nextRoundDate: 1648386000000,
}

export default guildpad

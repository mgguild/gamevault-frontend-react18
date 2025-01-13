import { DISTRIBUTION, GUILDPAD_STATUS, TYPE } from '../types'
import tokens from '../tokens'

const socials = {
  // website: 'https://www.tankwars.zone/',
  twitter: 'https://twitter.com/PlayZapGames',
  telegram: 'https://t.me/playzap',
  discord: 'https://discord.com/invite/YYPAyJpyqm',
  linkedin:
    'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGAP1hx3t3v1wAAAYB7KtAINfzkAXIQsHms3BV50qReTON94f-SDPpBh8bghE9t2dA85WR3UZcILIPEqQZt3YO49k7QQu7SlW6PbwtQ1oMy7egzyzeLhFsgupoGK7TwxiURjc0=&originalReferer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fplayzap-games%2F%3FviewAsMember%3Dtrue',
}
const guildpad = {
  description:
    "The ZapVerse is a powerful ecosystem built and powered by proven solutions and infrastructure, providing a satisfying core experience to our users. Users will have a wide array of in-house and partnered games, played by thousands of people globally. Those low-skill-floor high-skill ceiling games will provide value corresponsive to the player's skill level. With a truly free-to-play economy, the monetization aspect will come directly from the players interacting actively with each other, playing games, earning prizes and exchanging assets.",
  socials,
  type: 'TBA',
  round: '1',
  distribution: 'TBA',
  status: GUILDPAD_STATUS.upcoming,
  contractAddress: {
    97: '0xE673E67bD59A7390725ED98cBead9A5928F6f51E',
    56: '0xf99869Fb775456e84Aa980f1fC104297694b8c47',
  },
  buyingCoin: tokens.bnb,
  sellingCoin: tokens.PlayZap,
  inoDetails: {
    price: 'TBA',
    boxes: 'TBA',
    priceFiat: 'TBA',
  },
  date: {
    start: 'TBA',
    end: 'TBA',
  },
  projectTokenEquivalent: 'TBA',
}

export default guildpad

import { Socials } from './types'

interface tokenSocials {
  [key: string]: Socials
}

const tokensSocials: tokenSocials = {
  mgg: {
    website: 'https://www.metagg.com/',
    twitter: 'https://twitter.com/MetaGamingGuild',
    telegram: 'https://t.me/MetaGamingGuild',
    medium: 'https://medium.com/metagamingguild',
    discord: 'https://discord.com/invite/5a7Ca7JFD2',
  },
}

export default tokensSocials

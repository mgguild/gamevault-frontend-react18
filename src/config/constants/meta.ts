import { ContextApi } from '../../contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'MetaGaming Guild',
  description: 'Stake MGG and earn token rewards',
  image: 'https://app.metagg.com/MGG.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/farms':
      return {
        title: `${t('Liquidity')} | ${t('MGG')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('MGG')}`,
      }
    case '/gamefi':
      return {
        title: `${t('GameFi Vaults')} | ${t('MGG')}`,
      }
    case '/launchpad':
      return {
        title: `${t('MetaGaming Pad')} | ${t('MGG')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('MGG')}`,
      }
    default:
      return null
  }
}

export const getPadCustomMeta = (launchpad: string): PageMeta => {
  return {
    title: `MGG Guildpad > ${launchpad}`,
  }
}

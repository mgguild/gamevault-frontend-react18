import { Language } from '@pancakeswap/uikit'

export type ContextData = {
  [key: string]: string | number;
}

export interface ProviderState {
  isFetching: boolean
  currentLanguage: Language
}

export interface ContextApi extends ProviderState {
  setLanguage: (language: Language) => void
  t: (key: string, data?: ContextData) => string
}

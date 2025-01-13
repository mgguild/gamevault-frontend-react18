import React from 'react'
import { Menu as UikitMenu } from '@metagg/mgg-uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from '../../config/localization/languages'
import { useTranslation } from '../../contexts/Localization'
import useTheme from '../../hooks/useTheme'
import useAuth from '../../hooks/useAuth'
import config from './config'

const Menu = (props) => {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { currentLanguage, setLanguage } = useTranslation()

  return (
    <UikitMenu
      network={chainId}
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      links={config}
      {...props}
    />
  )
}

export default Menu

import React from 'react'
import { Button, useWalletModal } from '@metagg/mgg-uikit'
import useAuth from '../hooks/useAuth'
import { useTranslation } from '../contexts/Localization'

const UnlockButton = (props) => {
  const { customTitle } = props
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props} fullWidth>
      {!customTitle ? 'Connect Wallet' : customTitle}
    </Button>
  )
}

export default UnlockButton

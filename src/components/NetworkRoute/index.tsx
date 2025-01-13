import React from 'react'
import { Route } from 'react-router-dom'
import { isChainSupported, getSupportedChain } from '../../utils/settings'
import NotSupported from '../../views/ComingSoon/notSupported'

interface Props {
  path: string
  Component: any
  chainSupportConfig: {
    title: string
    id: number
  }
  pageTitle: string
  exact?: boolean
}

const NetworkRoute: React.FC<Props> = ({ path, Component, chainSupportConfig, pageTitle, exact }) => {
  const { title, id } = chainSupportConfig
  return (
    <Route path={`${path}${exact ? '/*' : ''}`} >
      {isChainSupported(title, id) ? (
        <Component />
      ) : (
        <NotSupported title={pageTitle} supportedChainId={getSupportedChain(title)} />
      )}
    </Route>
  )
}

export default NetworkRoute

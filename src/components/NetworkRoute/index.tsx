import React, { ComponentProps } from 'react'
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

const NetworkRoute: React.FC<ComponentProps<any> & Props> = ({
  path,
  Component,
  chainSupportConfig,
  pageTitle,
  exact,
}) => {
  const { title, id } = chainSupportConfig;
  const isSupported = isChainSupported(title, id);

  return (
    <Route
      path={`${path}${exact ? "/*" : ""}`}
      element={
        isSupported ? (
          <Component />
        ) : (
          <NotSupported title={pageTitle} supportedChainId={getSupportedChain(title)} />
        )
      }
    />
  );
};

export default NetworkRoute

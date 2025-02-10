import React, { lazy } from 'react'
import { useWeb3React } from '@web3-react/core'
import NetworkRoute from './components/NetworkRoute'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ResetCSS } from '@metagg/mgg-uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from './hooks/useEagerConnect'
import { useFetchProfile, usePollBlockNumber, usePollCoreFarmData } from './state/hooks'
import { RedirectToFarms } from './views/Farms/Redirects'
import Footer from './components/Footer'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import NotSupported from './views/ComingSoon/notSupported'
import { getSupportedChain, isChainSupported } from './utils/settings'


const Farms = lazy(() => import('./views/Farms'))
const Pools = lazy(() => import('./views/Pools'))
// const Gamefi = lazy(() => import('./views/Gamefi'))
const ComingSoon = lazy(() => import('./views/ComingSoon'))
// const Marketplace = lazy(() => import('./views/Marketplace'))
// const NftMarket = lazy(() => import('./views/Marketplace/Market'))
// const HistoryMarketplace = lazy(() => import('./views/Marketplace/History'))
// const UserProfile = lazy(() => import('./views/Marketplace/User'))
// const NftPage = lazy(() => import('./views/Marketplace/components/NFT'))
// const Guildpad = lazy(() => import('./views/GuildPad'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Pad = lazy(() => import('./views/GuildPad/Pad'))
// const GamefiPage = lazy(() => import('./views/Gamefi/NewUI/StakingPage'))

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const ExternalRedirect = ({ to, ...routeProps }: any) => {
  return <Navigate to={to} />
}

const App: React.FC = () => {
  const { chainId } = useWeb3React()
  // usePollBlockNumber()
  // useEagerConnect()
  // useFetchProfile()
  // usePollCoreFarmData()

  return (
    <HashRouter>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Routes>
            <NetworkRoute
              path="/farms"
              Component={Farms}
              chainSupportConfig={{ title: 'LP_STAKING', id: chainId }}
              pageTitle="Farms"
            />
            <NetworkRoute
              path="/pools"
              Component={Pools}
              chainSupportConfig={{ title: 'POOL_STAKING', id: chainId }}
              pageTitle="Pools"
              exact
            />
            {/* <NetworkRoute
              path="/marketplace"
              Component={Marketplace}
              chainSupportConfig={{ title: 'MARKETPLACE', id: chainId }}
              pageTitle="Marketplace"
              exact
            />
            <NetworkRoute
              path="/marketplace/nft-market"
              Component={NftMarket}
              chainSupportConfig={{ title: 'MARKETPLACE', id: chainId }}
              pageTitle="NFT Market"
              exact
            />
            <Route
              exact
              path="/marketplace/nft-market/:nftID"
              component={(props) => {
                return isChainSupported('MARKETPLACE', chainId) ? (
                  <NftPage {...props} />
                ) : (
                  <NotSupported title="Marketplace" supportedChainId={getSupportedChain('MARKETPLACE')} />
                )
              }}
            />
            <NetworkRoute
              path="/marketplace/history"
              Component={HistoryMarketplace}
              chainSupportConfig={{ title: 'MARKETPLACE', id: chainId }}
              pageTitle="Marketplace History"
              exact
            />
            <NetworkRoute
              path="/marketplace/user-profile"
              Component={UserProfile}
              chainSupportConfig={{ title: 'MARKETPLACE', id: chainId }}
              pageTitle="Marketplace User Profile"
              exact
            />
            <NetworkRoute
              path="/gamefi"
              Component={Gamefi}
              chainSupportConfig={{ title: 'GAMEFI', id: chainId }}
              pageTitle="Gamefi Vaults"
              exact
            /> */}
            {/* <Route
              path="/gamefi/:type/:farmID"
              component={isChainSupported('GAMEFI', chainId) ? GamefiPage : NotSupported}
            /> */}
            {/* <Route path="/gamefi/:type/:farmID"
              component={(props) => {
                const { farmID, type } = props.match.params
                return isChainSupported('LAUNCHPAD', chainId) ? (
                  <GamefiPage farmID={farmID} type={type} />
                ) : (
                  <NotSupported title="Gamefi" supportedChainId={getSupportedChain('GAMEFI')} />
                )
              }}
            /> */}
            {/* <ComingSoon title="GameFi Vaults" /> */}
            {/* <NetworkRoute
              path="/launchpad"
              Component={Guildpad}
              chainSupportConfig={{ title: 'LAUNCHPAD', id: chainId }}
              pageTitle="Guildpad"
              exact
            />
            <NetworkRoute
              path="/"
              Component={Guildpad}
              chainSupportConfig={{ title: 'LAUNCHPAD', id: chainId }}
              pageTitle="Guildpad"
              exact
            />
            <Route
              path="/launchpad/:guildpadTitle"
              component={(props) => {
                const { guildpadTitle } = props.match.params
                return isChainSupported('LAUNCHPAD', chainId) ? (
                  <Pad guildpadTitle={guildpadTitle} />
                ) : (
                  <NotSupported title="Guildpad" supportedChainId={getSupportedChain('LAUNCHPAD')} />
                )
              }}
            /> */}

            <Route path="/staking">
              <Navigate to="/farms" />
            </Route>
            <Route path="/" element={ <RedirectToFarms /> } />
            {/* 404 */}
            <Route element={ <NotFound /> } />
            {/* External link for redirect */}
            <ExternalRedirect exact path="/apply" to="https://www.google.com" />
          </Routes>
        </SuspenseWithChunkError>
      </Menu>
      <Footer />
      <ToastListener />
    </HashRouter>
  )
}

export default React.memo(App)

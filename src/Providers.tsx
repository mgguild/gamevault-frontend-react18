import { ModalProvider } from '@metagg/mgg-uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { MoralisProvider } from 'react-moralis'
import { getLibrary } from './utils/web3React'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/Localization'
import { RefreshContextProvider } from './contexts/RefreshContext'
import { ToastsProvider } from './contexts/ToastsContext'
import { ComponentProps } from 'react'
import store from './state'

const Providers: React.FC<ComponentProps<any>> = ({ children }) => {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          {/* <MoralisProvider
            appId={process.env.REACT_APP_MORALIS_APP_ID}
            serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
          > */}
            <ToastsProvider>
              <HelmetProvider>
                <ThemeContextProvider>
                  <LanguageProvider>
                    <RefreshContextProvider>
                      {/* <ModalProvider> */}
                        {children}
                      {/* </ModalProvider> */}
                    </RefreshContextProvider>
                  </LanguageProvider>
                </ThemeContextProvider>
              </HelmetProvider>
            </ToastsProvider>
          {/* </MoralisProvider> */}
        </Provider>
      </Web3ReactProvider>
    )
  }
  export default Providers
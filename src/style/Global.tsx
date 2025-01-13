import { createGlobalStyle } from 'styled-components'

import { SparkSwapTheme } from '@metagg/mgg-uikit'

declare module 'styled-components' {
  export interface DefaultTheme extends SparkSwapTheme {}
}

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 12px;
    ${(props) => props.theme.mediaQueries.lg} {
      font-size: 16px;
    }
  }
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle

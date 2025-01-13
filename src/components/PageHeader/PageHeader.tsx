import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { Box } from '@pancakeswap/uikit'
import Container from '../layout/Container'

const Outer = styled(Box)<{ background?: string }>`
  background: ${({ theme, background }) =>
    theme.isDark ? `linear-gradient(0deg, rgba(43,28,0,1) 5%, rgba(16,16,16,1) 100%)` : theme.colors.modal};
  // background:  rgb(43,28,0);
  // background: linear-gradient(0deg, rgba(43,28,0,1) 5%, rgba(16,16,16,1) 100%);
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`
// { background?: string }
const PageHeader: React.FC<ComponentProps<any>> = ({ background, children, ...props }) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default PageHeader

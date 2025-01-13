import styled, { css, keyframes } from 'styled-components'
import { Card } from '@sparkpointio/sparkswap-uikit'

const PromotedGradient = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

export const StyledCard = styled.div<{ isPromotedPool?: boolean; isFinished?: boolean }>`
  border: 5px solid ${(props) => props.theme.colors.MGG_active};
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  justify-content: space-around;
  background: ${(props) => props.theme.colors.MGG_container};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 12px 46px;
  }
`

export const StyledCardInner = styled.div<{ isPromotedPool?: boolean }>`
  background: ${({ theme }) => theme.card.background};

  // border-radius: ${({ isPromotedPool, theme }) => (isPromotedPool ? '31px' : theme.radii.card)};
`

export default StyledCard

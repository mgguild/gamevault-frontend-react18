import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../contexts/Localization'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta, getPadCustomMeta } from '../../config/constants/meta'
import Container from './Container'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

export const PageMeta: React.FC<{ guildpadTitle?: string }> = ({ guildpadTitle }: any) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  // const cakePriceUsd = usePriceCakeBusd()
  // const cakePriceUsdDisplay = cakePriceUsd.gt(0)
  //   ? `$${cakePriceUsd.toNumber().toLocaleString(undefined, {
  //       minimumFractionDigits: 3,
  //       maximumFractionDigits: 3,
  //     })}`
  //   : ''
  const pageMeta = guildpadTitle ? getPadCustomMeta(guildpadTitle) : getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }

  // const pageTitle = cakePriceUsdDisplay ? [title, cakePriceUsdDisplay].join(' - ') : title

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  )
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }: any) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page

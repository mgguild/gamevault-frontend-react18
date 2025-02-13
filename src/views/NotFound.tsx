import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@sparkpointio/sparkswap-uikit'
import Page from '../components/layout/Page'
import { useTranslation } from '../contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        <img src="/logo.png" alt="LogoIcon" width="64px" style={{ marginBottom: '8px' }} />
        <Heading size="xxl">404</Heading>
        <Text mb="16px">{t('Oops, page not found.')}</Text>
        <Button as="a" href="/" size="sm">
          {t('Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound

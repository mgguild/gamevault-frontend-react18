import React from 'react'
import { Heading, Text, Button, Flex } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import Page from '../../components/layout/Page'
import MGGIcon from './assets/MGG.svg'
import { switchNetwork } from '../../utils/wallet'
import { MAINNET_CHAIN_ID } from '../../config'

const StyledComingSoon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
  & > * {
    margin: 10px 0px;
  }
`

const NotSupported: React.FC<{ title: string; supportedChainId?: number }> = ({
  title,
  supportedChainId = MAINNET_CHAIN_ID,
}: any) => {
  return (
    <Page>
      <StyledComingSoon>
        <img src={MGGIcon} alt="LogoIcon" width="140px" style={{ marginBottom: '8px' }} />
        <Flex flexDirection="column" alignItems="center">
          <Heading>The Network you are using is currently not supported</Heading>
          <Text> {title} </Text>
        </Flex>
        <Button
          onClick={async () => {
            await switchNetwork(supportedChainId)
          }}
          size="sm"
        >
          Switch to supported network
        </Button>
      </StyledComingSoon>
    </Page>
  )
}

export default NotSupported

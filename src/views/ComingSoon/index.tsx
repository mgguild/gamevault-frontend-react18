import React from 'react'
import { Heading, Text, Button, Flex } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import Page from '../../components/layout/Page'
import MGGIcon from './assets/MGG.svg'

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

const ComingSoon: React.FC<{ title: string; link?: string }> = ({ title, link }) => {
  return (
    <Page>
      <StyledComingSoon>
        <img src={MGGIcon} alt="LogoIcon" width="140px" style={{ marginBottom: '8px' }} />
        <Flex flexDirection="column" alignItems="center">
          <Heading>Coming Soon</Heading>
          <Text> {title} </Text>
        </Flex>
        <Button as="a" href={link ? `/#${link.toLowerCase()}` : '/'} size="sm">
          {' '}
          Back to {link ? title : 'Staking'}
        </Button>
      </StyledComingSoon>
    </Page>
  )
}

export default ComingSoon

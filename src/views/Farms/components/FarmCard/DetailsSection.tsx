import React from 'react'
import { useTranslation } from '../../../../contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from '@pancakeswap/uikit'

export interface ExpandableSectionProps {
  stakingAddress?: string
  lpInfoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({ stakingAddress, lpInfoAddress }: any) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      {/* <Flex justifyContent="space-between">
        <Text>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
      )} */}
      <StyledLinkExternal href={stakingAddress}>View Staking Contract</StyledLinkExternal>
      {lpInfoAddress && <StyledLinkExternal href={lpInfoAddress}>{t('See Pair Info')}</StyledLinkExternal>}
    </Wrapper>
  )
}

export default DetailsSection

import React, { useState } from 'react'
import { Button, Text, Flex, useModal, Dropdown } from '@metagg/mgg-uikit'
import { ChevronDown, ChevronUp } from 'react-feather'
import BigNumber from 'bignumber.js'
import { Token } from '../../../../../config/constants/types'
import { useTranslation } from '../../../../../contexts/Localization'
import { getFullDisplayBalance, getBalanceNumber, formatNumber } from '../../../../../utils/formatBalance'
import Balance from '../../../../../components/Balance'
import CollectModal from '../Modals/CollectModal'

interface HarvestActionsProps {
  earnings: BigNumber
  earningToken: Token
  sousId: number
  earningTokenPrice: number
  isBnbPool: boolean
  isLoading?: boolean
}

const HarvestActions: React.FC<HarvestActionsProps> = ({
  earnings,
  earningToken,
  sousId,
  isBnbPool,
  earningTokenPrice,
  isLoading = false,
}) => {
  const { t } = useTranslation()
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const earningsDollarValue = formatNumber(earningTokenDollarBalance)

  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const hasEarnings = earnings.toNumber() > 0
  const isCompoundPool = sousId === 0
  const [activeSelect, setActiveSelect] = useState(false)

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningsDollarValue}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
    />,
  )

  return (
    <Flex
      flexDirection="column"
      mb="16px"
      marginLeft="5px"
      onMouseEnter={() => setActiveSelect(true)}
      onMouseLeave={() => setActiveSelect(false)}
    >
      {/* <Flex flexDirection="column">
          {isLoading ? (
            <Skeleton width="80px" height="48px" />
          ) : (
            <>
              {hasEarnings ? (
                <Balance bold fontSize="20px" decimals={5} value={earningTokenBalance} />
              ) : (
                <Heading color="textDisabled">0</Heading>
              )}
              {earningTokenPrice !== 0 && (
                <Text fontSize="12px" color={hasEarnings ? 'textSubtle' : 'textDisabled'}>
                  ~
                  {hasEarnings ? (
                    <Balance
                      display="inline"
                      fontSize="12px"
                      color="textSubtle"
                      decimals={2}
                      value={earningTokenDollarBalance}
                      unit=" USD"
                    />
                  ) : (
                    '0 USD'
                  )}
                </Text>
              )}
            </>
          )}
        </Flex> */}

      {/* <Dropdown
            position="top"
            target={
              <Button fullWidth variant="secondary"><Text>Withdraw</Text> {activeSelect ? <ChevronDown /> : <ChevronUp />}
              </Button>
            }
          >
              <Button fullWidth>
              <Text>Claim</Text>
            </Button>
            <Button>
              <Text>Claim & Withdraw</Text>
            </Button>
          </Dropdown> */}
    </Flex>
  )
}

export default HarvestActions

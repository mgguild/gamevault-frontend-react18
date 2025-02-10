import React, { useContext, useState } from 'react'
import { Flex, Text, Button } from '@metagg/mgg-uikit'
import BigNumber from 'bignumber.js'
import { Pool } from '../../../../state/types'
import useToast from '../../../../hooks/useToast'
import { useTranslation } from '../../../../contexts/Localization'
import { useSousHarvest } from '../../../../hooks/useHarvest'
import { ThemeContext } from 'styled-components'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from '../../../../utils/formatBalance'
import Balance from '../../../../components/Balance'
import {
  ActionContainer,
  ActionContent,
  ActionTitles,
  Earned,
} from '../../../Farms/components/FarmTable/Actions/styles'

interface StakeActionsProps {
  isBnbPool: boolean
  pool: Pool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  addTokenUrl?: string
}

const ClaimAction: React.FC<StakeActionsProps> = ({
  isBnbPool,
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  addTokenUrl,
}: StakeActionsProps) => {
  const { sousId, stakingToken, userData, isAddTokenDisabled, earningToken } = pool
  const [pendingTx, setPendingTx] = useState(false)
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  const totalEarnedTokens = userData?.pendingReward ? getBalanceNumber(new BigNumber(userData.pendingReward)) : 0
  const handleHarvestConfirm = async () => {
    setPendingTx(true)
    // harvesting
    try {
      await onReward()
      toastSuccess(
        `Claimed!`,
        t('Your %symbol% earnings have been sent to your wallet!', { symbol: earningToken.symbol }),
      )
      setPendingTx(false)
    } catch (e) {
      toastError('Error, Please try again. Confirm the transaction and make sure you are paying enough gas!')
      console.error(e)
      setPendingTx(false)
    }
  }

  return (
    <ActionContainer style={{ margin: '10px 0' }}>
      <ActionTitles>
        <Text bold textTransform="uppercase" color={theme.colors.MGG_accent2} fontSize="12px" pr="4px">
          {earningToken.symbol}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          Earned
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{formatNumber(totalEarnedTokens, 2, 5)}</Earned>
        </div>
        <Button
          disabled={userData.stakedBalance.eq(0)}
          onClick={handleHarvestConfirm}
          style={{ borderRadius: '3px', height: '40px' }}
          ml="4px"
        >
          Claim
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default ClaimAction

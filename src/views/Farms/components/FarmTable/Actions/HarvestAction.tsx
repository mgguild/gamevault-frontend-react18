import React, { useContext, useState } from 'react'
import { Button, Skeleton, Text } from '@metagg/mgg-uikit'
import { ThemeContext } from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import Balance from '../../../../../components/Balance'
import { BIG_ZERO } from '../../../../../utils/bigNumber'
import { getBalanceAmount } from '../../../../../utils/formatBalance'
import { useAppDispatch } from '../../../../../state'
import { fetchFarmUserDataAsync } from '../../../../../state/farms'
import { usePriceCakeBusd } from '../../../../../state/hooks'
import { useClaim } from '../../../../../hooks/useHarvest'
import { useTranslation } from '../../../../../contexts/Localization'

import { ActionContainer, ActionContent, ActionTitles, Earned } from './styles'
import useToast from '../../../../../hooks/useToast'
import { MAINNET_CHAIN_ID } from '../../../../../config'

interface HarvestActionProps {
  pid: number
  stakingContract?: string
  tokenRewardSymbol?: string
  userData?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    earnings: string
  }
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  stakingContract,
  tokenRewardSymbol,
  pid,
  userData,
  userDataReady,
}: any) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  const cakePrice = usePriceCakeBusd()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }
  const theme = useContext(ThemeContext)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useClaim(stakingContract)
  const { t } = useTranslation()
  const dispatch: any = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const chain = chainId ? chainId.toString() : MAINNET_CHAIN_ID
  const { toastError, toastSuccess } = useToast()

  return (
    <ActionContainer style={{ margin: '10px 0' }}>
      <ActionTitles>
        <Text bold textTransform="uppercase" color={theme.colors.MGG_accent2} fontSize="12px" pr="4px">
          {tokenRewardSymbol}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Earned')}
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          {earningsBusd > 0 && (
            <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
          )}
        </div>
        <Button
          style={{ borderRadius: '3px', height: '40px' }}
          disabled={earnings.eq(0) || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onReward()
              toastSuccess(
                `${t('Claimed')}!`,
                t('Your %symbol% earnings have been sent to your wallet!', { symbol: tokenRewardSymbol }),
              )
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid], chain }))
          }}
          ml="4px"
        >
          {t('Claim')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction

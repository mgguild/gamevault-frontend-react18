import React, { useState } from 'react'
import { Skeleton, useTooltip } from '@pancakeswap/uikit'
import { Button, Flex, useModal } from '@metagg/mgg-uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from '../../../../../contexts/Localization'
import { getBalanceNumber, getFullDisplayBalance } from '../../../../../utils/formatBalance'
import { Pool } from '../../../../../state/types'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'
import { useSousUnstake } from '../../../../../hooks/useUnstake'
import useToast from '../../../../../hooks/useToast'

interface StakeActionsProps {
  pool: Pool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
}

const StakeAction: React.FC<StakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakedBalance,
  isBnbPool,
  isStaked,
  isLoading = false,
}: any) => {
  const { stakingToken, stakingTokenPrice, stakingLimit, isFinished, userData } = pool
  const { t } = useTranslation()
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const [pendingTx, setPendingTx] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { onUnstake } = useSousUnstake(pool.sousId, false)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
  )

  const handleUnstake = async () => {
    setPendingTx(true)
    // unstaking
    try {
      await onUnstake(
        getFullDisplayBalance(new BigNumber(userData.stakedBalance), stakingToken.decimals, 18),
        stakingToken.decimals,
      )
      toastSuccess(
        `${t('Unstaked')}!`,
        t('Your %symbol% earnings have also been claimed to your wallet!', {
          symbol: pool.earningToken.symbol,
        }),
      )
      setPendingTx(false)
    } catch (e) {
      toastError(t('Canceled'), t('Please try again and confirm the transaction.'))
      setPendingTx(false)
    }
  }

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('You’ve already staked the maximum amount you can stake in this pool!'),
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  const renderStakeAction = () => {
    // isStaked ? (
    //   <Flex justifyContent="space-between" alignItems="center">
    //     <Flex flexDirection="column">
    //       <>
    //         <Balance bold fontSize="20px" decimals={3} value={stakedTokenBalance} />
    //         {stakingTokenPrice !== 0 && (
    //           <Text fontSize="12px" color="textSubtle">
    //             <Balance
    //               fontSize="12px"
    //               color="textSubtle"
    //               decimals={2}
    //               value={stakedTokenDollarBalance}
    //               prefix="~"
    //               unit=" USD"
    //             />
    //           </Text>
    //         )}
    //       </>
    //     </Flex>
    //     <Flex>
    //       <IconButton variant="secondary" onClick={onPresentUnstake} mr="6px">
    //         <MinusIcon color="primary" width="24px" />
    //       </IconButton>
    //       {reachStakingLimit ? (
    //         <span ref={targetRef}>
    //           <IconButton variant="secondary" disabled>
    //             <AddIcon color="textDisabled" width="24px" height="24px" />
    //           </IconButton>
    //         </span>
    //       ) : (
    //         <IconButton
    //           variant="secondary"
    //           onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
    //           disabled={isFinished}
    //         >
    //           <AddIcon color="primary" width="24px" height="24px" />
    //         </IconButton>
    //       )}
    //     </Flex>
    //     {tooltipVisible && tooltip}
    //   </Flex>
    // ) :

    // Reserve function for future use
    // <Button disabled={isFinished} onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired} fullWidth>
    return (
      <Button
        fullWidth
        disabled={isFinished && stakedBalance.isEqualTo(0)}
        onClick={isFinished && stakedBalance.isGreaterThan(0) ? handleUnstake : onPresentStake}
      >
        {isFinished && stakedBalance.isGreaterThan(0) ? 'Withdraw' : 'Deposit'}
      </Button>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      {isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}
    </Flex>
  )
}

export default StakeAction

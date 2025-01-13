import { useCallback, useState } from 'react'
import { useApproveGuildpad, useLotteryApprove } from './useApprove'

export const useApproval = (onPresentApprove: () => void) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { onApprove } = useLotteryApprove()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
      onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, onPresentApprove])

  return { handleApprove, requestedApproval }
}

export const useGuildpadApproval = (tokenAddress: string, spenderAddress: string) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { onApprove } = useApproveGuildpad(tokenAddress, spenderAddress)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  return { handleApprove, requestedApproval }
}

export default useApproval

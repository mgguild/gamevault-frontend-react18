import { useEffect, useRef } from 'react'

/**
 * Returns the previous value of the given value
 *
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
const usePreviousValue = (value: any) => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

export default usePreviousValue

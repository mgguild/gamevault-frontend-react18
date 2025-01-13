import React, { useRef, useEffect } from 'react'

function usePrevious(value) {
  const ref = React.useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export default usePrevious

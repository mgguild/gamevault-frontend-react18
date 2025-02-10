import React from 'react'
import { Navigate } from 'react-router-dom'

export function RedirectToFarms({ location }: any) {
  return <Navigate to={{ ...location, pathname: '/farms' }} />
}

export function RedirectToPools({ location }: any) {
  return <Navigate to={{ ...location, pathname: '/liquidity' }} />
}

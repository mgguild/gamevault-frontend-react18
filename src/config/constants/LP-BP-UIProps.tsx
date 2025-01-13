import { UIProps } from './types'
import tokensSocials from './tokensSocials'

interface farmUIProps {
  [key: string]: UIProps
}

const farmsUIProps: farmUIProps = {
  LPmggBusd: {
    socials: tokensSocials.mgg,
    contain: false,
    bgColor: '#030f62',
  },
  LPmggUsdc: {
    socials: tokensSocials.mgg,
    contain: false,
    bgColor: '#030f62',
  },
  PBmggMgg: {
    socials: tokensSocials.mgg,
    contain: false,
    bgColor: '#b10303d6',
  },
}

export default farmsUIProps

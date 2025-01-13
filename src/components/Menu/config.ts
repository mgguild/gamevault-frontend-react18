import { MenuEntry } from '@sparkpointio/sparkswap-uikit'

const config: MenuEntry[] = [
  {
    label: 'Staking',
    icon: '',
    // href: "/farms"
    items: [
      {
        label: 'Liquidity',
        href: '/farms',
      },
      {
        label: 'Pool-Based',
        href: '/pools',
      },
    ],
  },
  {
    label: 'GameFi Vault',
    icon: '',
    href: '/gamefi',
  },
  {
    label: 'Launchpad',
    icon: '',
    href: '/launchpad',
  },
  {
    label: 'Marketplace',
    icon: '',
    items: [
      {
        label: 'Home',
        href: '/marketplace',
      },
      {
        label: 'NFT Market',
        href: '/marketplace/nft-market',
      },
    ],
  },
  {
    label: 'Bridge',
    icon: '',
    href: 'https://app.chainport.io',
  },
  /*
  {
    label: "Swap",
    icon: "TradeIcon",
    href: "https://sparkswap.finance/#/swap",
  },
  {
    label: "Staking",
    icon: "FarmIcon",
    items: [
      {
        label: "Farms",
        href: "/farms",
      },
      {
        label: "Pools",
        href: "/pools",
      },
      {
        label: "Old Farms/Pools",
        href: "https://app.srk.finance/#/stake",
      },
    ],
  },
  {
    label: "Farm",
    icon: "FarmIcon",
    href: "https://app.srk.finance/#/stake",
  },
  {
    label: "Pool",
    icon: "PoolIcon",
    href: "/pools",
  },
  
  {
    label: "Launch",
    icon: "LaunchIcon",
    href: "https://launch.sparkswap.finance/#/",
  },
  {
    label: "Info",
    icon: "InfoIcon",
    href: "https://sparkswap.info/#/home",
  },
  {
    label: "Airdrop",
    icon: "AirdropIcon",
    href: "https://app.srk.finance/#/airdrop",
  },
  {
    label: "Teams",
    icon: "GroupsIcon",
    href: "https://srk.finance/team",
  },
  {
    label: "Help",
    icon: "MoreIcon",
    href: "https://medium.com/theecosystem/a-beginners-guide-to-sparkswap-79f92a2f7074"
  }
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap'
      },
      {
        label: 'Liquidity',
        href: '/pool'
      }
    ]
  },
 
  {
    label: "Info",
    icon: "InfoIcon",
    items: [
      {
        label: "Overview",
        href: "https://coinmarketcap.com/currencies/sparkpoint/",
      },
      {
        label: "Trade SRK",
        href: "https://srk.sh/trade",
      },
    ],
  },
  {
    label: "More",
    icon: "MoreIcon",
    items: [
      {
        label: "SparkDeFi",
        href: "https://srk.finance/",
      },
      {
        label: "SparkPoint",
        href: "https://sparkpoint.io/",
      },
      {
        label: "Github",
        href: "https://github.com/sparkpointio",
      },
      {
        label: "White Paper",
        href: "https://github.com/sparkpointio/sparkdefi-whitepaper/blob/main/WHITEPAPER.md",
      },
      {
        label: "Blog",
        href: "https://medium.com/theecosystem",
      },
    ],
  },
  */
]

export default config

const useChainFinder = (chainId: number) => {
  switch (chainId) {
    case 1:
      return 'eth'
    case 3:
      return 'ropsten'
    case 56:
      return 'bsc'
    case 97:
      return 'bsc testnet'
    default:
      return 'bsc'
  }
}

export default useChainFinder

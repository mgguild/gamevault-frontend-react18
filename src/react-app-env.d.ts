/// <reference types="react-scripts" />

interface WindowChain {
    ethereum?: {
        isMetaMask?: true
        request?: (...args: any[]) => void
    }
}

interface Window {
    ethereum: import('ethers').providers.ExternalProvider;
}

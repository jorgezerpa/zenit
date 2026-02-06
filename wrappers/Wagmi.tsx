'use client'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { ReactNode } from 'react' // 1. Import ReactNode
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = 'f30c736e32326da888f5f24dc34c1c3f'

// WAGMI CONFIG
export const WAGMI_CONFIG = createConfig({
  chains: [
    // mainnet, 
    sepolia
  ],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http("https://sepolia.infura.io/v3/b26a78bcb38b4957a68b3cdc645c2547"),
  },
   connectors: [
    // injected({target:"metaMask"}),
    injected(),
    walletConnect({ projectId, showQrModal:true }),
    metaMask(),
    safe(),
  ],
})

declare module 'wagmi' {
  interface Register {
    config: typeof WAGMI_CONFIG
  }
}

const queryClient = new QueryClient()

// 2. Define the props interface
interface WagmiWrapperProps {
    children: ReactNode;
}

// 3. Destructure children and apply the interface
export const WAGMI_WRAPPER = ({ children }: WagmiWrapperProps) => {
    return (
        <WagmiProvider config={WAGMI_CONFIG}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
    )
}
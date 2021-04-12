import React, { useEffect, useState } from 'react'
import { useAdapter } from '../../Hooks/useAdapter'
import { ConnectionModal } from '../ConnectionModal'
import {
  ConnectedWalletAddress,
  ConnectedWalletBalance,
  ConnectedWalletWrapper,
  ConnectWallet,
  HeaderWrapper
} from './Styles'

export const Header = () => {
  const { adapter } = useAdapter()
  const [connectionModal, setConnectionModal] = useState(false)
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    if (adapter) {
      adapter.getBalance().then(({ balance }) => {
        setBalance(balance.dividedBy(Math.pow(10, 18)).dp(4).toFixed())
      })
    }
  }, [adapter])

  return (
    <HeaderWrapper>
      <span>dapp-quickstart</span>
      {!adapter ? (
        <>
          <ConnectWallet onClick={() => setConnectionModal(true)}>Connect a Wallet</ConnectWallet>
          <ConnectionModal isOpen={connectionModal} onClose={() => setConnectionModal(false)} />
        </>
      ) : (
        <ConnectedWalletWrapper>
          <ConnectedWalletBalance>{balance} ETH</ConnectedWalletBalance>
          <ConnectedWalletAddress>{adapter.getAddress()}</ConnectedWalletAddress>
        </ConnectedWalletWrapper>
      )}
    </HeaderWrapper>
  )
}

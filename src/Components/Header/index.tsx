import React from 'react'
import { ConnectWallet, HeaderWrapper } from './Styles'

export const Header = () => {
  return (
    <HeaderWrapper>
      <span>dapp-quickstart</span>
      <ConnectWallet>Connect a Wallet</ConnectWallet>
    </HeaderWrapper>
  )
}

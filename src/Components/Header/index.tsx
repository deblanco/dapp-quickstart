import React, { useState } from 'react'
import { ConnectionModal } from '../ConnectionModal'
import { ConnectWallet, HeaderWrapper } from './Styles'

export const Header = () => {
  const [connectionModal, setConnectionModal] = useState(false)

  return (
    <HeaderWrapper>
      <span>dapp-quickstart</span>
      <ConnectWallet onClick={() => setConnectionModal(true)}>Connect a Wallet</ConnectWallet>
      <ConnectionModal isOpen={connectionModal} onClose={() => setConnectionModal(false)} />
    </HeaderWrapper>
  )
}

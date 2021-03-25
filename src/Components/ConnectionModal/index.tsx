import React from 'react'
import Modal from 'react-modal'
import Metamask from 'Assets/Wallets/Metamask.png'
import { ConnectionModalWrapper, ProvidersList } from './Styles'

export const ConnectionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <Modal isOpen={isOpen} shouldCloseOnOverlayClick onRequestClose={onClose}>
      <ConnectionModalWrapper>
        <h2>Connect to a wallet</h2>
        <ProvidersList>
          <li>
            <span>MetaMask</span>
            <img src={Metamask} alt="Metamask" />
          </li>
        </ProvidersList>
      </ConnectionModalWrapper>
    </Modal>
  )
}

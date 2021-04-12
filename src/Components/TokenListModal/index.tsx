import React from 'react'
import Modal from 'react-modal'
import { Close } from '@material-ui/icons'
import { TokenListModalRow, TokenListModalSearchBox, TokenListModalWrapper } from './Styles'

export const TokenListModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <Modal isOpen={isOpen} shouldCloseOnOverlayClick onRequestClose={onClose}>
      <TokenListModalWrapper>
        <div className="header">
          <Close onClick={onClose} />
        </div>
        <TokenListModalSearchBox placeholder={'Search token'} />
        <TokenListModalRow>
          <span>BTC</span>
          <span className="token-name">Bitcoin</span>
          <span>0.24241</span>
        </TokenListModalRow>
        <TokenListModalRow>
          <span>BTC</span>
          <span className="token-name">Bitcoin</span>
          <span>0.24241</span>
        </TokenListModalRow>
      </TokenListModalWrapper>
    </Modal>
  )
}

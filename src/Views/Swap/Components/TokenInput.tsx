import React, { useState } from 'react'
import styled from 'styled-components'
import { TokenListModal } from '../../../Components/TokenListModal'

const TokenInputWrapper = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.darkGrey};

  > div {
    display: flex;
    justify-content: space-between;
  }
`

const TokenInputHeader = styled.div`
  font-size: 0.85rem;

  > span {
    text-transform: capitalize;
  }
`

const TokenInputBody = styled.div`
  margin-top: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
`

const AmountInput = styled.input`
  background: transparent;
  border: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  outline: 0;
`

export const TokenInput: React.FC<{ type: 'from' | 'to' }> = ({ type }) => {
  const [tokenListActive, setTokenListActive] = useState(false)

  return (
    <TokenInputWrapper>
      <TokenInputHeader>
        <span>{type}</span>
        <span>Balance: 20.465</span>
      </TokenInputHeader>
      <TokenInputBody>
        <AmountInput placeholder="0.0" />
        <span>
          <TokenListModal isOpen={tokenListActive} onClose={() => setTokenListActive(false)} />
          <span onClick={() => setTokenListActive(true)}>BTC</span>
        </span>
      </TokenInputBody>
    </TokenInputWrapper>
  )
}

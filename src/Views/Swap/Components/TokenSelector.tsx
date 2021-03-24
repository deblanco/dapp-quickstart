import React from 'react'
import styled from 'styled-components'

const TokenSelectorWrapper = styled.div`
  padding: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.darkGrey};

  > div {
    display: flex;
    justify-content: space-between;
  }
`

export const TokenSelector = () => {
  return (
    <TokenSelectorWrapper>
      <div>
        <span>From</span>
        <span>Balance: 20</span>
      </div>
      <div>
        <span>40.1241</span>
        <span>BTC</span>
      </div>
    </TokenSelectorWrapper>
  )
}

import React from 'react'
import { TokenSelector } from './Components/TokenSelector'
import { SwapWrapper } from './Style'

export const Swap = () => {
  return (
    <SwapWrapper>
      <h1>Swap</h1>
      <TokenSelector />
    </SwapWrapper>
  )
}

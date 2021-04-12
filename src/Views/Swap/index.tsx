import React from 'react'
import { TokenInput } from './Components/TokenInput'
import { SwapWrapper } from './Style'

export const Swap = () => {
  return (
    <SwapWrapper>
      <h1>Swap</h1>
      <TokenInput type={'from'} />
      <TokenInput type={'to'} />
    </SwapWrapper>
  )
}

import BigNumber from 'bignumber.js'

export type AdapterBalance = { name: string; balance: BigNumber }

export type ExecutionResponse = {
  success: boolean
  functionName: string
  value: string
  hash: string
  params: ExecutionValueProps
}

export type ExecutionParams = {
  args: Array<string | number | undefined>
  callValue: string | number | undefined
}

export type ExecutionValueProps = Partial<ExecutionParams>

export interface IAdapter {
  isConnected(): boolean

  getAddress(): string

  getBalance(): Promise<AdapterBalance>

  logout(): Promise<void>

  execute(
    contractName: string,
    method: string,
    values: ExecutionValueProps,
    isWrite: boolean
  ): Promise<ExecutionResponse>

  waitForTransaction?(transactionHash: string): Promise<'SUCCESS' | 'FAILED'>
}

export const NON_SUCCESS_RESPONSE = { success: false, value: '', hash: '' }

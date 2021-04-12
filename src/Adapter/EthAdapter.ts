import { ethers } from 'ethers'
import { IAdapter, NON_SUCCESS_RESPONSE, ExecutionParams, AdapterBalance } from './IAdapter'
import { BigNumber as BN } from '../Utils/BigNumber'
import { sleep } from '../Utils/Sleep'

declare global {
  interface Window {
    ethereum: any
    BinanceChain: any
  }
}

export default class EthAdapter implements IAdapter {
  protected etherClient: ethers.providers.BaseProvider = this.getDefaultProvider()
  protected contracts: { [nameContract: string]: ethers.Contract } = {}
  protected address: string | undefined
  protected stablePairs: string[] = []
  protected lastGasLimit: string = '30000'

  static nativeTokenName = 'ETH'
  static chainId = 1

  static connect(): Promise<EthAdapter> {
    const performConnection = async () => {
      const handleEthereum = async () => {
        const ethAgent = window.ethereum
        if (ethAgent) {
          return ethAgent
            .request({ method: 'eth_requestAccounts' })
            .then(async (accounts: string[]) => {
              const prov = new ethers.providers.Web3Provider(ethAgent)
              return prov
                .getNetwork()
                .then(({ chainId }) => {
                  if (chainId === this.chainId) {
                    const address = ethers.utils.getAddress(accounts[0])
                    return new EthAdapter(prov, address)
                  } else {
                    throw Error('Invalid ChainId')
                  }
                })
                .catch((e: any) => {
                  console.log('🚀 ~ file: EthAdapter.ts ~ line 52 ~ EthAdapter ~ .then ~ e', e)
                })
            })
        }
      }

      return handleEthereum()
    }

    return Promise.race([
      performConnection(),
      sleep(5000).then(() => new EthAdapter(new ethers.providers.CloudflareProvider()))
    ]).catch((err) => {
      console.error('🚀 ~ file: EthAdapter.ts ~ line 59 ~ EthAdapter ~ connect ~ err', err)
      return new EthAdapter(new ethers.providers.CloudflareProvider())
    })
  }

  constructor(provider: ethers.providers.BaseProvider, address?: string) {
    this.etherClient = provider
    this.address = address
  }

  isConnected() {
    return this.getAddress().length > 0 && this.etherClient !== undefined
  }

  getAddress(): string {
    return this.address || ''
  }

  async logout() {}

  async execute(
    contractAddress: string,
    method: string,
    paramsRaw: ExecutionParams,
    isWrite = false
  ) {
    const params = this.reduceParams(contractAddress, method, paramsRaw)

    try {
      // ALLOWANCE ON ETH ALWAYS RETURN MAX
      if (
        contractAddress === EthAdapter.nativeTokenName &&
        ['allowance', 'approve'].includes(method)
      ) {
        return {
          success: true,
          value: BN(2 ** 256).toFixed(),
          hash: '',
          functionName: method,
          params
        }
      }

      const contract = this.contracts[contractAddress]

      if (isWrite) {
        if (method === 'approve') {
          // FIX> APPROVAL AMOUNT * 2
          params['args'][1] = BN(params['args'][1]!).multipliedBy(1.05).decimalPlaces(0).toFixed()
        }

        const gasLimit = await this.getEstimatedGasPrice(contract, method, params)

        const contractCall = await contract[method].apply(
          null,
          computeInvocationParams(params, { gasLimit })
        )

        if (method === 'approve') {
          await sleep(3000)
        }

        if (contractCall && contractCall.hash) {
          return {
            success: true,
            value: '',
            hash: contractCall.hash,
            functionName: method,
            params
          }
        }
      } else {
        const contractCall = await contract[method].apply(null, computeInvocationParams(params))
        if (contractCall) {
          const value = contractCall.toString()
          return {
            success: true,
            value,
            hash: '',
            functionName: method,
            params
          }
        }
      }
      return { ...NON_SUCCESS_RESPONSE, functionName: method, params }
    } catch (err) {
      console.error('EthAdapter -> execute -> err', method, params, err)
      return { ...NON_SUCCESS_RESPONSE, functionName: method, params }
    }
  }

  protected async getEstimatedGasPrice(
    contract: ethers.Contract,
    contractMethod: string,
    params: ExecutionParams
  ) {
    try {
      const gasLimit = await contract['estimateGas'][contractMethod]
        .apply(null, computeInvocationParams(params))
        .then((v: ethers.BigNumber) => v.mul(1).toHexString())
      this.lastGasLimit = gasLimit
      return gasLimit
    } catch (err) {
      return this.lastGasLimit
        ? '0x' + BN(this.lastGasLimit).multipliedBy(2).decimalPlaces(0).toString(16)
        : undefined
    }
  }

  async getBalance(targetAddress: string = this.getAddress()): Promise<AdapterBalance> {
    if (!this.isConnected()) {
      return { name: EthAdapter.nativeTokenName, balance: BN('0') }
    }
    const balanceOf = await this.etherClient.getBalance(targetAddress)

    const balance = BN(balanceOf.toString() || 0)

    return { name: EthAdapter.nativeTokenName, balance }
  }

  async waitForTransaction(transactionHash: string): Promise<'SUCCESS' | 'FAILED'> {
    return this.etherClient.waitForTransaction(transactionHash).then((res) => {
      return res.status && res.status === 1 ? 'SUCCESS' : 'FAILED'
    })
  }

  // protected reduceParams(
  //   contractAddress: string,
  //   method: ContractMethod,
  //   params: ExecutionParams
  // ): ExecutionParams {
  //   let reducedParams: ExecutionParams = params

  //   // STABLE PAIRS RULES
  //   if (this.stablePairs.includes(contractAddress)) {
  //     switch (method) {
  //       case ContractMethod.BUY:
  //         reducedParams = {
  //           callValue: 0,
  //           args: [...reducedParams.args, reducedParams.callValue]
  //         }
  //         break
  //       case ContractMethod.DEPOSIT_SUPPLY:
  //         reducedParams = {
  //           callValue: 0,
  //           args: [reducedParams.callValue]
  //         }
  //         break
  //     }
  //   }

  //   return reducedParams
  // }

  protected getEthereumAgent() {
    return window.ethereum
  }

  protected getDefaultProvider(): ethers.providers.BaseProvider {
    return new ethers.providers.CloudflareProvider()
  }

  protected reduceParams(
    contractAddress: string,
    method: string,
    params: ExecutionParams
  ): ExecutionParams {
    let reducedParams: ExecutionParams = params

    // STABLE PAIRS RULES
    if (this.stablePairs.includes(contractAddress)) {
      switch (method) {
        case 'buy':
          reducedParams = {
            callValue: 0,
            args: [...reducedParams.args, reducedParams.callValue]
          }
          break
        case 'depositSupply':
          reducedParams = {
            callValue: 0,
            args: [reducedParams.callValue]
          }
          break
      }
    }

    return reducedParams
  }
}

export function computeInvocationParams(
  params: ExecutionParams,
  gasOptions: { gasPrice?: string; gasLimit?: string } = {}
) {
  const { args, callValue } = params
  const reducedContractParameters = [
    ...(args || []),
    callValue ? { value: callValue, ...gasOptions } : { ...gasOptions }
  ]
  return reducedContractParameters
}

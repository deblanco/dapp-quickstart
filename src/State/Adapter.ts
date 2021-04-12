import { atom } from 'recoil'
import { IAdapter } from '../Adapter/IAdapter'

export type AdapterState = {
  adapter: IAdapter | undefined
  isConnected: boolean
}

export const Adapter = atom<AdapterState>({
  key: 'adapter',
  dangerouslyAllowMutability: true,
  default: { adapter: undefined, isConnected: false }
})

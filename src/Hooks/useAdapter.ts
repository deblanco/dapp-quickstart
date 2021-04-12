import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import EthAdapter from '../Adapter/EthAdapter'
import { Adapter } from '../State/Adapter'

export const useAdapter = () => {
  const [{ adapter, isConnected }, setAdapter] = useRecoilState(Adapter)

  const connect = useCallback(async () => {
    const adapter = await EthAdapter.connect()
    setAdapter({ adapter, isConnected: adapter.isConnected() })
  }, [setAdapter])

  return { adapter, isConnected, connect }
}

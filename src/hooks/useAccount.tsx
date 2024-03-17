import { Chain } from '@/lib/models/chain'
import { RootState } from '@/lib/store'
import { setUserWallet, setChain } from '@/lib/store/accountSlice'
import { toFixedIfNecessary } from '@/utils/helper'
import { HDNodeWallet, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useAccount = () => {
  const { address, chain } = useSelector((state: RootState) => ({
    address: state.account.wallet?.address,
    chain: state.account.chain
  }))
  const dispatch = useDispatch()

  const [accountBalance, setAccountBalance] = useState(0.0)

  const setWallet = (wallet: HDNodeWallet | undefined) => {
    dispatch(setUserWallet(wallet))
  }

  const setSelectedChain = (chain: Chain) => {
    dispatch(setChain(chain))
  }

  useEffect(() => {
    const fetchBalance = async () => {
      const provider = new ethers.JsonRpcProvider(chain.rpcUrl)
      if(address) {
        const accountBalance = await provider.getBalance(address)
        setAccountBalance(toFixedIfNecessary(accountBalance.toString()))
      }
    }
    fetchBalance()
  }, [address, chain.rpcUrl])

  return {
    setWallet,
    address,
    accountBalance,
    setSelectedChain,
    chain
  }
}
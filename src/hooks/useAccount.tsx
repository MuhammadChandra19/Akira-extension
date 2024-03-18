import accountController from '@/lib/controller/account-controller';
import { Chain } from "@/lib/models/chain";
import { AppDispatch, RootState } from "@/lib/store";
import { setUserWallet, setChain, loadAccount } from "@/lib/store/account-slice";
import { toFixedIfNecessary } from "@/utils/helper";
import { HDNodeWallet, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Custom hook to manage account information and interactions.
 */
export const useAccount = () => {
  const { setAccount } = accountController()

  const { chain, wallet, isLoading } = useSelector((state: RootState) => ({
    wallet: state.account.wallet,
    chain: state.account.chain,
    isLoading: state.account.isLoading
  }));
  

  const dispatch = useDispatch<AppDispatch>();

  const [accountBalance, setAccountBalance] = useState(0.0);

  /**
   * Sets the user wallet in the store.
   * @param {HDNodeWallet | undefined} wallet - The wallet to set. Pass undefined to clear the wallet.
   */
  const setWallet = (wallet: HDNodeWallet | undefined) => {
    dispatch(setUserWallet(wallet));
    setAccount({wallet, chain});
  };

  /**
   * Sets the selected blockchain chain in the store.
   * @param {Chain} chain - The chain object representing the selected blockchain.
   */
  const setSelectedChain = (chain: Chain) => {
    dispatch(setChain(chain));
    setAccount({wallet, chain});
  };

  /**
   * Fetches the account balance from the blockchain and updates the state.
   */
  useEffect(() => {
    const fetchBalance = async () => {
      const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
      if (wallet?.address) {
        const accountBalance = await provider.getBalance(wallet?.address);
        setAccountBalance(toFixedIfNecessary(accountBalance.toString()));
      }
    };
    fetchBalance();
  }, [wallet?.address, chain.rpcUrl]);


  useEffect(() => {
    if(!wallet?.address) {
      dispatch(loadAccount())
    }
    console.log('here')
  }, [dispatch, wallet?.address])

  return {
    setWallet,
    address: wallet?.address,
    accountBalance,
    setSelectedChain,
    chain,
    isLoading,
    wallet
  };
};

import useAccountStore from '@/lib/store/account-store';
import { useEffect, useState } from "react";

/**
 * Custom hook to manage account information and interactions.
 */
export const useAccount = () => {
  const wallet = useAccountStore((state) => state.wallet);
  const isLoading = useAccountStore((state) => state.isLoading);
  const chain = useAccountStore((state) => state.chain);

  
  const setSelectedChain = useAccountStore((state) => state.setChain)


  const [accountBalance, setAccountBalance] = useState(0.0);

  /**
   * Fetches the account balance from the blockchain and updates the state.
   */
  useEffect(() => {
    const fetchBalance = async () => {
      if(wallet?.address) {
        const balance = await chain.chain.getUserBalance(wallet)
        setAccountBalance(balance as unknown as number)
      }
    };
    fetchBalance();
  }, [chain.chain, wallet, wallet?.address]);



  return {
    address: wallet?.address,
    accountBalance,
    setSelectedChain,
    chain,
    isLoading,
    wallet
  };
};

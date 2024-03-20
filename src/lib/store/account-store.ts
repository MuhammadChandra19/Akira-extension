import { create } from 'zustand';
import { TAccount } from '../models/account';
import accountController from '../controller/account-controller';
import { TChain, goerli } from '../chains/chain-list';
import { Wallet } from '../models/wallet';

interface AccountState extends TAccount {
  isLoading: boolean;
  setUserWallet: (wallet: Wallet) => void;
  setChain: (chain: TChain) => void;
  populateInitialData: () => Promise<void>;
}

const useAccountStore = create<AccountState>()((set, get) => ({
  chain: goerli,
  wallet: undefined,
  isLoading: false,
  setUserWallet: (wallet: Wallet) => set(() => ({ wallet })),
  setChain: (chain: TChain) => set(() => ({ chain })),
  populateInitialData: async () => {
    try {
      if (get().wallet) return;

      set({ isLoading: true });
      const dataStorage = await accountController().getAccount();
      set({ ...dataStorage });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAccountStore;

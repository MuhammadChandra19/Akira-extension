import { TAccount } from '../models/account';

const accountController = () => {
  const getAccount = async () => {
    const account = await chrome.storage.sync.get('account');
    return account.account as TAccount;
  };

  const setAccount = async (account: TAccount) => {
    chrome.storage.sync.set({ account });
  };

  return {
    getAccount,
    setAccount,
  };
};

export default accountController;

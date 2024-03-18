import { ethers } from 'ethers';
import { Chain } from './chain';

export type TAccount = {
  wallet?: ethers.HDNodeWallet;
  chain: Chain;
};

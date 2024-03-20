import { TChain } from '../chains/chain-list';
import { Wallet } from './wallet';

export type TAccount = {
  wallet?: Wallet;
  chain: TChain;
};

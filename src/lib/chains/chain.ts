import { Wallet } from '../models/wallet';

abstract class Chain {
  blockExplorerUrl: string;
  rpcUrl: string;

  constructor(blockExplorerUrl: string, rpcUrl: string) {
    this.blockExplorerUrl = blockExplorerUrl;
    this.rpcUrl = rpcUrl;
  }
  abstract getUserBalance(): Promise<bigint>;

  abstract getUserTokens(address: string): Promise<unknown[]>;

  abstract getGasEstimation(transaction: unknown): Promise<number>;

  abstract sendTransaction(transaction: unknown): Promise<unknown>;

  abstract createmMnemonicPhrase(): string | undefined;

  abstract generateNewWallet(seedPhrase: string): Wallet;

  // Other necessary actions can be added here as abstract methods

  // Common utility methods can be defined here
  // Getters for blockExplorerUrl and rpcUrl
  getBlockExplorerUrl(): string {
    return this.blockExplorerUrl;
  }

  getRpcUrl(): string {
    return this.rpcUrl;
  }
}

export default Chain;

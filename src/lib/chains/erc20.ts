import { ethers } from 'ethers';
import Chain from './chain';
import { Wallet } from '../models/wallet';

class ERC20Chain extends Chain {
  constructor(blockExplorerUrl: string, rpcUrl: string) {
    super(blockExplorerUrl, rpcUrl);
  }
  // private readonly blockExplorerUrl: string = 'https://etherscan.io';
  // private readonly rpcUrl: string = 'https://mainnet.infura.io/v3/c51c1c004b174d49ad7e26814ea628e2';

  async getUserBalance(): Promise<bigint> {
    // Implementation specific to ERC20 chain
    const provider = new ethers.JsonRpcProvider(this.rpcUrl);
    const accountBalance = await provider.getBalance('');
    return accountBalance;
  }

  async getUserTokens(address: string): Promise<unknown[]> {
    // Implementation specific to ERC20 chain
    console.log(address);
    return [];
  }

  async getGasEstimation(transaction: unknown): Promise<number> {
    // Implementation specific to ERC20 chain
    console.log(transaction);
    return 0;
  }

  async sendTransaction(transaction: unknown): Promise<unknown> {
    // Implementation specific to ERC20 chain
    console.log(transaction);
    return {};
  }

  createmMnemonicPhrase(): string | undefined {
    return ethers.Wallet.createRandom().mnemonic?.phrase;
  }

  generateNewWallet(seedPhrase: string): Wallet {
    const provider = new ethers.JsonRpcProvider(this.rpcUrl);

    const walletFromPhrase = ethers.Wallet.fromPhrase(seedPhrase, provider);
    return {
      address: walletFromPhrase.address,
    };
  }

  getBlockExplorerUrl(): string {
    return this.blockExplorerUrl;
  }

  getRpcUrl(): string {
    return this.rpcUrl;
  }
  // Additional methods for ERC20 chain can be added here
}

export default ERC20Chain;

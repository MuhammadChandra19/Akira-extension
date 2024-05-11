import Web3, { Contract, ContractAbi, Transaction } from 'web3';
import { ethers } from 'ethers';
import Chain from './chain';
import { Wallet } from '../models/wallet';
import { BaseTxPayload, TransactionPayload } from '../models/transaction';

class ERC20Chain extends Chain {
  private readonly web3: Web3;
  constructor(blockExplorerUrl: string, rpcUrl: string) {
    super(blockExplorerUrl, rpcUrl);

    this.web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }

  async getUserBalance(wallet: Wallet): Promise<bigint> {
    // Implementation specific to ERC20 chain
    const provider = new ethers.JsonRpcProvider(this.rpcUrl);
    const accountBalance = await provider.getBalance(wallet.address);
    return accountBalance;
  }

  async getUserTokens(address: string): Promise<unknown[]> {
    // Implementation specific to ERC20 chain
    console.log(address);
    return [];
  }

  async getGasEstimation(transaction: BaseTxPayload): Promise<{
    contract: Contract<ContractAbi>;
    gasEstimation: bigint;
  }> {
    const contractABI = await this.fetchContractABI(transaction.contractAddress);

    // Load the ERC20 token contract
    const contract = new this.web3.eth.Contract(contractABI, transaction.contractAddress);

    // Estimate gas
    const gasEstimation = await contract.methods.transfer(transaction.to, transaction.amount).estimateGas({
      from: transaction.from,
    });

    return {
      contract,
      gasEstimation,
    };
  }

  async sendTransaction(transaction: TransactionPayload): Promise<string> {
    try {
      let txParams: Transaction;

      // Check if the transaction involves transferring ether or ERC20 tokens
      if (!transaction.asset) {
        // Sending ether
        txParams = {
          from: transaction.from,
          to: transaction.to,
          value: this.web3.utils.toWei(transaction.amount, 'ether'),
          gas: transaction.gasLimit,
          gasPrice: this.web3.utils.toWei(transaction.gasPrice.toString(), 'gwei'),
          gasLimit: transaction.gasLimit,
        };
      } else {
        // Sending ERC20 token
        if (!transaction.contractAddress) {
          throw new Error('Contract address is required for ERC20 token transfer.');
        }

        const { contract, gasEstimation } = await this.getGasEstimation(transaction);
        txParams = {
          from: transaction.from,
          to: transaction.contractAddress,
          data: contract.methods.transfer(transaction.to, transaction.amount).encodeABI(),
          gas: gasEstimation,
          gasPrice: this.web3.utils.toWei(transaction.gasPrice.toString(), 'gwei'),
          gasLimit: transaction.gasLimit,
        };
      }

      // Send transaction
      const signedTx = await this.web3.eth.accounts.signTransaction(txParams, transaction.signKey);
      const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      // Return transaction hash
      return receipt.transactionHash.toString();
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
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

  private async fetchContractABI(contractAddress: string): Promise<ContractAbi> {
    try {
      // Fetch the bytecode of the contract
      const bytecode = await this.web3.eth.getCode(contractAddress);

      // Decode the bytecode to extract the ABI
      const abiStartIndex = bytecode.indexOf('{"abi"');
      const abiEndIndex = bytecode.indexOf('"metadata"', abiStartIndex);
      const abiJson = bytecode.substring(abiStartIndex, abiEndIndex);
      const abi = JSON.parse(abiJson);

      return abi;
    } catch (error) {
      console.error('Error fetching contract ABI:', error);
      throw error;
    }
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

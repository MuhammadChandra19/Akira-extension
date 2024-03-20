export interface BaseTxPayload {
  from: string;
  to: string;
  amount: string;
  contractAddress: string;
  gasPrice: number;
  gasLimit: number;
  signKey: string;
}

export interface TransactionPayload extends BaseTxPayload {
  asset?: string;
}

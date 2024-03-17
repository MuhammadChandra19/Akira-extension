export type Chain = {
  chainId: string;
  name: string;
  blockExplorerUrl: string;
  rpcUrl: string;
};

export const goerli: Chain = {
  chainId: "5",
  name: "Goerli",
  blockExplorerUrl: "https://goerli.etherscan.io",
  rpcUrl: "https://goerli.infura.io/v3/c51c1c004b174d49ad7e26814ea628e2",
};

export const mainnet: Chain = {
  chainId: "1",
  name: "Ethereum",
  blockExplorerUrl: "https://etherscan.io",
  rpcUrl: "https://mainnet.infura.io/v3/c51c1c004b174d49ad7e26814ea628e2",
};

export const CHAIN_LIST = [goerli, mainnet];

export const CHAINS_CONFIG = {
  [goerli.chainId]: goerli,
  [mainnet.chainId]: mainnet,
};

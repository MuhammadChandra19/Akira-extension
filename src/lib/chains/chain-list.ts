import Chain from "./chain";
import ERC20Chain from "./erc20";

export type TChain = {
  chain: Chain;
  name: string;
};

export const goerli: TChain = {
  chain: new ERC20Chain(
    "https://goerli.etherscan.io",
    "https://goerli.infura.io/v3/c51c1c004b174d49ad7e26814ea628e2",
  ),
  name: "Goerli",
};

export const erc20Mainnet: TChain = {
  chain: new ERC20Chain(
    "https://etherscan.io",
    "https://mainnet.infura.io/v3/c51c1c004b174d49ad7e26814ea628e2",
  ),
  name: "Mainnet",
};

export const CHAIN_LIST = {
  [goerli.name]: goerli,
  [erc20Mainnet.name]: erc20Mainnet,
};

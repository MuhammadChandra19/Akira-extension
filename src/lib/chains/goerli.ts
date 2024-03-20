import ERC20Chain from './erc20';

class Goerli extends ERC20Chain {
  constructor(blockExplorerUrl: string, rpcUrl: string) {
    super(blockExplorerUrl, rpcUrl);
  }
}

export default Goerli;

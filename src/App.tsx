import { useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import RecoverAccount from "@/pages/recover-account";
import CreateAccount from "@/pages/create-account";
import Wallet from "@/pages/wallet";
import useAccountStore from './lib/store/account-store';
import { CHAIN_LIST } from './lib/chains/chain-list';

function App() {
  const initData = useAccountStore((state) => state.populateInitialData);

  const address = useAccountStore((state) => state.wallet?.address);
  const isLoading = useAccountStore((state) => state.isLoading);
  const chain = useAccountStore((state) => state.chain);

  
  const setSelectedChain = useAccountStore((state) => state.setChain)


  const hasWallet = useMemo(() => !!address, [address]);

  useEffect(() => {
    initData()
  }, [initData])

  return (
    <div className="w-full p-2">
      <header className="mb-2 flex w-full justify-between">
        <h1 className="my-2">
          <img src="/assets/akira-logo.png" height={28} width={28} />
        </h1>
        <Select
          onValueChange={(v) => setSelectedChain(CHAIN_LIST[v])}
          defaultValue={chain.name}
        >
          <SelectTrigger className="mb-2 w-48">
            <SelectValue placeholder="Select Chain" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(CHAIN_LIST).map((chain) => (
              <SelectItem key={chain.name} value={chain.name}>
                {chain.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>
      {
        isLoading ? (<div>Loading</div>) : (
          <Routes>
            <Route path="/" element={
              hasWallet ? <Wallet /> : <Home />
            } />
            <Route path="/recover" element={<RecoverAccount />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Routes>
        )
      }
    </div>
  );
}

export default App;

import { useMemo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import RecoverAccount from '@/pages/RecoverAccount'
import CreateAccount from '@/pages/CreateAccount'
import Wallet from '@/pages/Wallet'
import { useAccount } from './hooks/useAccount'
import { CHAINS_CONFIG, CHAIN_LIST } from './lib/models/chain'

function App() {
  const { address, chain, setSelectedChain } = useAccount()
  const hasWallet = useMemo(() => !!address, [address])

  return (
    <div className="w-full p-2">
      <header className="mb-2 flex w-full justify-between">
        <h1 className="my-2">
          <img src="/assets/akira-logo.png" height={28} width={28}/>
        </h1>
        <Select 
          onValueChange={(v) => setSelectedChain(CHAINS_CONFIG[v])} 
          defaultValue={chain.chainId}
        >
          <SelectTrigger className="w-48 mb-2">
            <SelectValue placeholder="Select Chain"/>
          </SelectTrigger>
          <SelectContent>
            {
              CHAIN_LIST.map(chain => (
                <SelectItem key={chain.chainId} value={chain.chainId}>{chain.name}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </header>
      {
        hasWallet 
          ? (
            <Routes>
              <Route 
                path="/wallet" 
                element={
                  <Wallet />
                }
              />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/recover" 
                element={
                  <RecoverAccount />
                } 
              />
              <Route 
                path="/create-account" 
                element={
                  <CreateAccount />
                } 
              />
            </Routes>
          )
      }

    </div>
  )
}

export default App

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ethers } from 'ethers'
import { AlertCircle } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setUserWallet } from '@/lib/store/accountSlice'

const CreateAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [newSeedPhrase, setNewSeedPhrase] = useState("")

  const generateWallet = () => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic?.phrase
    setNewSeedPhrase(mnemonic!)
  }

  const setWalletAndMnemonic = () => {
    const newWallet = ethers.Wallet.fromPhrase(newSeedPhrase)
    dispatch(setUserWallet(newWallet))
    navigate("/wallet")
  }
  return (
    <div className="content">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Once you generate the seed phrase, save it securely in order to recover your wallet in the future
        </AlertDescription>
      </Alert>
      <Button size="sm" onClick={generateWallet}>Generate Seed Phrase</Button>
      <Card className="w-full h-44">
        <CardContent className="w-full h-full text-center flex content-center">
          <pre className="whitespace-pre-wrap m-auto">{newSeedPhrase}</pre>
        </CardContent>
      </Card>
      <Button variant="outline" size="sm" onClick={setWalletAndMnemonic}>Open Your New Wallet</Button>
      <Button variant="ghost" onClick={() => navigate("/")} size="sm">Back Home</Button>
    </div>
  )
}

export default CreateAccount
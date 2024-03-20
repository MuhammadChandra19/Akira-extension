import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import useAccountStore from '@/lib/store/account-store';

const CreateAccount = () => {
  const navigate = useNavigate();

  const chain = useAccountStore((state) => state.chain)
  const setUserWallet = useAccountStore((state) => state.setUserWallet)

  const [newSeedPhrase, setNewSeedPhrase] = useState("");

  const generateWallet = () => {
    const mnemonic = chain.chain.createmMnemonicPhrase();
    setNewSeedPhrase(mnemonic!);
  };

  const setWalletAndMnemonic = () => {
    const newWallet = chain.chain.generateNewWallet(newSeedPhrase);
    setUserWallet(newWallet);
    navigate("/");
  };
  return (
    <div className="content">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Once you generate the seed phrase, save it securely in order to
          recover your wallet in the future
        </AlertDescription>
      </Alert>
      <Button size="sm" onClick={generateWallet}>
        Generate Seed Phrase
      </Button>
      <Card className="h-44 w-full">
        <CardContent className="flex h-full w-full content-center text-center">
          <pre className="m-auto whitespace-pre-wrap">{newSeedPhrase}</pre>
        </CardContent>
      </Card>
      <Button variant="outline" size="sm" onClick={setWalletAndMnemonic}>
        Open Your New Wallet
      </Button>
      <Button variant="ghost" onClick={() => navigate("/")} size="sm">
        Back Home
      </Button>
    </div>
  );
};

export default CreateAccount;

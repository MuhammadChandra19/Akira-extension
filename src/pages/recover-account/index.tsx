import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAccountStore from '@/lib/store/account-store';
import { InfoIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecoverAccount = () => {
  const navigate = useNavigate();
  const [typedSeed, setTpyedSeed] = useState("");
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);

  const setUserWallet = useAccountStore((state) => state.setUserWallet)
  const chain = useAccountStore((state) => state.chain)

  const recoverWallet = () => {
    try {
      const wallet = chain.chain.generateNewWallet(typedSeed);
      setUserWallet(wallet);
    } catch (e) {
      setInvalidSeedPhrase(true);
      return;
    }
    navigate("/");
  };

  const seedAdjust = (value: string) => {
    setTpyedSeed(value);
  };

  const isTypedSeedEmpty = useMemo(
    () => typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " ",
    [typedSeed],
  );
  return (
    <div className="content relative h-full">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Type your seed phrase in the field below to recover you wallet (it
          should include 12 words separated with spaces)
        </AlertDescription>
      </Alert>

      <Textarea
        rows={4}
        className="mb-4 resize-none"
        value={typedSeed}
        onChange={(e) => seedAdjust(e.target.value)}
      />
      <Button onClick={recoverWallet} size="sm" disabled={isTypedSeedEmpty}>
        Recover Wallet
      </Button>
      {invalidSeedPhrase && (
        <p className="text-xs font-light italic text-red-600">
          Invalid Seed Phrase
        </p>
      )}
      <Button
        variant="ghost"
        className="mt-auto"
        onClick={() => navigate("/")}
        size="sm"
      >
        Back Home
      </Button>
    </div>
  );
};

export default RecoverAccount;

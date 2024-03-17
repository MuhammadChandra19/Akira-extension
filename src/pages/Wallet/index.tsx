import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAccount } from "@/hooks/useAccount";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();
  const { address, accountBalance, setWallet, chain } = useAccount();

  const logout = () => {
    setWallet(undefined);
    navigate("/");
  };

  const goToExplorer = () => {
    window.open(`${chain.blockExplorerUrl}/address/${address}`);
  };
  return (
    <div className="content">
      <Card className="w-full p-2">
        <div className="flex w-full justify-between">
          <div className="flex grow flex-col gap-2">
            <h1 className="font-semibold">Wallet</h1>
            <div className="font-semibold">Balance: {accountBalance} ETH</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={goToExplorer}>
                  <Button variant="ghost" className="m-auto text-blue-700">
                    {address!.slice(0, 4)}...{address!.slice(38)}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{address}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="tokens">Tokens</TabsContent>
        <TabsContent value="transactions">Transactions</TabsContent>
      </Tabs>

      <div className="mt-auto w-full">
        <Button onClick={logout} variant="outline" size="sm" className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Wallet;

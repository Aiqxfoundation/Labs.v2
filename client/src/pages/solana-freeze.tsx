import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useSolanaWallet } from '@/contexts/SolanaWalletContext';
import { getSolanaConnection } from '@/utils/solanaDeployer';
import { freezeTokenAccount, unfreezeTokenAccount } from '@/utils/solanaTools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/MainLayout';
import { Snowflake, Loader2, Wallet } from 'lucide-react';
import { useParams } from 'wouter';

type SolanaNetwork = 'testnet' | 'mainnet-beta';

export default function SolanaFreezeAccount() {
  const params = useParams();
  const chainId = params.chainId as string;
  const { publicKey, isConnected, signTransaction } = useSolanaWallet();
  const { toast } = useToast();
  
  const getNetworkFromChainId = (id: string): SolanaNetwork => {
    if (id?.includes('testnet')) return 'testnet';
    if (id?.includes('mainnet')) return 'mainnet-beta';
    return 'testnet';
  };
  
  const network = getNetworkFromChainId(chainId);
  const [loading, setLoading] = useState(false);
  const [mintAddress, setMintAddress] = useState('');
  const [accountAddress, setAccountAddress] = useState('');

  const handleFreeze = async (action: 'freeze' | 'unfreeze') => {
    if (!isConnected || !publicKey || !signTransaction) {
      toast({ title: 'Wallet not connected', variant: 'destructive' });
      return;
    }

    try {
      setLoading(true);
      const connection = getSolanaConnection(network);

      const freezeFn = action === 'freeze' ? freezeTokenAccount : unfreezeTokenAccount;
      const signature = await freezeFn(
        connection,
        new PublicKey(publicKey),
        mintAddress,
        accountAddress,
        signTransaction
      );

      toast({
        title: `Account ${action}d successfully!`,
        description: `Signature: ${signature.slice(0, 8)}...`,
      });

      setMintAddress('');
      setAccountAddress('');
    } catch (error: any) {
      toast({
        title: `${action} failed`,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout currentChainId={chainId}>
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Freeze Account
        </h1>
        <p className="text-gray-400">
          Freeze or unfreeze token accounts (requires freeze authority)
        </p>
      </div>

      {!isConnected ? (
        <Card className="border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Wallet className="h-8 w-8 text-cyan-500" />
              <div>
                <p className="font-semibold text-white">Connect Your Wallet</p>
                <p className="text-sm text-gray-400">Use the "Connect Wallet" button to manage freeze status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-blue-500" />
              Freeze/Unfreeze Account
            </CardTitle>
            <CardDescription className="text-gray-400">
              Control token account freeze status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="freeze" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="freeze">Freeze</TabsTrigger>
                <TabsTrigger value="unfreeze">Unfreeze</TabsTrigger>
              </TabsList>
              
              <TabsContent value="freeze" className="space-y-4">
                <div>
                  <Label htmlFor="freeze-mint" className="text-white">Token Mint Address</Label>
                  <Input
                    id="freeze-mint"
                    value={mintAddress}
                    onChange={(e) => setMintAddress(e.target.value)}
                    placeholder="Enter token mint address"
                    className="bg-gray-900 border-gray-700 text-white"
                    data-testid="input-freeze-mint"
                  />
                </div>

                <div>
                  <Label htmlFor="freeze-account" className="text-white">Account to Freeze</Label>
                  <Input
                    id="freeze-account"
                    value={accountAddress}
                    onChange={(e) => setAccountAddress(e.target.value)}
                    placeholder="Enter account address"
                    className="bg-gray-900 border-gray-700 text-white"
                    data-testid="input-freeze-account"
                  />
                </div>

                <Button
                  onClick={() => handleFreeze('freeze')}
                  disabled={loading || !mintAddress || !accountAddress}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  data-testid="button-freeze"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Freeze Account
                </Button>
              </TabsContent>

              <TabsContent value="unfreeze" className="space-y-4">
                <div>
                  <Label htmlFor="unfreeze-mint" className="text-white">Token Mint Address</Label>
                  <Input
                    id="unfreeze-mint"
                    value={mintAddress}
                    onChange={(e) => setMintAddress(e.target.value)}
                    placeholder="Enter token mint address"
                    className="bg-gray-900 border-gray-700 text-white"
                    data-testid="input-unfreeze-mint"
                  />
                </div>

                <div>
                  <Label htmlFor="unfreeze-account" className="text-white">Account to Unfreeze</Label>
                  <Input
                    id="unfreeze-account"
                    value={accountAddress}
                    onChange={(e) => setAccountAddress(e.target.value)}
                    placeholder="Enter account address"
                    className="bg-gray-900 border-gray-700 text-white"
                    data-testid="input-unfreeze-account"
                  />
                </div>

                <Button
                  onClick={() => handleFreeze('unfreeze')}
                  disabled={loading || !mintAddress || !accountAddress}
                  className="w-full bg-green-600 hover:bg-green-700"
                  data-testid="button-unfreeze"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Unfreeze Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
    </MainLayout>
  );
}

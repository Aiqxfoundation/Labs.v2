import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, Zap, Shield, Flame, Plus, Settings,
  Send, Snowflake, ImageIcon, ArrowRight, CheckCircle2,
  Bolt, Lock, Layers, Globe
} from "lucide-react";
import solanaImage from "@assets/stock_images/solana_blockchain_hi_7887e890.jpg";

export default function SolanaOverview({ chainId, chain }: any) {
  const isTestnet = chainId.includes('devnet');
  const tokenStandard = "SPL Token";

  const features = [
    {
      icon: Bolt,
      title: "Blazing Fast",
      description: "65,000 TPS with 400ms block time - fastest blockchain in production"
    },
    {
      icon: Zap,
      title: "Ultra-Low Costs",
      description: "Fractions of a penny per transaction - cost-effective at scale"
    },
    {
      icon: Layers,
      title: "Token-2022 Extensions",
      description: "16+ advanced features including transfer fees, confidential transfers, and more"
    },
    {
      icon: Globe,
      title: "Growing Ecosystem",
      description: "Thriving DeFi, NFT, and gaming ecosystem with institutional adoption"
    }
  ];

  const capabilities = [
    { name: "Mint & Burn", icon: Flame, desc: "Full supply control" },
    { name: "Freeze Accounts", icon: Snowflake, desc: "Account-level security" },
    { name: "Transfer Fees", icon: Plus, desc: "Native revenue generation" },
    { name: "Confidential Transfers", icon: Lock, desc: "Privacy-preserving payments" },
    { name: "Metadata Management", icon: ImageIcon, desc: "On-chain token metadata" },
    { name: "Authority Transfer", icon: Shield, desc: "Flexible permission control" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-pink-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${solanaImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <chain.icon className="h-16 w-16 text-purple-400" />
              <h1 className="text-5xl lg:text-6xl font-bold text-white">
                {chain.displayName}
              </h1>
            </div>
            {isTestnet && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-lg px-4 py-1">
                Devnet Environment
              </Badge>
            )}
            <p className="text-xl lg:text-2xl text-purple-200 mt-4 max-w-3xl mx-auto">
              Web-Scale Blockchain for Mass Adoption
            </p>
            <p className="text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
              Create advanced SPL tokens with Token-2022 extensions. Enterprise-grade features built-in.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <Card className="bg-purple-900/30 border-purple-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-tps">
              <div className="text-3xl font-bold text-purple-300">65,000</div>
              <div className="text-sm text-gray-300 mt-1">TPS</div>
            </Card>
            <Card className="bg-purple-900/30 border-purple-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-block">
              <div className="text-3xl font-bold text-purple-300">400ms</div>
              <div className="text-sm text-gray-300 mt-1">Block Time</div>
            </Card>
            <Card className="bg-purple-900/30 border-purple-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-cost">
              <div className="text-3xl font-bold text-purple-300">$0.00025</div>
              <div className="text-sm text-gray-300 mt-1">Transaction Cost</div>
            </Card>
            <Card className="bg-purple-900/30 border-purple-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-validators">
              <div className="text-3xl font-bold text-purple-300">1,800+</div>
              <div className="text-sm text-gray-300 mt-1">Validators</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why Choose Solana */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Choose Solana for Token Creation?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="bg-gray-900/50 border-purple-500/20 p-6 hover:border-purple-500/40 transition-all hover:transform hover:scale-105"
                data-testid={`card-feature-${idx}`}
              >
                <feature.icon className="h-10 w-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Token-2022 Extensions */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-lg px-4 py-2 mb-4">
              Token-2022 Program
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              Next-Generation {tokenStandard} Features
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Powered by Token-2022, the most advanced token standard with 16+ extensions for enterprise and DeFi use cases
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, idx) => (
              <Card 
                key={idx}
                className="bg-gray-900/50 border-purple-500/20 p-5 flex items-start gap-4"
                data-testid={`card-capability-${idx}`}
              >
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <cap.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{cap.name}</h4>
                  <p className="text-sm text-gray-400">{cap.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Create Your Token in Seconds
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Connect Wallet", desc: "Phantom, Solflare, or any Solana wallet" },
              { step: "2", title: "Configure Token", desc: "Name, symbol, supply, and extensions" },
              { step: "3", title: "Deploy to Solana", desc: "Lightning-fast deployment (~0.01 SOL)" },
              { step: "4", title: "List & Trade", desc: "Add liquidity on Raydium or Orca" }
            ].map((item, idx) => (
              <Card 
                key={idx}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 p-6 text-center"
                data-testid={`card-step-${idx}`}
              >
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Token-2022 Highlight */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-purple-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              🚀 Token-2022: The Future of SPL Tokens
            </h2>
            <p className="text-gray-300 text-center mb-6 max-w-3xl mx-auto">
              The enhanced Token-2022 program offers enterprise-grade features like transfer fees for native revenue generation, 
              confidential transfers for privacy, permanent delegates for custody solutions, and 13+ other extensions.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">16+</div>
                <div className="text-gray-300">Optional Extensions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-gray-300">Backward Compatible</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
                <div className="text-gray-300">Security Audits</div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Launch Your Solana Token Now
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Experience the speed and efficiency of Solana with Token-2022. Perfect for DeFi, NFTs, RWAs, and gaming.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/chain/${chainId}/create`}>
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  data-testid="button-create-token"
                >
                  <Coins className="mr-2 h-5 w-5" />
                  Create Token Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/chain/${chainId}/manage`}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  data-testid="button-manage-tokens"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Manage Tokens
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Advanced Token Management Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {chain.tools.filter((t: any) => t.available).map((tool: any, idx: number) => {
              const iconMap: any = {
                'Coins': Coins, 'Settings': Settings, 'Plus': Plus, 'Flame': Flame,
                'Snowflake': Snowflake, 'Shield': Shield, 'Image': ImageIcon, 'Send': Send
              };
              const Icon = iconMap[tool.icon] || Coins;
              
              return (
                <Link key={idx} href={tool.route}>
                  <Card 
                    className="bg-gray-900/50 border-purple-500/20 p-6 hover:border-purple-500/50 hover:bg-gray-900/70 transition-all cursor-pointer group"
                    data-testid={`card-tool-${tool.id}`}
                  >
                    <Icon className="h-8 w-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-400">{tool.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

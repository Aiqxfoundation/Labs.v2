import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, Zap, Shield, Flame, Plus, Settings,
  Send, Ban, ShieldOff, ArrowRight, CheckCircle2,
  Code, Lock, Layers, TrendingUp
} from "lucide-react";
import ethImage from "@assets/stock_images/ethereum_blockchain__d7530af4.jpg";

export default function EthereumOverview({ chainId, chain }: any) {
  const isTestnet = chainId.includes('sepolia');
  const tokenStandard = "ERC-20";

  const features = [
    {
      icon: Shield,
      title: "Battle-Tested Security",
      description: "Most secure and decentralized blockchain with 400,000+ ERC-20 tokens deployed"
    },
    {
      icon: Code,
      title: "Smart Contract Leader",
      description: "Industry-standard Solidity programming with OpenZeppelin audited libraries"
    },
    {
      icon: Layers,
      title: "Maximum Composability",
      description: "Seamlessly integrate with DeFi protocols, DEXs, and lending platforms"
    },
    {
      icon: Lock,
      title: "Immutable & Trustless",
      description: "Code is law - deployed contracts cannot be altered by anyone"
    }
  ];

  const capabilities = [
    { name: "Burnable Tokens", icon: Flame, desc: "Reduce supply permanently" },
    { name: "Mintable Supply", icon: Plus, desc: "Expand tokens on-demand" },
    { name: "Pausable Transfers", icon: Ban, desc: "Emergency stop functionality" },
    { name: "Tax/Fee System", icon: TrendingUp, desc: "Transaction fees for project funding" },
    { name: "Blacklist Control", icon: ShieldOff, desc: "Block malicious addresses" },
    { name: "Governance Rights", icon: Settings, desc: "DAO voting capabilities" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-indigo-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${ethImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <chain.icon className="h-16 w-16 text-blue-400" />
              <h1 className="text-5xl lg:text-6xl font-bold text-white">
                {chain.displayName}
              </h1>
            </div>
            {isTestnet && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-lg px-4 py-1">
                Testnet Environment
              </Badge>
            )}
            <p className="text-xl lg:text-2xl text-blue-200 mt-4 max-w-3xl mx-auto">
              The World's Leading Smart Contract Platform
            </p>
            <p className="text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
              Create professional-grade ERC-20 tokens with advanced features. No coding required.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <Card className="bg-blue-900/30 border-blue-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-security">
              <div className="text-3xl font-bold text-blue-300">400K+</div>
              <div className="text-sm text-gray-300 mt-1">ERC-20 Tokens</div>
            </Card>
            <Card className="bg-blue-900/30 border-blue-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-value">
              <div className="text-3xl font-bold text-blue-300">$500B+</div>
              <div className="text-sm text-gray-300 mt-1">Total Value Locked</div>
            </Card>
            <Card className="bg-blue-900/30 border-blue-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-speed">
              <div className="text-3xl font-bold text-blue-300">15s</div>
              <div className="text-sm text-gray-300 mt-1">Block Time</div>
            </Card>
            <Card className="bg-blue-900/30 border-blue-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-nodes">
              <div className="text-3xl font-bold text-blue-300">6,000+</div>
              <div className="text-sm text-gray-300 mt-1">Active Nodes</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why Choose Ethereum */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Choose Ethereum for Token Creation?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="bg-gray-900/50 border-blue-500/20 p-6 hover:border-blue-500/40 transition-all hover:transform hover:scale-105"
                data-testid={`card-feature-${idx}`}
              >
                <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Token Capabilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Professional {tokenStandard} Token Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, idx) => (
              <Card 
                key={idx}
                className="bg-gray-900/50 border-blue-500/20 p-5 flex items-start gap-4"
                data-testid={`card-capability-${idx}`}
              >
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <cap.icon className="h-6 w-6 text-blue-400" />
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
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Connect Wallet", desc: "Connect your MetaMask or compatible wallet" },
              { step: "2", title: "Configure Token", desc: "Set name, symbol, supply, and features" },
              { step: "3", title: "Deploy Contract", desc: "One-click deployment to Ethereum" },
              { step: "4", title: "Manage & Trade", desc: "Use advanced tools to manage your token" }
            ].map((item, idx) => (
              <Card 
                key={idx}
                className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30 p-6 text-center"
                data-testid={`card-step-${idx}`}
              >
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Your Ethereum Token?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of projects building on the world's most trusted blockchain platform.
              Professional-grade tools, no coding required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/chain/${chainId}/create`}>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
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
            Available Tools & Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {chain.tools.filter((t: any) => t.available).map((tool: any, idx: number) => {
              const iconMap: any = {
                'Coins': Coins, 'Settings': Settings, 'Plus': Plus, 'Flame': Flame,
                'Pause': Ban, 'Ban': ShieldOff, 'Shield': Shield, 'Send': Send
              };
              const Icon = iconMap[tool.icon] || Coins;
              
              return (
                <Link key={idx} href={tool.route}>
                  <Card 
                    className="bg-gray-900/50 border-blue-500/20 p-6 hover:border-blue-500/50 hover:bg-gray-900/70 transition-all cursor-pointer group"
                    data-testid={`card-tool-${tool.id}`}
                  >
                    <Icon className="h-8 w-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
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

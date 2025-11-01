import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, Zap, Shield, Flame, Plus, Settings,
  Send, Ban, ShieldOff, ArrowRight, CheckCircle2,
  DollarSign, Clock, Users, TrendingUp
} from "lucide-react";
import bnbImage from "@assets/stock_images/bnb_binance_smart_ch_60c89fc4.jpg";

export default function BnbOverview({ chainId, chain }: any) {
  const isTestnet = chainId.includes('testnet');
  const tokenStandard = "BEP-20";

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "3-second block times with 2,000+ TPS for instant transactions"
    },
    {
      icon: DollarSign,
      title: "Ultra-Low Fees",
      description: "Gas fees under $0.03 - most cost-effective Layer 1 blockchain"
    },
    {
      icon: Shield,
      title: "EVM Compatible",
      description: "Seamlessly port Ethereum dApps and tools to BSC"
    },
    {
      icon: Users,
      title: "Massive Ecosystem",
      description: "1.1M+ smart contracts and $50B+ TVL in DeFi protocols"
    }
  ];

  const capabilities = [
    { name: "Mintable Supply", icon: Plus, desc: "Create tokens on-demand" },
    { name: "Burnable Tokens", icon: Flame, desc: "Deflationary mechanisms" },
    { name: "Transaction Tax", icon: TrendingUp, desc: "Auto-redistribute to holders" },
    { name: "Anti-Whale Limits", icon: ShieldOff, desc: "Fair token distribution" },
    { name: "Pausable Transfers", icon: Ban, desc: "Emergency controls" },
    { name: "Liquidity Pool", icon: Send, desc: "Instant DEX tradability" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 via-gray-900 to-amber-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${bnbImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-amber-600/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <chain.icon className="h-16 w-16 text-yellow-400" />
              <h1 className="text-5xl lg:text-6xl font-bold text-white">
                {chain.displayName}
              </h1>
            </div>
            {isTestnet && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-lg px-4 py-1">
                Testnet Environment
              </Badge>
            )}
            <p className="text-xl lg:text-2xl text-yellow-200 mt-4 max-w-3xl mx-auto">
              High-Performance Blockchain for DeFi & dApps
            </p>
            <p className="text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
              Create BEP-20 tokens with lightning speed and ultra-low fees. Built for scalability.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <Card className="bg-yellow-900/30 border-yellow-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-speed">
              <div className="text-3xl font-bold text-yellow-300">3s</div>
              <div className="text-sm text-gray-300 mt-1">Block Time</div>
            </Card>
            <Card className="bg-yellow-900/30 border-yellow-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-tps">
              <div className="text-3xl font-bold text-yellow-300">2,000+</div>
              <div className="text-sm text-gray-300 mt-1">TPS Capacity</div>
            </Card>
            <Card className="bg-yellow-900/30 border-yellow-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-fees">
              <div className="text-3xl font-bold text-yellow-300">$0.03</div>
              <div className="text-sm text-gray-300 mt-1">Average Gas Fee</div>
            </Card>
            <Card className="bg-yellow-900/30 border-yellow-500/30 backdrop-blur p-6 text-center" data-testid="card-stat-tvl">
              <div className="text-3xl font-bold text-yellow-300">$50B+</div>
              <div className="text-sm text-gray-300 mt-1">Total Value Locked</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why Choose BNB */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Choose BNB Smart Chain?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="bg-gray-900/50 border-yellow-500/20 p-6 hover:border-yellow-500/40 transition-all hover:transform hover:scale-105"
                data-testid={`card-feature-${idx}`}
              >
                <feature.icon className="h-10 w-10 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Token Capabilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Advanced {tokenStandard} Token Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, idx) => (
              <Card 
                key={idx}
                className="bg-gray-900/50 border-yellow-500/20 p-5 flex items-start gap-4"
                data-testid={`card-capability-${idx}`}
              >
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <cap.icon className="h-6 w-6 text-yellow-400" />
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
            Launch Your Token in 4 Steps
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Connect Wallet", desc: "MetaMask or Trust Wallet supported" },
              { step: "2", title: "Design Token", desc: "Name, symbol, supply, and features" },
              { step: "3", title: "Deploy to BSC", desc: "Pay ~$0.03 in gas fees" },
              { step: "4", title: "Add Liquidity", desc: "List on PancakeSwap instantly" }
            ].map((item, idx) => (
              <Card 
                key={idx}
                className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-500/30 p-6 text-center"
                data-testid={`card-step-${idx}`}
              >
                <div className="w-12 h-12 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Ecosystem Highlight */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-yellow-600/10 to-amber-600/10 border-yellow-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              🚀 Join the Fastest-Growing Blockchain Ecosystem
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">1.1M+</div>
                <div className="text-gray-300">Smart Contracts Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">200M+</div>
                <div className="text-gray-300">Unique Addresses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">4.6x</div>
                <div className="text-gray-300">More Transactions Than Ethereum</div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-yellow-600 to-amber-600 border-0 p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Create Your BEP-20 Token Today
            </h2>
            <p className="text-yellow-100 mb-8 max-w-2xl mx-auto">
              Experience the speed and efficiency of BNB Smart Chain. Perfect for DeFi, meme coins, and utility tokens.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/chain/${chainId}/create`}>
                <Button 
                  size="lg" 
                  className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold"
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
            Token Management Tools
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
                    className="bg-gray-900/50 border-yellow-500/20 p-6 hover:border-yellow-500/50 hover:bg-gray-900/70 transition-all cursor-pointer group"
                    data-testid={`card-tool-${tool.id}`}
                  >
                    <Icon className="h-8 w-8 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
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

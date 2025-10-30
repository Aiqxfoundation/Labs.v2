import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, bigint, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Blockchain types
export type BlockchainType = "EVM" | "Solana";
export type NetworkType = "mainnet" | "testnet" | "devnet";

// Blockchain networks configuration
export const SUPPORTED_CHAINS = {
  // Ethereum Mainnet
  "ethereum-mainnet": {
    name: "Ethereum Mainnet",
    chainId: 1,
    symbol: "ETH",
    color: "120 100% 35%",
    blockchainType: "EVM" as BlockchainType,
    networkType: "mainnet" as NetworkType,
    explorerUrl: "https://etherscan.io",
  },
  // Ethereum Testnet (Sepolia)
  "ethereum-testnet": {
    name: "Ethereum Sepolia",
    chainId: 11155111,
    symbol: "SepoliaETH",
    color: "120 100% 45%",
    blockchainType: "EVM" as BlockchainType,
    networkType: "testnet" as NetworkType,
    explorerUrl: "https://sepolia.etherscan.io",
  },
  // BSC Mainnet
  "bsc-mainnet": {
    name: "BNB Smart Chain",
    chainId: 56,
    symbol: "BNB",
    color: "30 100% 50%",
    blockchainType: "EVM" as BlockchainType,
    networkType: "mainnet" as NetworkType,
    explorerUrl: "https://bscscan.com",
  },
  // BSC Testnet
  "bsc-testnet": {
    name: "BNB Testnet",
    chainId: 97,
    symbol: "tBNB",
    color: "30 100% 60%",
    blockchainType: "EVM" as BlockchainType,
    networkType: "testnet" as NetworkType,
    explorerUrl: "https://testnet.bscscan.com",
  },
  // Solana Testnet
  "solana-testnet": {
    name: "Solana Testnet",
    chainId: 0,
    symbol: "SOL",
    color: "280 100% 55%",
    blockchainType: "Solana" as BlockchainType,
    networkType: "testnet" as NetworkType,
    explorerUrl: "https://explorer.solana.com/?cluster=testnet",
  },
  // Solana Mainnet
  "solana-mainnet": {
    name: "Solana Mainnet",
    chainId: 0,
    symbol: "SOL",
    color: "280 100% 50%",
    blockchainType: "Solana" as BlockchainType,
    networkType: "mainnet" as NetworkType,
    explorerUrl: "https://explorer.solana.com",
  },
} as const;

export type ChainId = keyof typeof SUPPORTED_CHAINS;

// Token features for EVM chains
export const EVM_TOKEN_FEATURES = {
  mintable: {
    name: "Mintable",
    description: "Owner can create new tokens after deployment",
    icon: "Plus",
  },
  burnable: {
    name: "Burnable",
    description: "Token holders can permanently destroy their tokens",
    icon: "Flame",
  },
  pausable: {
    name: "Pausable",
    description: "Owner can pause all token transfers in emergencies",
    icon: "Pause",
  },
  capped: {
    name: "Capped Supply",
    description: "Set maximum supply limit that cannot be exceeded",
    icon: "Shield",
  },
  taxable: {
    name: "Transfer Tax",
    description: "Automatic tax on transfers sent to treasury wallet",
    icon: "Percent",
  },
  blacklist: {
    name: "Blacklist",
    description: "Block specific addresses from token transfers",
    icon: "Ban",
  },
} as const;

// Token types for Solana
export const SOLANA_TOKEN_TYPES = {
  standard: {
    name: "SPL Token",
    description: "Standard Solana token",
    features: ["Transfer", "Balance tracking"],
  },
  mintable: {
    name: "SPL Token (Mintable)",
    description: "Token with mint authority",
    features: ["Transfer", "Balance tracking", "Minting"],
  },
} as const;

export type EvmTokenFeature = keyof typeof EVM_TOKEN_FEATURES;
export type SolanaTokenType = keyof typeof SOLANA_TOKEN_TYPES;

// Deployed tokens table
export const deployedTokens = pgTable("deployed_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  decimals: integer("decimals").notNull().default(18),
  totalSupply: text("total_supply").notNull(),
  chainId: text("chain_id").notNull(),
  contractAddress: text("contract_address"),
  deployerAddress: text("deployer_address").notNull(),
  transactionHash: text("transaction_hash"),
  status: text("status").notNull().default("pending"),
  
  // EVM token features (individual flags)
  isMintable: boolean("is_mintable").default(false),
  isBurnable: boolean("is_burnable").default(false),
  isPausable: boolean("is_pausable").default(false),
  isCapped: boolean("is_capped").default(false),
  hasTax: boolean("has_tax").default(false),
  hasBlacklist: boolean("has_blacklist").default(false),
  maxSupply: text("max_supply"),
  taxPercentage: integer("tax_percentage"),
  treasuryWallet: text("treasury_wallet"),
  
  // Solana specific fields
  tokenType: text("token_type"),
  mintAuthority: text("mint_authority"),
  freezeAuthority: text("freeze_authority"),
  updateAuthority: text("update_authority"),
  
  // Token metadata
  logoUrl: text("logo_url"),
  description: text("description"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  deployedAt: timestamp("deployed_at"),
});

export const insertDeployedTokenSchema = createInsertSchema(deployedTokens).omit({
  id: true,
  createdAt: true,
});

export type InsertDeployedToken = z.infer<typeof insertDeployedTokenSchema>;
export type DeployedToken = typeof deployedTokens.$inferSelect;

// Token deployment request schema for EVM chains
export const evmTokenCreationSchema = z.object({
  name: z.string().min(1, "Token name is required").max(50, "Token name too long"),
  symbol: z.string().min(1, "Symbol is required").max(10, "Symbol too long"),
  decimals: z.number().int().min(0).max(18).default(18),
  totalSupply: z.string().min(1, "Total supply is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Total supply must be a positive number"),
  chainId: z.enum([
    "ethereum-mainnet",
    "ethereum-testnet",
    "bsc-mainnet",
    "bsc-testnet",
  ]),
  
  // Token features (can be combined - multiple features enabled by default)
  isMintable: z.boolean().default(true),
  isBurnable: z.boolean().default(true),
  isPausable: z.boolean().default(true),
  isCapped: z.boolean().default(false),
  hasTax: z.boolean().default(false),
  hasBlacklist: z.boolean().default(false),
  
  // Feature-specific fields
  maxSupply: z.string().optional().refine((val) => {
    if (!val) return true;
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Max supply must be a positive number"),
  taxPercentage: z.number().int().min(0).max(25).default(5),
  treasuryWallet: z.string().default(""),
  
  logoUrl: z.string().optional(),
  description: z.string().max(500).optional(),
})
.refine((data) => {
  if (data.hasTax && (!data.taxPercentage || data.taxPercentage <= 0)) {
    return false;
  }
  return true;
}, {
  message: "Tax percentage must be greater than 0 when tax feature is enabled",
  path: ["taxPercentage"],
})
.refine((data) => {
  if (data.hasTax && !data.treasuryWallet) {
    return false;
  }
  return true;
}, {
  message: "Treasury wallet address is required when tax feature is enabled",
  path: ["treasuryWallet"],
})
.refine((data) => {
  if (data.isCapped && !data.maxSupply) {
    return false;
  }
  return true;
}, {
  message: "Maximum supply is required when capped feature is enabled",
  path: ["maxSupply"],
})
.refine((data) => {
  if (data.isCapped && data.maxSupply) {
    const total = parseFloat(data.totalSupply);
    const max = parseFloat(data.maxSupply);
    return max >= total;
  }
  return true;
}, {
  message: "Maximum supply must be greater than or equal to initial supply",
  path: ["maxSupply"],
})
// Multiple features can now be combined!

// Token deployment request schema for Solana
export const solanaTokenCreationSchema = z.object({
  name: z.string().min(1, "Token name is required").max(32, "Token name too long"),
  symbol: z.string().min(1, "Symbol is required").max(10, "Symbol too long"),
  decimals: z.number().int().min(0).max(9).default(9),
  totalSupply: z.string().refine((val) => {
    if (val.trim() === '' || val.trim() === '0') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, "Total supply must be a number or 0 for unlimited supply"),
  chainId: z.enum(["solana-testnet", "solana-mainnet"]),
  description: z.string().max(200, "Description too long").optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  twitter: z.string().max(100).optional(),
  telegram: z.string().max(100).optional(),
  logoUrl: z.string().optional(),
  enableMintAuthority: z.boolean().default(true),
  enableFreezeAuthority: z.boolean().default(true),
  enableUpdateAuthority: z.boolean().default(true),
});

// Base schemas for discriminated union (without refine)
const evmTokenCreationBaseSchema = z.object({
  name: z.string().min(1, "Token name is required").max(50, "Token name too long"),
  symbol: z.string().min(1, "Symbol is required").max(10, "Symbol too long"),
  decimals: z.number().int().min(0).max(18).default(18),
  totalSupply: z.string().min(1, "Total supply is required"),
  chainId: z.enum([
    "ethereum-mainnet",
    "ethereum-testnet",
    "bsc-mainnet",
    "bsc-testnet",
  ]),
  isMintable: z.boolean().default(false),
  isBurnable: z.boolean().default(false),
  isPausable: z.boolean().default(false),
  isCapped: z.boolean().default(false),
  hasTax: z.boolean().default(false),
  hasBlacklist: z.boolean().default(false),
  maxSupply: z.string().optional(),
  taxPercentage: z.number().int().min(0).max(25).default(5),
  treasuryWallet: z.string().default(""),
  logoUrl: z.string().optional(),
  description: z.string().max(500).optional(),
});

// Unified token creation schema (without validation for discriminatedUnion)
export const tokenCreationSchema = z.discriminatedUnion("blockchainType", [
  z.object({
    blockchainType: z.literal("EVM"),
  }).merge(evmTokenCreationBaseSchema),
  z.object({
    blockchainType: z.literal("Solana"),
  }).merge(solanaTokenCreationSchema),
]);

export type EvmTokenCreationForm = z.infer<typeof evmTokenCreationSchema>;
export type SolanaTokenCreationForm = z.infer<typeof solanaTokenCreationSchema>;
export type TokenCreationForm = z.infer<typeof tokenCreationSchema>;

// RPC configuration schema
export const rpcConfigSchema = z.object({
  // Ethereum
  ethereumMainnet: z.string().url().optional(),
  ethereumTestnet: z.string().url().optional(),
  // BSC
  bscMainnet: z.string().url().optional(),
  bscTestnet: z.string().url().optional(),
  // Solana
  solanaDevnet: z.string().url().optional(),
  solanaTestnet: z.string().url().optional(),
  solanaMainnet: z.string().url().optional(),
});

export type RpcConfig = z.infer<typeof rpcConfigSchema>;

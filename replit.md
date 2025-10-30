# AIQX Labs - Professional Multi-Chain Token Platform

## Overview
AIQX Labs is a production-ready multi-chain token creation and management platform supporting Ethereum, BSC, Polygon, and Solana. The platform features uniform navigation across all chains, smart contract-based feature embedding for EVM tokens, explicit authority management for Solana tokens, integrated IPFS support via Pinata, and a comprehensive configuration system for production deployment.

## User Preferences
### Development Workflow
1. **Chain Selection**: Users select a blockchain which persists across sessions
2. **Wallet Connection**: Wallets auto-reconnect on page refresh
3. **Token Creation**: Chain-specific forms with validation
4. **Transaction Tracking**: Real-time status updates with explorer links

### Coding Style
- TypeScript throughout
- Zod for validation
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form for forms
- TanStack Query for data fetching

## System Architecture
The platform features a chain-aware architecture where each blockchain is treated as an independent system. Key architectural decisions include:

### UI/UX Decisions
- **Uniform Multi-Chain Navigation**: All supported chains (Ethereum, BSC, Polygon, Solana) display identical sidebar structures with consistent tool access (Create Token, Manage Tokens, Mint Tokens, Burn Tokens, Freeze Account, Authority Tools, Update Metadata, Multisender).
- **Global Wallet Connection**: A single wallet connection in the top navbar persists across all pages and chain switches, eliminating the need for per-page connection buttons.
- **Explicit Solana Authority UI**: Token authority management uses professional radio button groups with clear "Keep Authority" and "Revoke Authority" options, color-coded feedback (green/red), and permanent decision warnings.
- **Professional Transaction Feedback**: A dedicated modal provides real-time transaction status updates (Processing, Confirming, Success/Failed) with explorer links and user-friendly error messages.
- **Help System**: A multi-page, card-based help documentation system is integrated, providing guides on various platform features.
- **Token Management Panel**: A dashboard allows users to view and manage deployed tokens, with features like disabling mint, pausing, managing blacklists, and updating taxes.
- **Logo Upload**: Integrated IPFS-based logo upload with instant preview for token creation.

### Technical Implementations
- **Chain Context System**: Global state management (`ChainContext`) for the selected blockchain, with persistence via `localStorage`.
- **Wallet Management**: Separate wallet contexts for EVM chains (MetaMask integration with auto-reconnect) and Solana (multi-wallet support including Phantom, OKX, Solflare, Backpack). Automatic wallet disconnection occurs when switching between EVM and Solana chains. Global connection managed via MainLayout navbar.
- **Token Creation**:
    - **EVM Chains**: Advanced smart contract system using constructor flags to enable/disable features at deployment time. Supports Mintable, Burnable, Pausable, Capped Supply, Transfer Tax, and Blacklist features. Uses OpenZeppelin-compatible pattern where all functions exist in ABI but logic respects feature flags (`server/contracts/evmTokenTemplates.ts`).
    - **Solana**: SPL token creation with explicit Keep/Revoke authority management via radio button UI. Supports Mint Authority, Freeze Authority, and Update Authority with permanent decision warnings. Metadata support includes IPFS integration for images.
- **IPFS Integration**: Production-ready Pinata integration with utilities for uploading images, metadata, and logo files (`client/src/utils/ipfsUploader.ts`). Supports environment-based configuration with graceful fallbacks.
- **Configuration System**: App-wide configuration management (`client/src/config/app-config.ts`) with feature detection for IPFS and Alchemy services, environment variable support, and configuration status checking.
- **RPC Configuration**: Centralized RPC endpoint management (`client/src/config/rpc.ts`) with environment variable support and fallback public RPCs.
- **Validation**: Zod is used for schema validation across the application.
- **Performance**: Solana metadata updates feature lazy loading, on-demand fetching, and optimized RPC calls for efficient performance.

### System Design Choices
- **Modular Design**: The codebase is organized into `components`, `contexts`, `config`, `hooks`, `pages`, and `utils` for maintainability.
- **Shared Validation Schema**: A `shared/schema.ts` file centralizes validation rules for consistency.
- **Client-side Signing**: No private keys are handled on the server, ensuring user security.
- **Stateless Operation**: Deployment is configured for `autoscale` to support stateless operation.

## External Dependencies
- **Blockchain Networks**: Ethereum, Binance Smart Chain (BSC), Polygon, Solana
- **Wallet Integrations**:
    - **EVM**: MetaMask (global connection in navbar)
    - **Solana**: Phantom, OKX Wallet, Solflare, Backpack (global connection in navbar)
- **IPFS Storage**: Pinata (for token images and metadata) - Optional with environment configuration
- **RPC Providers**: Alchemy (enhanced RPC endpoints) - Optional with environment configuration
- **Styling**: Tailwind CSS with custom dark mode support
- **Animation**: Framer Motion
- **Form Management**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query
- **Development Server**: Vite
- **Backend Framework**: Express.js

## Required Configuration (Production)
Create a `.env` file based on `.env.example`:

### IPFS Configuration (Optional)
```env
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
```

### Blockchain RPC Configuration (Optional but Recommended)
```env
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
VITE_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org/
VITE_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### Application Settings
```env
NODE_ENV=production
PORT=5000
```

## Recent Updates (October 2025)
1. **Multi-Chain Navigation Standardization**: All chains now show identical sidebar layouts
2. **Smart Contract Feature System**: EVM tokens use constructor flags for feature toggling
3. **Solana Authority UI Enhancement**: Replaced switches with explicit Keep/Revoke radio buttons
4. **IPFS Integration**: Added Pinata utilities with environment-based configuration
5. **Production Configuration**: Created app-wide config system with feature detection
6. **Global Wallet Connection**: Unified wallet management in top navbar across all pages
7. **Solana Network Consolidation**: Removed Devnet support per user request - now supports only Testnet and Mainnet for Solana
8. **Chain Routing Fix**: Fixed chain detection logic to properly identify Solana chains using blockchain type instead of exact chainId match
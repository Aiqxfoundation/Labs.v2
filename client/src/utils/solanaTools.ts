import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  createMintToInstruction,
  createBurnInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
  getAccount,
  getMint,
  createFreezeAccountInstruction,
  createThawAccountInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
// import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';

/**
 * Multisender: Send tokens to multiple addresses in a single transaction
 */
export async function multisendTokens(
  connection: Connection,
  payer: PublicKey,
  mintAddress: string,
  recipients: { address: string; amount: number }[],
  decimals: number,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
): Promise<string> {
  const mint = new PublicKey(mintAddress);
  const transaction = new Transaction();

  // Get sender's token account
  const senderTokenAccount = await getAssociatedTokenAddress(mint, payer);

  for (const recipient of recipients) {
    const recipientPubkey = new PublicKey(recipient.address);
    const recipientTokenAccount = await getAssociatedTokenAddress(mint, recipientPubkey);

    // Check if recipient token account exists, if not create it
    try {
      await getAccount(connection, recipientTokenAccount);
    } catch {
      // Account doesn't exist, add instruction to create it
      transaction.add(
        createAssociatedTokenAccountInstruction(
          payer,
          recipientTokenAccount,
          recipientPubkey,
          mint
        )
      );
    }

    // Add transfer instruction
    const amount = BigInt(recipient.amount * Math.pow(10, decimals));
    transaction.add(
      createTransferInstruction(
        senderTokenAccount,
        recipientTokenAccount,
        payer,
        amount
      )
    );
  }

  // Get recent blockhash
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  // Sign and send
  const signedTx = await signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  console.log('✅ Multisend transaction sent! Signature:', signature);
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight });
  console.log('✅ Multisend transaction confirmed! Signature:', signature);

  return signature;
}

/**
 * Transfer Authority: Transfer mint or freeze authority to another wallet
 */
export async function transferAuthority(
  connection: Connection,
  payer: PublicKey,
  mintAddress: string,
  authorityType: 'mint' | 'freeze',
  newAuthority: string,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
): Promise<string> {
  const mint = new PublicKey(mintAddress);
  const newAuthorityPubkey = new PublicKey(newAuthority);
  const transaction = new Transaction();

  const authType = authorityType === 'mint' ? AuthorityType.MintTokens : AuthorityType.FreezeAccount;

  transaction.add(
    createSetAuthorityInstruction(
      mint,
      payer,
      authType,
      newAuthorityPubkey
    )
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  const signedTx = await signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  console.log(`✅ Transfer ${authorityType} authority transaction sent! Signature:`, signature);
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight });
  console.log(`✅ Transfer ${authorityType} authority confirmed! Signature:`, signature);

  return signature;
}

/**
 * Update Metadata: Update token metadata using Metaplex
 * Note: This feature is coming soon and requires proper Metaplex setup
 */
export async function updateTokenMetadata(
  connection: Connection,
  wallet: any,
  mintAddress: string,
  metadata: {
    name?: string;
    symbol?: string;
    description?: string;
    image?: string;
  }
): Promise<string> {
  // TODO: Implement when Metaplex browser compatibility is resolved
  throw new Error('Metadata update feature coming soon');
}

/**
 * Mint Tokens: Mint additional tokens to a wallet
 */
export async function mintTokens(
  connection: Connection,
  payer: PublicKey,
  mintAddress: string,
  destinationAddress: string,
  amount: number,
  decimals: number,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
): Promise<string> {
  const mint = new PublicKey(mintAddress);
  const destination = new PublicKey(destinationAddress);
  const transaction = new Transaction();

  // Get or create destination token account
  const destinationTokenAccount = await getAssociatedTokenAddress(mint, destination);

  try {
    await getAccount(connection, destinationTokenAccount);
  } catch {
    // Account doesn't exist, create it
    transaction.add(
      createAssociatedTokenAccountInstruction(
        payer,
        destinationTokenAccount,
        destination,
        mint
      )
    );
  }

  // Add mint instruction
  const mintAmount = BigInt(amount * Math.pow(10, decimals));
  transaction.add(
    createMintToInstruction(
      mint,
      destinationTokenAccount,
      payer,
      mintAmount
    )
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  const signedTx = await signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  console.log(`✅ Mint ${amount} tokens transaction sent! Signature:`, signature);
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight });
  console.log(`✅ Mint ${amount} tokens confirmed! Signature:`, signature);

  return signature;
}

/**
 * Burn Tokens: Burn tokens from your wallet
 */
export async function burnTokens(
  connection: Connection,
  payer: PublicKey,
  mintAddress: string,
  amount: number,
  decimals: number,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
): Promise<string> {
  const mint = new PublicKey(mintAddress);
  const transaction = new Transaction();

  // Get token account
  const tokenAccount = await getAssociatedTokenAddress(mint, payer);

  // Add burn instruction
  const burnAmount = BigInt(amount * Math.pow(10, decimals));
  transaction.add(
    createBurnInstruction(
      tokenAccount,
      mint,
      payer,
      burnAmount
    )
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  const signedTx = await signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  console.log(`✅ Burn ${amount} tokens transaction sent! Signature:`, signature);
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight });
  console.log(`✅ Burn ${amount} tokens confirmed! Signature:`, signature);

  return signature;
}

/**
 * Freeze Account: Freeze a token account
 */
export async function freezeTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mintAddress: string,
  accountToFreeze: string,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
): Promise<string> {
  const mint = new PublicKey(mintAddress);
  const account = new PublicKey(accountToFreeze);
  const transaction = new Transaction();

  transaction.add(
    createFreezeAccountInstruction(
      account,
      mint,
      payer
    )
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  const signedTx = await signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  console.log('✅ Freeze account transaction sent! Signature:', signature);
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight });
  console.log('✅ Freeze account confirmed! Signature:', signature);

  return signature;
}

/**
 * Unfreeze Account: Unfreeze a token account
 */
export async function unfreezeTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mintAddress: string,
  accountToUnfreeze: string,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
): Promise<string> {
  const mint = new PublicKey(mintAddress);
  const account = new PublicKey(accountToUnfreeze);
  const transaction = new Transaction();

  transaction.add(
    createThawAccountInstruction(
      account,
      mint,
      payer
    )
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  const signedTx = await signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  console.log('✅ Unfreeze account transaction sent! Signature:', signature);
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight });
  console.log('✅ Unfreeze account confirmed! Signature:', signature);

  return signature;
}

/**
 * Get Token Balance
 */
export async function getTokenBalance(
  connection: Connection,
  mintAddress: string,
  owner: PublicKey
): Promise<number> {
  try {
    const mint = new PublicKey(mintAddress);
    const tokenAccount = await getAssociatedTokenAddress(mint, owner);
    const account = await getAccount(connection, tokenAccount);
    const mintInfo = await getMint(connection, mint);
    return Number(account.amount) / Math.pow(10, mintInfo.decimals);
  } catch {
    return 0;
  }
}

/**
 * Check if account is frozen
 */
export async function isAccountFrozen(
  connection: Connection,
  accountAddress: string
): Promise<boolean> {
  try {
    const account = await getAccount(connection, new PublicKey(accountAddress));
    return account.isFrozen;
  } catch {
    return false;
  }
}

// npm install @metaplex-foundation/mpl-token-metadata @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults
import {
  fetchDigitalAsset,
  mplTokenMetadata,
  updateV1,
} from '@metaplex-foundation/mpl-token-metadata'
import {
  keypairIdentity,
  publicKey,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { readFileSync } from 'fs'

// Initialize Umi with your RPC endpoint
const umi = createUmi('http://localhost:8899').use(mplTokenMetadata())

// Load your wallet keypair (must be the update authority)
const wallet = '/home/christone/.config/solana/id.json'
const secretKey = JSON.parse(readFileSync(wallet, 'utf-8'))
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey))
umi.use(keypairIdentity(keypair))

// Your token mint address
const mintAddress = publicKey('8mqVHrS9Ga1P4fdjFUd45CZ17Dfa88MsULC3kjzt5GVp');

// Fetch existing token data
const asset = await fetchDigitalAsset(umi, mintAddress)

// Update the token metadata (name, symbol, and URI)
await updateV1(umi, {
  mint: mintAddress,
  authority: umi.identity,
  data: {
    ...asset.metadata,
    name: 'BILLy Token',
    symbol: 'BIL',
    uri: 'https://example.com/updated-metadata.json',
  },
}).sendAndConfirm(umi)

console.log('Token metadata updated successfully')
console.log('Mint:', mintAddress)

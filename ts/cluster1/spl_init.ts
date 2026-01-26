import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "/home/christone/.config/solana/id.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

console.log("Public Key is: " + keypair.publicKey);


//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("http://localhost:8899", commitment);

(async () => {
    try {
        // Start here
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null,
            6
        );

        console.log("New Mint Account => " + mint);

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()

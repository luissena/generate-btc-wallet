import bs58 from "bs58";
import { subtle, webcrypto } from "crypto";
import RIPEMD160 from "ripemd160";

async function generateKeyPair() {
  const algorithmParams: EcKeyGenParams = {
    name: "ECDSA",
    namedCurve: "P-256",
  };

  const {
    privateKey: generatedPrivateKey,
    publicKey: generatedPublicKey,
  } = await webcrypto.subtle.generateKey(algorithmParams, true, [
    "sign",
    "verify",
  ]);

  const privateKey = await webcrypto.subtle.exportKey(
    "jwk",
    generatedPrivateKey
  );

  const publicKey = await webcrypto.subtle.exportKey(
    "raw",
    generatedPublicKey
  );

  return { privateKey, publicKey };
}

async function hashPublicKey(
  publicKey: ArrayBuffer
): Promise<{ hashedPublicKey: string }> {
  let hashedPublicKey: string | ArrayBuffer;
  const ripemd160 = new RIPEMD160();

  hashedPublicKey = await subtle.digest("SHA-256", publicKey);

  hashedPublicKey = ripemd160
    .update(Buffer.from(hashedPublicKey))
    .digest("hex");

  return { hashedPublicKey: hashedPublicKey.toString() };
}

async function generateBitcoinWalletAdress() {
  const { privateKey, publicKey } = await generateKeyPair();

  if (!privateKey.d) {
    return console.error("Private key not found");
  }

  const { hashedPublicKey } = await hashPublicKey(publicKey);

  const publicKeyWithPrefix = `00${hashedPublicKey}`;

  const checksum = await generateChecksum(publicKeyWithPrefix);

  const walletAdress = Buffer.from(publicKeyWithPrefix + checksum, "hex");

  const walletAdressBase58 = bs58.encode(walletAdress);

  const privateKeyHex = Buffer.from(privateKey.d, "base64").toString(
    "hex"
  );

  console.log("Private key (hex): ", privateKeyHex);
  console.log("Bitcoin address (base58): ", walletAdressBase58);
}

async function generateChecksum(publicKey: string): Promise<string> {
  const publicKeyBuffer = Buffer.from(publicKey, "hex");

  let checksum = await subtle.digest("SHA-256", publicKeyBuffer);
  checksum = await subtle.digest("SHA-256", checksum);

  const checksumSliced = checksum.slice(0, 4);

  return Buffer.from(checksumSliced).toString("hex");
}

generateBitcoinWalletAdress();

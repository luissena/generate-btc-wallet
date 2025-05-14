# Generate BTC Wallet

A simple Node.js script to generate a Bitcoin wallet address using native Web Crypto APIs and `ripemd160`.

## 🌟 Features

- Generates an ECDSA key pair using the P-256 curve.
- Hashes the public key using SHA-256 followed by RIPEMD-160.
- Adds a version byte and computes a checksum using double SHA-256.
- Encodes the final result using Base58 to generate a Bitcoin address.
- Outputs the private key (hex) and Bitcoin address (Base58) to the console.

> ⚠️ This is a simplified implementation for educational purposes and **should not be used in production** to manage real funds.

## 📚 Requirements

- Node.js (v20 or later recommended, to ensure support for `webcrypto`)
- npm

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/luissena/generate-btc-wallet.git
cd generate-btc-wallet
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Usage

Run the script with:

```bash
node index.ts
```

This will print to the console:

- The private key in hexadecimal format.

- The generated Bitcoin wallet address encoded in Base58.

Example output:

```bash
Private key (hex):  6d7fbd5c...
Bitcoin address (base58):  1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
```

## 🛠️ How it works

1. Key Generation: Uses ECDSA with P-256 curve via the Web Crypto API.

2. Public Key Hashing: Applies SHA-256 and RIPEMD-160 to the raw public key.

3. Address Formatting:

   - Prefixes with 00 (version byte for Bitcoin mainnet).
   - Computes checksum: double SHA-256 of the result and takes the first 4 bytes.
   - Appends checksum and encodes using Base58.

## ❗Disclaimer

This is a minimalistic and non-secure implementation meant for learning and experimentation only. For real-world usage, consider using mature libraries like [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib).

## 📄 License

Licensed under the MIT License.

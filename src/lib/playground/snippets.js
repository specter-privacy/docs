export const SNIPPETS = {
  'full-flow': `// Full end-to-end flow: recipient setup → sender payment → recipient scan
await initSpecterSdk();

// 1. Recipient generates identity keys
const recipient = generateSpecterKeys();
console.log('Spending PK:', recipient.spending.publicKey.slice(0, 40) + '...');
console.log('Viewing  PK:', recipient.viewing.publicKey.slice(0, 40) + '...');

// 2. Build a meta-address to publish
const meta = metaAddressFromPublicKeys(
  recipient.spending.publicKey,
  recipient.viewing.publicKey,
  { description: 'Alice playground' }
);
console.log('Meta-address size:', meta.bytes.length, 'bytes');

// 3. Sender creates a stealth payment (only needs the meta-address hex)
const payment = createStealthPayment(meta.hex);
console.log('\\nETH stealth address:', payment.ethAddress);
console.log('Sui stealth address:', payment.suiAddress);
console.log('View tag:', payment.viewTag);

// 4. Recipient scans the announcement.
//    Passing the spending SECRET key makes a match return stealthKeys
//    (the spendable ethPrivateKey). Omit it for a watch-only scan.
const result = scanAnnouncement(
  { ephemeralCiphertext: payment.ephemeralCiphertext, viewTag: payment.viewTag },
  recipient.viewing,
  recipient.spending.publicKey,
  recipient.spending.secretKey
);
console.log('\\nisMatch:', result.isMatch);
if (result.isMatch) {
  console.log('Stealth ETH address:', result.stealthKeys.ethAddress);
  console.log('Stealth Sui address:', result.stealthKeys.suiAddress);
  console.log('ethPrivateKey: [redacted by SDK]');
}`,

  keygen: `await initSpecterSdk();

// Single ML-KEM-768 keypair
const kp = generateKeysLocal();
console.log('Public key:', kp.publicKey.slice(0, 60) + '...');
console.log('Expected size:', KYBER_PUBLIC_KEY_SIZE, 'bytes');

// Full identity (spending + viewing keypairs)
const keys = generateSpecterKeys();
console.log('\\nSpending PK:', keys.spending.publicKey.slice(0, 40) + '...');
console.log('Viewing  PK:', keys.viewing.publicKey.slice(0, 40) + '...');
console.log('\\nSecret keys are redacted in JSON:');
console.log(JSON.stringify(keys.spending));`,

  meta: `await initSpecterSdk();

const keys = generateSpecterKeys();

const meta = metaAddressFromPublicKeys(
  keys.spending.publicKey,
  keys.viewing.publicKey,
  { description: 'My wallet', createdAt: Math.floor(Date.now() / 1000) }
);

console.log('Meta hex (first 80):', meta.hex.slice(0, 80) + '...');
console.log('Total size:', meta.bytes.length, 'bytes');
console.log('Protocol version:', meta.address.version);

// Round-trip: parse it back
const parsed = parseMetaAddress(meta.hex);
console.log('\\nSpending PK matches:', parsed.address.spendingPk === keys.spending.publicKey);
console.log('Viewing  PK matches:', parsed.address.viewingPk === keys.viewing.publicKey);`,

  payment: `await initSpecterSdk();

const recipient = generateSpecterKeys();
const meta = metaAddressFromPublicKeys(
  recipient.spending.publicKey,
  recipient.viewing.publicKey
);

const payment = createStealthPayment(meta.hex);
console.log('ETH stealth address:', payment.ethAddress);
console.log('Sui stealth address:', payment.suiAddress);
console.log('View tag (1 byte):', payment.viewTag);
console.log('Ciphertext bytes:', payment.ephemeralCiphertext.length / 2);
console.log('Expected:', KYBER_CIPHERTEXT_SIZE, 'bytes');`,

  scan: `await initSpecterSdk();

const recipient = generateSpecterKeys();
const meta = metaAddressFromPublicKeys(
  recipient.spending.publicKey,
  recipient.viewing.publicKey
);
const payment = createStealthPayment(meta.hex);

// Single scan (spending secret key derives the spendable stealthKeys)
const result = scanAnnouncement(
  { ephemeralCiphertext: payment.ephemeralCiphertext, viewTag: payment.viewTag },
  recipient.viewing,
  recipient.spending.publicKey,
  recipient.spending.secretKey
);
console.log('isMatch:', result.isMatch);
if (result.isMatch) {
  console.log('ETH:', result.stealthKeys.ethAddress);
  console.log('Sui:', result.stealthKeys.suiAddress);
}

// Batch: 5 noise payments + 1 ours
const noise = Array.from({ length: 5 }, () => {
  const tmp = generateSpecterKeys();
  const tmpMeta = metaAddressFromPublicKeys(tmp.spending.publicKey, tmp.viewing.publicKey);
  return createStealthPayment(tmpMeta.hex);
});
const batch = [...noise, payment];
const batchResults = scanAnnouncements(batch, recipient.viewing, recipient.spending.publicKey);
const matches = batchResults.filter(r => r.isMatch);
console.log('\\nBatch:', matches.length, 'match(es) in', batch.length, 'announcements');`,

  'low-level': `await initSpecterSdk();

const recipient = generateSpecterKeys();

// Encapsulate to viewing public key (sender side)
const enc = encapsulate(recipient.viewing.publicKey);
console.log('Ciphertext:', enc.ciphertext.slice(0, 40) + '...');

// Decapsulate (recipient side)
const sharedSecret = decapsulate(enc.ciphertext, recipient.viewing.secretKey);
console.log('Decapsulation OK:', typeof sharedSecret === 'string');

// View tag
const tag = computeViewTag(sharedSecret);
console.log('View tag:', tag);
console.log('View tag verified:', verifyViewTag(sharedSecret, tag));

// Derive stealth addresses
const ethAddr = deriveStealthAddress(recipient.spending.publicKey, sharedSecret);
const suiAddr = deriveStealthSuiAddress(recipient.spending.publicKey, sharedSecret);
console.log('\\nETH stealth address:', ethAddr);
console.log('Sui stealth address:', suiAddr);

// Detection (public data only): re-derive the stealth secp256k1 public key
const detected = deriveStealthPublic(recipient.spending.publicKey, sharedSecret);
console.log('secp256k1 pubkey:', detected.publicKey.slice(0, 40) + '...');

// Spending (needs the SECRET spending key): recover the one-time private key
const spendKeys = deriveStealthKeys(recipient.spending.secretKey, sharedSecret);
console.log('stealth ETH address:', spendKeys.ethAddress);
console.log('ethPrivateKey: [redacted by SDK]');`,

  metadata: `await initSpecterSdk();

// Announcement metadata encryption (AES-256-GCM, keyed from ML-KEM shared secret)
// The 77-byte plaintext block: [view_tag(1)] [tx_hash(32)] [amount(32)] [chain_id(8)] [reserved(4)]
// The 93-byte encrypted block adds a 16-byte GCM authentication tag.
console.log('Plaintext metadata size:', PLAINTEXT_METADATA_SIZE, 'bytes');
console.log('Encrypted metadata size:', ENCRYPTED_METADATA_SIZE, 'bytes');

// Derive a shared secret via ML-KEM (simulates the encapsulation a sender would do)
const recipient = generateSpecterKeys();
const enc = encapsulate(recipient.viewing.publicKey);

// SENDER: seal — view tag is derived from sharedSecret automatically
const encryptedMeta = sealAnnouncementMetadata(
  {
    txHash: '0x' + 'ab'.repeat(32),  // 32-byte tx hash
    amount: 1000000000000000000n,      // 1 ETH in wei (bigint accepted)
    sourceChainId: 1,                  // Ethereum mainnet
  },
  enc.sharedSecret,
);
console.log('\\nSealed metadata (first 80):', encryptedMeta.slice(0, 80) + '...');
console.log('Sealed size:', encryptedMeta.length / 2, 'bytes');

// RECIPIENT: derive the same shared secret, then open
const recipientSecret = decapsulate(enc.ciphertext, recipient.viewing.secretKey);
const meta = openAnnouncementMetadata(encryptedMeta, recipientSecret);

console.log('\\nDecoded metadata:');
console.log('  viewTag:', meta.viewTag);
console.log('  txHash:', meta.txHash?.slice(0, 20) + '...');
console.log('  amount:', meta.amount);
console.log('  sourceChainId:', meta.sourceChainId);`,

  blank: `await initSpecterSdk();

// Write your code here.
// All SDK functions are available as globals — no imports needed.
`,
};

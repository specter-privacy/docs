# Web3, Post-Quantum, and Privacy — Extended Reference

Companion to [SKILL.md](SKILL.md). Read when writing explanation, security, or deep-dive pages.

---

## Part A: Web3 documentation mastery

### A.1 The four reader personas

Every SPECTER doc should declare (implicitly or explicitly) which persona it serves:

| Persona | Goal | Patience for crypto | Typical entry |
|---------|------|---------------------|---------------|
| **Evaluator** | Decide if SPECTER fits their product | Low–medium | The Problem, vs Others |
| **Builder** | Ship an integration | Medium | Quickstart, API |
| **Contributor** | Fix bugs, extend protocol | High | Contributing, Architecture |
| **Researcher** | Audit cryptography | Very high | PQ explainer, ERC proposal |

Write the opening paragraph for the primary persona. Link out for others.

### A.2 Ethereum-specific documentation

**Addresses**

- Distinguish externally owned accounts (EOA) from contract addresses
- Stealth addresses are derived one-time addresses — clarify reuse policy
- Checksum encoding (EIP-55) — mention if displayed in UI

**Transactions**

- Document what appears in calldata vs logs vs state
- Mempool visibility: what is public before inclusion
- Gas implications of announcement size (PQ ciphertext is larger)

**Events and indexing**

- Which events indexers rely on
- What a malicious indexer can infer
- Reorg handling if relevant

**Network selection**

- Always specify chain ID or named network (Sepolia, mainnet)
- Hosted backend default network vs self-hosted configuration

### A.3 Sui-specific documentation

- Object model differences from EVM accounts
- Address format and derivation differences
- Parallel documentation structure: if behavior diverges, use `<Tabs>` for Ethereum vs Sui

### A.4 Smart contract vs SDK vs API boundaries

Use a consistent three-layer model in integration docs:

```
┌─────────────────────────────────────────┐
│  Application (wallet, dApp, bot)        │
├─────────────────────────────────────────┤
│  @specterpq/sdk (WASM, client-side keys)│
├─────────────────────────────────────────┤
│  Hosted REST API (announcements, scan)  │
├─────────────────────────────────────────┤
│  Chain (Ethereum / Sui)                 │
└─────────────────────────────────────────┘
```

Document which layer each operation touches. Example:

> Key generation runs in the SDK (client). Announcement publication goes through the REST API. Funds settle on-chain.

### A.5 Web3 glossary discipline

On first use in a page, link to terminology or define inline:

- RPC, calldata, meta-address, stealth address, viewing/spending key
- Do not assume reader knows ERC-4337, account abstraction, or stealth address history unless the page is about comparisons

### A.6 Common Web3 doc failures

1. **Chain ambiguity** — "Send a transaction" without specifying where
2. **Wallet assumption** — assuming MetaMask when SDK generates keys locally
3. **Testnet drift** — faucet links and contract addresses go stale; prefer env-based config in examples
4. **Gas hand-waving** — PQ payloads cost more; acknowledge it
5. **Finality confusion** — document confirmation expectations for tutorials

---

## Part B: Post-quantum cryptography for technical writers

### B.1 Minimum viable PQ literacy

You must understand these concepts to write accurately:

| Concept | One-line definition |
|---------|---------------------|
| **Shor's algorithm** | Quantum algorithm that breaks RSA, DH, and ECC |
| **Grover's algorithm** | Quantum search; effectively halves symmetric key strength |
| **HNDL** | Harvest ciphertext today, decrypt when quantum computers exist |
| **KEM** | Key Encapsulation Mechanism — sender produces ciphertext + shared secret; recipient recovers secret |
| **ML-KEM** | Module-Lattice KEM (formerly Kyber), NIST FIPS 203 |
| **Security category** | NIST levels 1–5; ML-KEM-768 is category 3 |

You do **not** need to explain LWE math on tutorial pages.

### B.2 ML-KEM in SPECTER — fact sheet

Use these numbers unless source code has changed (verify in repo):

| Artifact | ML-KEM-768 typical size |
|----------|-------------------------|
| Viewing public key | 1,184 bytes |
| Viewing secret key | 2,400 bytes |
| Ciphertext | 1,088 bytes |
| Shared secret | 32 bytes |

Domain separation (document exactly):

- View tag: `SHAKE-256("SPECTER_VIEW_TAG" || shared_secret)`
- Stealth material: `SHAKE-256("SPECTER_STEALTH_PK" || shared_secret)` (+ spending_pk per protocol)

### B.3 What PQ does and does not protect in SPECTER

**In scope for PQ narrative:**

- Confidentiality of the KEM ciphertext in announcements
- Long-term security of viewing-path material against quantum adversaries

**Out of scope (do not imply PQ protection):**

- Hiding payment amounts
- Hiding sender identity
- Hiding that a payment occurred
- IP/metadata privacy of API or RPC usage
- Breaking spend-key cryptography (separate algorithms; document what protects spending)

### B.4 Writing about NIST standards

- Link to [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final) for ML-KEM
- Say "standardized" not "approved for classified" unless you have a specific claim
- Note international alternatives (e.g., FN-DSA, SLH-DSA) only when relevant to roadmap

### B.5 PQ migration and hybrid schemes

When discussing future work:

- **Hybrid classical+PQ** — transitional; document if SPECTER uses or plans it
- **Algorithm agility** — version byte in meta-address format
- **Sunset classical** — honest timeline language

### B.6 PQ comparison table template

| Approach | Quantum-safe viewing path | On-chain size | Maturity |
|----------|---------------------------|---------------|----------|
| Classical ECDH stealth | No | Smaller | Deployed widely |
| SPECTER ML-KEM-768 | Yes (KEM assumptions) | Larger | SPECTER-specific |
| PQ hybrid | Transitional | Largest | Emerging |

---

## Part C: Privacy engineering narrative

### C.1 Unlinkability axes

Document which unlinkability properties apply:

| Property | Definition | SPECTER status (verify in matrix) |
|----------|------------|-----------------------------------|
| Recipient unlinkability | Payments to same recipient not trivially linkable | Core goal |
| Sender anonymity | Sender not identifiable | Out of scope unless stated |
| Amount privacy | Amount hidden | Out of scope unless stated |
| Timing privacy | Payment time uncorrelated | Partial / out of scope |

### C.2 Announcement model

Explain the publish model clearly:

1. Sender pays stealth address on-chain
2. Sender publishes announcement (ciphertext + metadata)
3. Recipient scans announcements, decapsulates, detects match via view tag
4. Recipient derives spend authority

Each step: who sees what, on which layer.

### C.3 View tag deep dive (for writers)

- 1-byte tag derived from shared secret
- Reduces decapsulation attempts per announcement
- False positive rate: 1/255 for random announcements (explain why not 1/256 if that's what protocol uses — match source)
- Not a secrecy mechanism by itself

### C.4 Scanning and scalability

Honest documentation includes:

- Linear scan cost in number of announcements
- Bandwidth to fetch announcements
- Client-side vs server-side scanning tradeoffs
- Future indexing / view-tag servers (roadmap if not shipped)

### C.5 Regulatory and compliance framing

Technical docs are not legal advice. When touching compliance:

- Describe technical properties neutrally
- Avoid "undetectable" — prefer "recipient unlinkability under stated assumptions"
- Link to user's own compliance review

---

## Part D: Security documentation structure

### D.1 Recommended security page outline

```markdown
## Summary
One paragraph threat model.

## Assets
What must be protected (viewing key, spending key, metadata).

## Adversaries
Classical, quantum, malicious indexer, etc.

## Protections
What cryptography and architecture provide.

## Limits
What is explicitly not protected.

## Operational guidance
Key storage, rotation, backup.

## Open questions
Known gaps pointing to roadmap or issues.
```

### D.2 Vulnerability disclosure

Point to security.md or GitHub security policy in product repo — do not invent disclosure process in docs.

### D.3 Audit status language

| Status | Wording |
|--------|---------|
| Not audited | "SPECTER has not undergone a third-party security audit." |
| In progress | "Audit in progress with [firm]; report pending." |
| Completed | Link report; summarize scope and date |

---

## Part E: Competitive and ecosystem context

### E.1 Comparison axes (use consistently)

When writing `specter-vs-others.mdx` or similar:

1. Recipient unlinkability mechanism
2. Post-quantum viewing path
3. Chain support
4. Self-custody / trust assumptions
5. Regulatory exposure (neutral facts only)
6. Maturity and audit status

### E.2 Naming competitors

Use correct product names (Umbra, Railgun, etc.). Link to their docs. Update at least quarterly or when major releases ship.

---

## Part F: Internationalization readiness

Even if the site is English-only today:

- Avoid idioms ("piece of cake")
- Full sentences in captions (translate well)
- No text baked into images when avoidable
- `write-translations` compatibility: avoid splitting sentences across MDX components unnecessarily

---

## Part G: Metrics for documentation quality

Good SPECTER docs achieve:

- **Time-to-first-success** — quickstart completable in <15 minutes
- **Zero broken links** on production build
- **Claim traceability** — matrix links for behavioral docs
- **Honest security** — limitations above the fold on security pages
- **Persona fit** — evaluator never hits Rust crate details without opting in

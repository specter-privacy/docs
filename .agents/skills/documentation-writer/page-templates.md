# Page Templates

Copy-adapt these skeletons. Replace bracketed placeholders. Delete unused sections.

---

## Template: Landing page (`index.mdx`)

```mdx
---
title: "SPECTER"
description: "[One sentence: PQ stealth addresses, chains, primary value]"
slug: /
---

<Frame>
  ![SPECTER cover](/images/specter/specter-cover-full.png)
</Frame>

## [Primary value proposition in plain language]

[2–3 sentences. No jargon. State what recipient unlinkability means in practice.]

<CardGroup cols={2}>
  <Card title="[Path 1]" icon="[tabler-icon]" href="[path]">
    [One line]
  </Card>
  ...
</CardGroup>

---

## Use the docs by goal

<Tabs>
  <Tab title="Evaluating SPECTER">
    ...
  </Tab>
  <Tab title="Builder">
    ...
  </Tab>
  ...
</Tabs>

---

## Protocol in 30 seconds

```mermaid
flowchart LR
  ...
```

[One paragraph tying diagram to PQ viewing path.]
```

---

## Template: Explanation — problem statement

```mdx
---
title: "The Problem"
description: "[Privacy gap + quantum timeline in one sentence]"
---

## [Problem headline]

[Inverted pyramid: what's wrong with status quo for recipients.]

### [Subtopic: e.g. Public payment graphs]

[Concrete scenario. Ethereum-specific example.]

### [Subtopic: Quantum harvest-now-decrypt-later]

[Why long-lived on-chain ciphertext matters. Link to PQ page.]

## What readers should take away

- [Bullet 1]
- [Bullet 2]

## Next steps

- [Link to how SPECTER works]
- [Link to security boundaries]
```

---

## Template: Tutorial — quickstart

```mdx
---
title: "Quickstart"
description: "Complete your first [outcome] with the SPECTER API in under [N] minutes."
---

## What you will build

[One sentence outcome.]

## Prerequisites

- Node.js 20+ (or curl only — specify)
- [API key / testnet ETH / etc.]

<Warning>
[Key handling or testnet-only warning if applicable.]
</Warning>

## Steps

<Steps>
  <Step title="[Verb-led title]">
    [Instructions]

    ```bash
    curl ...
    ```

    **Verify:** [Expected output or field]
  </Step>
  ...
</Steps>

## What happened

[Short recap of protocol steps the user just executed.]

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| ... | ... | ... |

## Next steps

- [Integration guide]
- [API introduction]
```

---

## Template: How-to — integration guide

```mdx
---
title: "Integration Guide"
description: "Choose a SPECTER integration pattern for [app types]."
---

## Choose your pattern

| Pattern | Best for | Keys live | Trust |
|---------|----------|-----------|-------|
| Browser SDK | ... | Client | ... |
| Server-assisted | ... | ... | ... |

## Pattern 1: [Name]

### When to use

### Architecture

```mermaid
flowchart TD
  ...
```

### Implementation steps

1. ...
2. ...

### Security notes

<Warning>...</Warning>

## Pattern 2: [Name]

...

## Shared concerns

- Announcement publishing
- Scanning loop
- Error handling

## Related

- [API reference]
- [Security boundaries]
```

---

## Template: Explanation — protocol flow

```mdx
---
title: "Protocol Flow"
description: "End-to-end SPECTER flow from meta-address setup to payment detection."
---

## Overview

[30-second narrative of all actors and artifacts.]

## Setup phase (recipient)

```mermaid
sequenceDiagram
  ...
```

### Spending vs viewing keys

[Why two keys. One paragraph each.]

## Payment phase (sender)

...

## Detection phase (recipient)

...

## Byte-level summary

| Artifact | Size | Where stored |
|----------|------|--------------|
| ... | ... | ... |

## Limits

[What this flow does not hide.]

## Related

- [Architecture]
- [Post-quantum cryptography]
```

---

## Template: Explanation — post-quantum crypto

```mdx
---
title: "Post-Quantum Cryptography in SPECTER"
description: "How ML-KEM-768 works in SPECTER and what it protects."
---

## ML-KEM-768 in one paragraph

[Encapsulation story without lattice math.]

<Frame caption="[Caption adds info beyond image]">
  <img src={...} alt="[Full flow description for screen readers]" />
</Frame>

## How it fits into SPECTER

```mermaid
flowchart TD
  ...
```

## Parameter choice: why ML-KEM-768

| Parameter | ML-KEM-512 | ML-KEM-768 | ML-KEM-1024 |
|-----------|------------|------------|-------------|
| ... | ... | ... | ... |

## What PQ protects here

## What PQ does not protect

<Note>
Link to deep dive for lattice intuition.
</Note>

## Implementation

[Rust crate, standards links.]

## Related

- [Security boundaries]
- [Post-quantum explainer (deep dive)]
```

---

## Template: Explanation — security boundaries

```mdx
---
title: "Security Boundaries"
description: "Threat model, protections, and explicit limits of SPECTER."
---

## Summary

[Threat model in 3 sentences.]

## Assets

## Adversaries

| Adversary | Capability | Motivation |
|-----------|------------|------------|
| Quantum (future) | ... | HNDL |
| Indexer | ... | ... |

## Protections

## Explicit non-goals

<Warning>
[Most critical user-facing limit.]
</Warning>

## Operational guidance

## Open questions

## Related

- [Verification matrix]
```

---

## Template: API endpoint

```mdx
---
title: "[Resource name]"
description: "[HTTP method] [path] — [one-line purpose]"
---

## [Endpoint name]

[Purpose sentence.]

### `METHOD /path`

**Authentication:** [type]

#### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ... | ... | ... | ... |

#### Response `200`

```json
{
  ...
}
```

#### Errors

| Status | Code | Meaning |
|--------|------|---------|
| 400 | ... | ... |

#### Example

```bash
curl -X POST ...
```

## Related

- [Auth and errors]
- [Integration guide]
```

---

## Template: Deep dive — research

```mdx
---
title: "[Topic]"
description: "[Academic/standards context for SPECTER design choice]"
---

<Note>
This page is for readers who want [lattice math / ERC history / etc.]. For a shorter overview, see [link].
</Note>

## Context

## Technical detail

## Implications for SPECTER

## References

- [NIST, papers, GitHub — primary sources]
```

---

## Template: FAQ entry page

```mdx
---
title: "FAQ"
description: "Frequently asked questions about SPECTER, privacy, and post-quantum cryptography."
---

## General

### [Question as users ask it?]

[Short answer first. Then detail. Link to full page.]

## Privacy

### ...

## Post-quantum

### ...

## Integration

### ...
```

---

## Template: Changelog entry

```markdown
## [YYYY-MM-DD]

### Added
- [Feature] ([#PR](link))

### Changed
- [Breaking or notable change]

### Fixed
- [Bug]

### Security
- [Advisory-level fix]
```

---

## Template: Verification matrix row

When documenting a new behavior in `reference/verification-matrix.mdx`:

| Claim | Source file / endpoint | Verified | Notes |
|-------|------------------------|----------|-------|
| [Exact claim text] | `path/to.rs:L123` or `GET /v1/...` | Yes / Partial / No | [date or version] |

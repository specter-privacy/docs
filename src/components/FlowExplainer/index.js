import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// The three phases of a SPECTER payment. Text stays short on purpose — the
// surrounding page carries the detail; this is the at-a-glance mental model.
const STAGES = [
  {
    id: 'setup',
    label: 'Setup',
    actor: 'Recipient, once',
    image: '/images/specter/How-setup-works.png',
    alt: 'Recipient generates a spending keypair and a viewing keypair, then bundles both public keys into a single meta-address that they publish.',
    summary:
      'You generate two ML-KEM-768 keypairs and publish one meta-address. That is the only address you ever share.',
    points: [
      'Spending key controls funds',
      'Viewing key detects payments',
      'Meta-address is public and reusable',
    ],
  },
  {
    id: 'send',
    label: 'Send',
    actor: 'Sender, per payment',
    image: '/images/specter/How-send-works.png',
    alt: 'Sender encapsulates to the recipient viewing key, derives a fresh one-time stealth address, and publishes an announcement carrying the ciphertext and a one-byte view tag.',
    summary:
      'The sender encapsulates to your viewing key, derives a fresh stealth address, and posts an announcement with a one-byte view tag.',
    points: [
      'A new stealth address per payment',
      'No public link back to the meta-address',
      'View tag makes scanning cheap',
    ],
  },
  {
    id: 'scan',
    label: 'Scan',
    actor: 'Recipient, ongoing',
    image: '/images/specter/How-scan-works.png',
    alt: 'Recipient filters announcements by the one-byte view tag, decapsulates the matches with the viewing secret key, confirms the derived address, and recovers the stealth private key.',
    summary:
      'You filter announcements by view tag, decapsulate the matches, and recover the private key for each payment that is yours.',
    points: [
      'View tag drops ~255 of every 256 misses',
      'Decapsulation confirms a real match',
      'Recovered key spends the funds',
    ],
  },
];

export default function FlowExplainer() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];
  const image = useBaseUrl(stage.image);

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="SPECTER payment phases">
        {STAGES.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={selected ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              onClick={() => setActive(i)}>
              <span className={styles.tabIndex}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.tabText}>
                <span className={styles.tabLabel}>{s.label}</span>
                <span className={styles.tabActor}>{s.actor}</span>
              </span>
              {selected ? (
                <motion.span layoutId="flow-underline" className={styles.underline} />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className={styles.panel}>
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            className={styles.panelInner}
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -14}}
            transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}>
            <figure className={styles.figure}>
              <img src={image} alt={stage.alt} loading="lazy" />
            </figure>
            <div className={styles.detail}>
              <p className={styles.summary}>{stage.summary}</p>
              <ul className={styles.points}>
                {stage.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

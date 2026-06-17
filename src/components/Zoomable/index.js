import React, {useState, useEffect, useCallback} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// A lightweight lightbox wrapper for content that medium-zoom can't handle —
// notably Mermaid diagrams, which render as inline <svg> (the image-zoom plugin
// only attaches to <img>). Click the content to open it fullscreen; click the
// backdrop/content again or press Escape to close. The children render once and
// are simply repositioned/scaled with CSS, so there's no double Mermaid render.
export default function Zoomable({children, label = 'diagram'}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <div className={styles.wrap}>
      {open ? (
        <div className={styles.backdrop} onClick={close} role="presentation" />
      ) : null}

      <div
        className={clsx(styles.inner, open && styles.innerOpen)}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={open ? `Collapse ${label}` : `Expand ${label}`}
        title={open ? 'Click to collapse' : 'Click to expand'}>
        {children}
      </div>

      {open ? (
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Close">
          ×
        </button>
      ) : null}
    </div>
  );
}

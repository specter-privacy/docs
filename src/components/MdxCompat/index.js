import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';
import TabItem from '@theme/TabItem';
import ThemeTabs from '@theme/Tabs';
import styles from './index.module.css';

const TABLER_ICON_PATHS = new Set([
  'access-point',
  'binary',
  'chart-line',
  'circuit-resistor',
  'code',
  'cpu-2',
  'dashboard',
  'flask-2',
  'globe',
  'hash',
  'lock',
  'mail-share',
  'message-circle',
  'network',
  'rocket',
  'route-2',
  'shield-lock',
  'tools',
]);

function iconFallback(icon) {
  return (icon || '?')
    .split(/[-_ ]+/)
    .map((part) => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function renderIcon(icon) {
  if (!icon) return null;

  if (TABLER_ICON_PATHS.has(icon)) {
    return (
      <span className={styles.cardIcon} aria-hidden="true">
        <img src={`/images/icons/tabler/${icon}.svg`} alt="" />
      </span>
    );
  }

  return (
    <span className={styles.cardIcon} aria-hidden="true">
      <span className={styles.iconFallback}>{iconFallback(icon)}</span>
    </span>
  );
}

export function CardGroup({cols = 2, children}) {
  return (
    <div
      className={styles.cardGrid}
      style={{'--card-cols': cols}}>
      {children}
    </div>
  );
}

export function Card({title, icon, href, children}) {
  return (
    <div className={styles.card}>
      {href ? (
        <Link
          className={styles.cardLinkOverlay}
          {...(href.startsWith('/') ? {to: href} : {href})}
          aria-label={title}
        />
      ) : null}
      <div className={styles.cardHeader}>
        {renderIcon(icon)}
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

export function Steps({children}) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <div className={styles.steps}>
      {items.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {stepNumber: index + 1, key: child.key ?? index})
          : child,
      )}
    </div>
  );
}

export function Step({title, icon, children, stepNumber}) {
  return (
    <section className={styles.step}>
      <div className={styles.stepHeader}>
        <span className={styles.stepIndex}>{String(stepNumber).padStart(2, '0')}</span>
        <h3 className={styles.stepTitle}>
          {renderIcon(icon)}
          <span>{title}</span>
        </h3>
      </div>
      <div className={styles.stepBody}>{children}</div>
    </section>
  );
}

export function Frame({caption, children}) {
  return (
    <figure className={styles.frame}>
      {children}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function AccordionGroup({children}) {
  return <div className={styles.accordionGroup}>{children}</div>;
}

export function Accordion({title, children}) {
  return (
    <details className={styles.accordion}>
      <summary>{title}</summary>
      <div className={styles.accordionContent}>{children}</div>
    </details>
  );
}

export function ParamField({body, path, query, type, required, default: defaultValue, children}) {
  const name = body ?? path ?? query;

  return (
    <div className={styles.paramField}>
      <div className={styles.paramHeader}>
        <span className={styles.paramName}>{name}</span>
        {type ? <span className={styles.paramType}>{type}</span> : null}
        {defaultValue !== undefined ? (
          <span className={styles.paramType}>default: {String(defaultValue)}</span>
        ) : null}
        {required ? <span className={styles.paramRequired}>required</span> : null}
      </div>
      <div className={styles.paramContent}>{children}</div>
    </div>
  );
}

export function Callout({icon, color = '#0F766E', children}) {
  return (
    <div className={styles.callout} style={{'--callout-color': color}}>
      <span className={styles.calloutIcon} aria-hidden="true">
        {TABLER_ICON_PATHS.has(icon) ? (
          <img src={`/images/icons/tabler/${icon}.svg`} alt="" />
        ) : (
          <span className={styles.iconFallback}>{iconFallback(icon)}</span>
        )}
      </span>
      <div className={styles.calloutBody}>{children}</div>
    </div>
  );
}

function makeAdmonition(type, title) {
  return function WrappedAdmonition({children}) {
    return (
      <Admonition type={type} title={title}>
        {children}
      </Admonition>
    );
  };
}

export const Info = makeAdmonition('info', 'Info');
export const Note = makeAdmonition('note', 'Note');
export const Warning = makeAdmonition('warning', 'Warning');
export const Tip = makeAdmonition('tip', 'Tip');

function tabValueFromProps(props, index) {
  const source = props.value || props.label || props.title || `tab-${index + 1}`;
  return String(source)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `tab-${index + 1}`;
}

export function Tabs({children, ...props}) {
  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    return React.cloneElement(child, {
      value: child.props.value || tabValueFromProps(child.props, index),
      label: child.props.label || child.props.title || child.props.value,
    });
  });

  return <ThemeTabs {...props}>{items}</ThemeTabs>;
}

export {TabItem as Tab};

export function PlaygroundFrame({
  src = '/playground-embed/',
  title = 'SPECTER SDK Playground',
}) {
  return (
    <div className={styles.playgroundFrame}>
      <iframe
        className={styles.playgroundEmbed}
        src={src}
        title={title}
        loading="lazy"
      />
    </div>
  );
}

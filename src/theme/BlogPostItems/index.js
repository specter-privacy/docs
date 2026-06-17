/**
 * Swizzled (ejected) from @docusaurus/theme-classic.
 *
 * On blog *list* pages we don't want to render each post's full MDX body — we
 * want compact cards (title + description) that link to the post. The original
 * rendered <BlogPostContent /> inline; here we render metadata-only cards and
 * link the whole card to metadata.permalink.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';

export default function BlogPostItems({items}) {
  // Match the theme's date formatting (e.g. "June 18, 2026").
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return (
    <div className={styles.cardGrid}>
      {items.map(({content: BlogPostContent}) => {
        const {metadata} = BlogPostContent;
        const {permalink, title, description, date, readingTime} = metadata;
        return (
          <Link key={permalink} to={permalink} className={styles.card}>
            <article className={styles.cardInner}>
              <h2 className={styles.cardTitle}>{title}</h2>
              {description && (
                <p className={styles.cardDescription}>{description}</p>
              )}
              <div className={styles.cardMeta}>
                {date && (
                  <time dateTime={date}>
                    {dateTimeFormat.format(new Date(date))}
                  </time>
                )}
                {typeof readingTime !== 'undefined' && (
                  <span>{Math.ceil(readingTime)} min read</span>
                )}
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { blogs } from '../data/blogs';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { HyprWorkspace } from './HyprWindow';

export default function Blog() {
  const windows = blogs.map((post) => ({
    id: `blog-${post.id}`,
    title: `~/notes/${post.id}.md`,
    appClass: 'nvim',
    renderTiled: () => (
      <div className="project-tile-body">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="hypr-mini-tag">{post.date}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            {post.readTime}
          </span>
        </div>

        <h3
          style={{
            margin: '0.35rem 0',
            color: 'var(--accent-cyan)',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <span>{post.title}</span>
          <span className="hypr-click-hint">
            <Maximize2 size={11} style={{ marginRight: 4 }} />
            expand
          </span>
        </h3>

        <p
          style={{
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            fontSize: '0.9rem',
            flexGrow: 1,
            margin: 0,
          }}
        >
          {post.summary}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {post.tags.map((tag, i) => (
              <span key={i} className="hypr-mini-tag">
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.id}`}
            onClick={(e) => e.stopPropagation()}
            className="hypr-inspect-btn"
            style={{
              textDecoration: 'none',
              padding: '0.3rem 0.65rem',
              fontSize: '0.72rem',
            }}
          >
            <span>Read Full Article</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    ),
    renderExpanded: () => (
      <div
        className="hypr-expanded-view"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '1rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                color: 'var(--accent-cyan)',
                fontSize: '0.85rem',
                marginBottom: '0.4rem',
              }}
            >
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h2
              style={{
                color: '#fff',
                fontSize: '2rem',
                margin: 0,
              }}
            >
              {post.title}
            </h2>
          </div>

          <Link
            href={`/blog/${post.id}`}
            className="action-btn interactive"
            style={{
              textDecoration: 'none',
              padding: '0.6rem 1.2rem',
              fontSize: '0.88rem',
            }}
          >
            <span>Open Full Article Page</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.45rem',
            marginBottom: '1.5rem',
          }}
        >
          {post.tags.map((tag, idx) => (
            <span key={idx} className="tech-badge" style={{ margin: 0 }}>
              #{tag}
            </span>
          ))}
        </div>

        <p
          style={{
            color: 'var(--text-color)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
          }}
        >
          {post.summary}
        </p>
      </div>
    ),
  }));

  return (
    <HyprWorkspace
      id="blog"
      wsNumber={5}
      wsName="blog"
      title="Latest Writing"
      windows={windows}
    />
  );
}

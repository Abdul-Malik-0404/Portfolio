'use client';

import Link from 'next/link';
import { blogs } from '../data/blogs';
import { ArrowUpRight } from 'lucide-react';
import { HyprWorkspace, HyprWindow } from './HyprWindow';

export default function Blog() {
  return (
    <HyprWorkspace
      id="blog"
      wsNumber={5}
      wsName="blog"
      title="Latest Writing"
      layoutType="dwindle (notes)"
      windowIds={blogs.map((b) => `blog-${b.id}`)}
    >
      <div className="hypr-tile-grid cols-2">
        {blogs.map((post, idx) => (
          <HyprWindow
            key={post.id}
            id={`blog-${post.id}`}
            title={`~/notes/${post.id}.md`}
            appClass="nvim"
            workspace={5}
            dwindleIndex={idx}
            className="interactive"
          >
            <Link
              href={`/blog/${post.id}`}
              className="blog-tile-link"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.85rem',
                }}
              >
                <span className="hypr-mini-tag">{post.date}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {post.readTime}
                </span>
              </div>

              <h3
                style={{
                  marginBottom: '0.85rem',
                  color: 'var(--accent-cyan)',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <span>{post.title}</span>
                <ArrowUpRight size={16} style={{ flexShrink: 0 }} />
              </h3>

              <p
                style={{
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem',
                  lineHeight: '1.6',
                  fontSize: '0.92rem',
                  flexGrow: 1,
                }}
              >
                {post.summary}
              </p>

              <div
                className="tech-stack"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: 0,
                }}
              >
                {post.tags.map((tag, i) => (
                  <span key={i} className="hypr-mini-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          </HyprWindow>
        ))}
      </div>
    </HyprWorkspace>
  );
}

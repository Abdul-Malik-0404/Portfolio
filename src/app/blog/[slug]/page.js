import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { blogs } from '../../../data/blogs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.id === slug);

  if (!post) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-color)' }}>
        <h2>Post not found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <Navbar />

      <main style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <Link href="/#blog" className="back-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>

          <article className="glass-card hypr-border" style={{ padding: '4rem 3rem' }}>
            <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h1 style={{ fontSize: '3rem', color: 'var(--text-color)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                {post.title}
              </h1>
              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tech-badge" style={{ margin: 0 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="blog-content" style={{ color: 'var(--text-color)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 style={{ color: 'var(--accent-cyan)', marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
                  h2: ({node, ...props}) => <h2 style={{ color: 'var(--accent-magenta)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.8rem' }} {...props} />,
                  h3: ({node, ...props}) => <h3 style={{ color: 'var(--text-color)', marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
                  p: ({node, ...props}) => <p style={{ marginBottom: '1.5rem' }} {...props} />,
                  ul: ({node, ...props}) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }} {...props} />,
                  ol: ({node, ...props}) => <ol style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }} {...props} />,
                  li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                  a: ({node, ...props}) => <a style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }} {...props} />,
                  strong: ({node, ...props}) => <strong style={{ color: '#fff' }} {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote style={{ borderLeft: '4px solid var(--accent-magenta)', paddingLeft: '1rem', marginLeft: 0, fontStyle: 'italic', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.02)', padding: '1rem' }} {...props} />
                  ),
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          background: 'rgba(0, 0, 0, 0.5)',
                          padding: '1.5rem',
                          borderRadius: '12px',
                          border: '1px solid var(--glass-border)',
                          marginBottom: '1.5rem',
                          marginTop: '1.5rem'
                        }}
                      />
                    ) : (
                      <code {...props} style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

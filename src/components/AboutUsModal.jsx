import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const REPO_URL = 'https://github.com/JACKLEEOW/web3asg2';

const GitHubMark = () => (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" className="shrink-0 opacity-90" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
);

const SectionLabel = ({ children }) => (
    <p
        className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'var(--muted)' }}
    >
        {children}
    </p>
);

const TechPill = ({ children }) => (
    <span
        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
        style={{
            background: 'var(--surface-hover)',
            border: '1px solid var(--border)',
            color: 'var(--text-h)',
        }}
    >
        {children}
    </span>
);

const AboutUsModal = ({ open, onClose }) => {
    const closeRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const t = window.setTimeout(() => closeRef.current?.focus(), 0);
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.clearTimeout(t);
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 210, background: 'rgba(0, 0, 0, 0.62)' }}
            onClick={onClose}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="about-title"
                className="w-full max-w-lg rounded-2xl p-6 shadow-xl"
                style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.45)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
                            Songsphere
                        </p>
                        <h2 id="about-title" className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-h)' }}>
                            About this project
                        </h2>
                    </div>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                        style={{
                            color: 'var(--muted)',
                            border: '1px solid var(--border)',
                            background: 'var(--surface-hover)',
                        }}
                        aria-label="Close about dialog"
                    >
                        Close
                    </button>
                </div>

                <div className="flex flex-col gap-6 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                    <section>
                        <SectionLabel>What it is</SectionLabel>
                        <p style={{ color: 'var(--text-h)' }}>
                            Songsphere is a music library and discovery app: browse artists and genres, explore individual
                            songs, filter the catalog, and build playlists that stay in sync with your account through a
                            Supabase-backed API.
                        </p>
                    </section>

                    <section>
                        <SectionLabel>Tech stack</SectionLabel>
                        <p className="mb-3" style={{ color: 'var(--muted)' }}>
                            Built with:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <TechPill>React 19</TechPill>
                            <TechPill>Vite 8</TechPill>
                            <TechPill>Tailwind CSS 4</TechPill>
                            <TechPill>React Router 7</TechPill>
                            <TechPill>Supabase</TechPill>
                            <TechPill>Recharts/shadcnUI</TechPill>
                        </div>
                    </section>

                    <section>
                        <SectionLabel>Team</SectionLabel>
                        <p style={{ color: 'var(--text-h)' }}>
                            Built by <strong style={{ color: 'var(--text-h)' }}>Jack</strong> and{' '}
                            <strong style={{ color: 'var(--text-h)' }}>Anthony</strong> for Randy's amazing course.
                        </p>
                    </section>

                    <section>
                        <SectionLabel>Source code</SectionLabel>
                        <a
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-github-link inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150"
                        >
                            <GitHubMark />
                            web3asg2 on GitHub
                        </a>
                    </section>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default AboutUsModal;

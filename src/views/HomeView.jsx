import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TYPEWRITER_TEXT =
    'Welcome to Songsphere, where your world of music springs to life.';

const HomeView = () => {
    const [typed, setTyped] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let timeoutId = null;
        let i = 0;

        const schedule = (delay, fn) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                timeoutId = null;
                if (!cancelled) fn();
            }, delay);
        };

        const step = () => {
            i += 1;
            setTyped(TYPEWRITER_TEXT.slice(0, i));
            if (i >= TYPEWRITER_TEXT.length) {
                setDone(true);
                return;
            }
            const delay = i < 28 ? 42 : 28;
            schedule(delay, step);
        };

        schedule(400, step);

        return () => {
            cancelled = true;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div style={{ background: 'var(--bg)', minHeight: 'calc(100svh - 3.5rem)' }} className="flex flex-col">

            <section
                className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
                style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
            >
                <p className="text-xs font-semibold uppercase tracking-widest mb-6"
                    style={{ color: 'var(--muted)' }}>
                    Songsphere
                </p>

                <h1
                    className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] min-h-32 sm:min-h-40 md:min-h-48 flex items-center justify-center"
                    style={{ color: 'var(--text-h)' }}
                    aria-live="polite"
                >
                    <span>
                        {typed}
                        {!done && (
                            <span
                                className="inline-block w-[3px] h-[0.85em] ml-1 align-[-0.1em] animate-pulse rounded-sm"
                                style={{ background: 'var(--accent)' }}
                                aria-hidden
                            />
                        )}
                    </span>
                </h1>

                <div
                    className={`mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-500 ease-out
                        ${done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                >
                    <Link to="/artists" className="btn btn-primary">Browse artists</Link>
                    <Link to="/genres" className="btn btn-ghost">Genres</Link>
                    <Link to="/playlists" className="btn btn-ghost">Playlists</Link>
                </div>
            </section>
        </div>
    );
};

export default HomeView;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginView = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        navigate('/');
    };

    return (
        <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>

            {/* Left branding panel */}
            <div className="hidden md:flex flex-col justify-between w-1/2 p-12"
                style={{ background: 'var(--surface)' }}>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-h)' }}>
                        ♪ Songsphere
                    </span>
                </div>
                <blockquote>
                    <p className="text-xl font-medium leading-relaxed" style={{ color: 'var(--text)' }}>
                        "Music gives a soul to the universe, wings to the mind, flight to the imagination,
                        and life to everything."
                    </p>
                    <footer className="mt-4 text-sm font-semibold" style={{ color: 'var(--muted)' }}>
                        — Plato
                    </footer>
                </blockquote>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>COMP 4513 · Assignment 2</p>
            </div>

            {/* Right login panel */}
            <div className="flex flex-1 items-center justify-center px-8 py-16">
                <div className="w-full max-w-sm flex flex-col gap-8">

                    {/* Heading */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-h)' }}>
                            Welcome back
                        </h1>
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest"
                                style={{ color: 'var(--muted)' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-md text-sm outline-none"
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-h)',
                                }}
                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest"
                                style={{ color: 'var(--muted)' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-md text-sm outline-none"
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-h)',
                                }}
                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full py-2.5 mt-2 rounded-md text-sm">
                            Sign in
                        </button>
                    </form>

                    <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                        Randy it is definitely not a facade...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginView;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Signup screen component allowing new users to register an account
 * and simulating form submission to navigate to the dashboard.
 * @returns {JSX.Element} The signup screen.
 */
export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || password.length < 6) {
      setError('Fill in your name, email, and a password of at least 6 characters.');
      return;
    }
    setError('');
    // Simulate setting session and navigating to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex items-center justify-center py-12 px-5 relative overflow-hidden">
      <div className="noise-overlay" aria-hidden="true"></div>

      {/* Main Content Card */}
      <div className="w-full max-w-[440px] bg-bg-elevated border border-border rounded-DEFAULT p-8 md:p-10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] z-10">
          <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex items-center gap-2 mb-3.5 lowercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_0_3px_rgba(79,169,162,0.1)]"></span>
            free, no card required
          </p>
          <h1 className="text-[1.8rem] leading-tight font-display mb-2">Create your account</h1>
          <p className="text-text-muted text-[0.92rem] mb-6">Start free — every track, a handful of sessions a month, full debriefs.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.75rem] text-text-muted tracking-[0.05em] uppercase">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-bg-elevated-2 border border-border rounded-sm px-4 py-3 text-[0.95rem] text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.75rem] text-text-muted tracking-[0.05em] uppercase">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-bg-elevated-2 border border-border rounded-sm px-4 py-3 text-[0.95rem] text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.75rem] text-text-muted tracking-[0.05em] uppercase">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-bg-elevated-2 border border-border rounded-sm px-4 py-3 text-[0.95rem] text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-warn text-[0.88rem] leading-snug font-mono p-3 bg-accent-soft border border-accent/20 rounded-sm">
                {error}
              </p>
            )}

            <button type="submit" className="w-full py-3.5 bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold rounded-sm text-[0.98rem] transition-all hover:-translate-y-[1px] cursor-pointer mt-2">
              Create free account
            </button>
          </form>

          <p className="text-[0.88rem] text-text-muted text-center mt-6">
            Already have an account? <Link to="/login" className="text-accent hover:underline">Log in</Link>
          </p>

        </div>
      </div>
  );
}

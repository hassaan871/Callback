import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Signup screen component aligned with the backend validation schemas,
 * including real-time password strength checklists and simulated redirection.
 * @returns {JSX.Element} The signup screen.
 */
export default function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Password criteria checklist states
  const [checks, setChecks] = useState({
    minChar: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // Track password validity in real-time
  useEffect(() => {
    setChecks({
      minChar: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const isPasswordValid = Object.values(checks).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Pre-flight frontend validations
    if (!firstname || !lastname || !username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet the security requirements.');
      return;
    }

    // Simulate redirecting to the email verification landing page
    navigate('/check-email', { state: { email } });
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex items-center justify-center py-12 px-5 relative overflow-hidden">
      <div className="noise-overlay" aria-hidden="true"></div>

      {/* Main Content Card */}
      <div className="w-full max-w-[460px] bg-bg-elevated border border-border rounded-DEFAULT p-8 md:p-10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] z-10">
        <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex items-center gap-2 mb-3.5 lowercase">
          <span className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_0_3px_rgba(79,169,162,0.1)]"></span>
          free, no card required
        </p>
        <h1 className="text-[1.8rem] leading-tight font-display mb-2">Create your account</h1>
        <p className="text-text-muted text-[0.92rem] mb-6">Start free — every track, a handful of sessions a month, full debriefs.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

          {/* Two-column layout for First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.72rem] text-text-muted tracking-[0.05em] uppercase">First Name</span>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="John"
                className="w-full bg-bg-elevated-2 border border-border rounded-sm px-4 py-3 text-[0.95rem] text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.72rem] text-text-muted tracking-[0.05em] uppercase">Last Name</span>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Doe"
                className="w-full bg-bg-elevated-2 border border-border rounded-sm px-4 py-3 text-[0.95rem] text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[0.72rem] text-text-muted tracking-[0.05em] uppercase">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              className="w-full bg-bg-elevated-2 border border-border rounded-sm px-4 py-3 text-[0.95rem] text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[0.72rem] text-text-muted tracking-[0.05em] uppercase">Email</span>
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
            <span className="font-mono text-[0.72rem] text-text-muted tracking-[0.05em] uppercase">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-bg-elevated-2 border border-border rounded-sm px-4 py-3 text-[0.95rem] text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          {/* Password Strength Checklist */}
          {password.length > 0 && (
            <div className="bg-bg-elevated-2 border border-border rounded-sm p-3 flex flex-col gap-1.5">
              <p className="font-mono text-[0.72rem] text-text-muted tracking-[0.05em] uppercase mb-1">Strength Checklist:</p>
              <div className="grid grid-cols-2 gap-y-1 gap-x-3 text-[0.78rem] font-mono">
                <span className={checks.minChar ? "text-teal" : "text-text-muted"}>
                  {checks.minChar ? "✓" : "○"} Min 8 characters
                </span>
                <span className={checks.uppercase ? "text-teal" : "text-text-muted"}>
                  {checks.uppercase ? "✓" : "○"} 1 Uppercase letter
                </span>
                <span className={checks.lowercase ? "text-teal" : "text-text-muted"}>
                  {checks.lowercase ? "✓" : "○"} 1 Lowercase letter
                </span>
                <span className={checks.number ? "text-teal" : "text-text-muted"}>
                  {checks.number ? "✓" : "○"} 1 Number
                </span>
                <span className={checks.specialChar ? "text-teal" : "text-text-muted"}>
                  {checks.specialChar ? "✓" : "○"} 1 Special character
                </span>
              </div>
            </div>
          )}

          {error && (
            <p className="text-warn text-[0.88rem] leading-snug font-mono p-3 bg-accent-soft border border-accent/20 rounded-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold rounded-sm text-[0.98rem] transition-all hover:-translate-y-[1px] cursor-pointer mt-2"
          >
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

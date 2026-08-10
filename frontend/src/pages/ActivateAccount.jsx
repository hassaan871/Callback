import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

/**
 * ActivateAccount screen component (Supporting both Simulation & Real API verification).
 * Reads the token and email search parameters from the URL, presents a premium activation card,
 * and calls the backend activation endpoint (or simulates success if no parameters exist).
 */
export default function ActivateAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email') || 'developer@example.com';
  const token = searchParams.get('token');
  const isSimulationMode = !searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleActivate = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    // --- Simulation Mode Fallback ---
    if (isSimulationMode) {
      setTimeout(() => {
        setIsLoading(false);
        setSuccess('Account activated successfully! Redirecting you to Callback cockpit...');
        setTimeout(() => navigate('/dashboard'), 1500);
      }, 1200);
      return;
    }

    // --- Real API Request ---
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/activate-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Activation failed');
      }

      setSuccess('Account activated successfully! Redirecting you to Callback cockpit...');
      setTimeout(() => navigate('/dashboard'), 1800);
    } catch (err) {
      setError(err.message || 'Something went wrong during account activation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex items-center justify-center py-12 px-5 relative overflow-hidden">
      <div className="noise-overlay" aria-hidden="true"></div>

      <div className="w-full max-w-[460px] bg-bg-elevated border border-border rounded-DEFAULT p-8 md:p-10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] z-10 text-center">
        <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex items-center gap-2 mb-3.5 justify-center lowercase">
          <span className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_0_3px_rgba(79,169,162,0.1)]"></span>
          {isSimulationMode ? 'simulation: click to verify' : 'secure link verification'}
        </p>
        <h1 className="text-[1.8rem] leading-tight font-display mb-2">Account Activation</h1>
        <p className="text-text-muted text-[0.92rem] mb-8">
          Verify your email address (<span className="text-accent font-semibold">{email}</span>) to unlock your technical mock interview sessions.
        </p>

        {error && (
          <p className="text-warn text-[0.88rem] p-3 bg-accent-soft border border-accent/20 rounded-sm font-mono mb-5 text-left">
            {error}
          </p>
        )}

        {success && (
          <p className="text-good text-[0.88rem] p-3 bg-teal-soft border border-teal/20 rounded-sm font-mono mb-5 text-left">
            {success}
          </p>
        )}

        <button
          onClick={handleActivate}
          disabled={isLoading || !!success}
          className="w-full py-3.5 bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold rounded-sm text-[0.98rem] transition-all hover:-translate-y-[1px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Activating account...' : 'Activate Account'}
        </button>
      </div>
    </div>
  );
}

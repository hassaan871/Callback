import { useLocation, Link } from 'react-router-dom';

/**
 * CheckEmail screen component.
 * Tells the user to look in their inbox for the verification link.
 */
export default function CheckEmail() {
  const location = useLocation();
  const email = location.state?.email || 'your registered address';

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex items-center justify-center py-12 px-5 relative overflow-hidden">
      <div className="noise-overlay" aria-hidden="true"></div>

      <div className="w-full max-w-[460px] bg-bg-elevated border border-border rounded-DEFAULT p-8 md:p-10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] z-10 text-center">
        {/* Animated Mail Icon Mockup */}
        <div className="w-16 h-16 bg-accent-soft border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>

        <h1 className="text-[1.8rem] leading-tight font-display mb-4">Check your email</h1>
        <p className="text-text-muted text-[0.95rem] leading-relaxed mb-6">
          We have sent a secure activation link to <strong className="text-accent">{email}</strong>.
        </p>
        <p className="text-text-dim text-[0.85rem] leading-relaxed mb-8">
          Please click the button inside the email to activate your account. You can safely close this browser window.
        </p>

        <div className="border-t border-border-soft pt-6">
          <Link to="/login" className="text-teal hover:underline text-[0.88rem] font-mono">
            &lt; Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

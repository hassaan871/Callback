import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Premium 404 page featuring dynamic gradients, console mock simulation,
 * and micro-interactions optimized for Callback's theme.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-bg text-text flex items-center justify-center overflow-hidden font-sans px-4">
      
      {/* Decorative Grid & Accent Glows */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Radial Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,169,162,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E282D_1px,transparent_1px),linear-gradient(to_bottom,#1E282D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] opacity-20" />
        
        {/* Pulse Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Glassmorphic Panel */}
        <div className="bg-bg-elevated/65 backdrop-blur-xl border border-border/60 rounded-xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-teal/40 group">
          
          {/* Diagnostic Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border-soft border border-border text-xs font-mono text-teal mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-rec-pulse" />
            <span>ERROR_CODE: 404_NOT_FOUND</span>
          </div>

          {/* Glowing 404 Title */}
          <h1 className="font-display text-8xl sm:text-9xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-text to-teal select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105">
            404
          </h1>

          <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-4 mb-3 tracking-wide">
            Lost in cyberspace?
          </h2>

          <p className="text-text-muted text-sm sm:text-base mb-8 leading-relaxed">
            The page you're trying to reach has moved, vanished, or is temporarily out of service. Let's get you back on track.
          </p>

          {/* Interactive Console UI */}
          <div className="bg-bg-elevated-2 rounded-md p-4 mb-8 text-left border border-border-soft font-mono text-xs text-text-muted shadow-inner select-none">
            <div className="flex items-center gap-1.5 mb-2 border-b border-border/40 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-[10px] text-text-dim ml-2">guest-terminal</span>
            </div>
            <div className="space-y-1">
              <p><span className="text-teal">$</span> ping -c 1 request_uri</p>
              <p className="text-warn">PING callback (127.0.0.1) 56(84) bytes of data.</p>
              <p className="text-red-400">--- REQUESTED_URI NOT_FOUND (status 404) ---</p>
              <p className="flex items-center gap-0.5">
                <span className="text-teal">$</span>
                <span className="w-1.5 h-3 bg-teal animate-caret-blink" />
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-accent to-accent/90 hover:from-accent hover:to-accent/95 text-bg font-semibold rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg font-display flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Go to Home
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-bg-elevated-2 text-text border border-border hover:border-text-muted/40 font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border font-display flex items-center justify-center gap-2 cursor-pointer"
            >
              Go to Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotFound;

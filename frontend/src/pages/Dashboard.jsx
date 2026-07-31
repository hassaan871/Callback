import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Dashboard component rendering the unified user cockpit containing stats overview,
 * track selections, session tables, and dynamic Pro feature gating.
 * @returns {JSX.Element} The dashboard screen.
 */
export default function Dashboard() {
  const [plan, setPlan] = useState('free');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleUpgrade = (e) => {
    e.preventDefault();
    setPlan('pro');
    alert('Subscription upgraded! (Simulation Mode: Pro features unlocked).');
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex flex-col md:flex-row relative overflow-hidden">
      <div className="noise-overlay" aria-hidden="true"></div>

      {/* Sidebar */}
      <aside className="w-full md:w-[260px] bg-bg-elevated border-b md:border-b-0 md:border-r border-border-soft flex flex-col p-6 z-10 select-none">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-[1.2rem] mb-8 md:mb-12">
          <span className="font-mono text-accent">&gt;_</span>
          <span>Callback</span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-row md:flex-col gap-2 md:gap-1.5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 mb-6 md:mb-auto">
          <a href="#" className="whitespace-nowrap px-4 py-2.5 rounded-sm bg-accent-soft text-accent font-medium text-[0.92rem] flex items-center gap-3">
            <span className="font-mono opacity-60 text-[0.8rem]">01</span> Overview
          </a>
          <a href="#" className="whitespace-nowrap px-4 py-2.5 rounded-sm text-text-muted hover:text-text hover:bg-bg-elevated-2 font-medium text-[0.92rem] flex items-center gap-3 transition-colors">
            <span className="font-mono opacity-60 text-[0.8rem]">02</span> Interviews
          </a>
          <a href="#" className="whitespace-nowrap px-4 py-2.5 rounded-sm text-text-muted hover:text-text hover:bg-bg-elevated-2 font-medium text-[0.92rem] flex items-center gap-3 transition-colors">
            <span className="font-mono opacity-60 text-[0.8rem]">03</span> Progress
          </a>
          <a href="#" className="whitespace-nowrap px-4 py-2.5 rounded-sm text-text-muted hover:text-text hover:bg-bg-elevated-2 font-medium text-[0.92rem] flex items-center gap-3 transition-colors">
            <span className="font-mono opacity-60 text-[0.8rem]">04</span> Settings
          </a>
        </nav>

        {/* Plan card inside sidebar */}
        <div className="bg-bg-elevated-2 border border-border rounded-sm p-4 mb-5 flex flex-col gap-2">
          <p className="font-mono text-[0.62rem] tracking-[0.06em] text-text-dim uppercase">current plan</p>
          <p className="font-display font-bold text-lg text-accent capitalize">{plan}</p>
          <p className="text-text-muted text-[0.82rem] leading-snug">
            {plan === 'free' ? '3 mock interviews / month · all tracks' : 'Unlimited sessions · all premium analytics unlocked'}
          </p>
          {plan === 'free' && (
            <button
              onClick={handleUpgrade}
              className="w-full mt-2 py-2 bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold text-[0.88rem] rounded-sm transition-all cursor-pointer"
            >
              Upgrade to Pro
            </button>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2.5 border border-border hover:border-warn text-text-muted hover:text-text font-semibold text-[0.88rem] rounded-sm transition-all cursor-pointer"
        >
          Log out
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto max-w-maxw mx-auto w-full z-10">
        
        {/* Topbar */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-soft mb-8">
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.08em] text-teal uppercase mb-1">overview</p>
            <h1 className="text-[1.8rem] leading-none font-display">Welcome back, developer</h1>
          </div>
          <span className="self-start sm:self-center font-mono text-[0.7rem] px-2.5 py-1.5 bg-bg-elevated-2 border border-border text-text-dim rounded-sm select-none">
            dummy data — dashboard will be redesigned
          </span>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-bg-elevated border border-border p-5 rounded-sm flex flex-col gap-1.5">
            <span className="text-text-muted text-[0.88rem]">Sessions this month</span>
            <span className="text-[1.6rem] font-semibold leading-tight">2<span className="text-[1.1rem] text-text-dim ml-0.5">/3</span></span>
          </div>
          <div className="bg-bg-elevated border border-border p-5 rounded-sm flex flex-col gap-1.5">
            <span className="text-text-muted text-[0.88rem]">Structure score</span>
            <span className="text-[1.6rem] font-semibold leading-tight text-good">74<span className="text-[1.1rem] text-good ml-0.5">%</span></span>
          </div>
          <div className="bg-bg-elevated border border-border p-5 rounded-sm flex flex-col gap-1.5">
            <span className="text-text-muted text-[0.88rem]">Filler words / session</span>
            <span className="text-[1.6rem] font-semibold leading-tight text-warn">6</span>
          </div>
          <div className="bg-bg-elevated border border-border p-5 rounded-sm flex flex-col gap-1.5">
            <span className="text-text-muted text-[0.88rem]">Tracks practiced</span>
            <span className="text-[1.6rem] font-semibold leading-tight">3</span>
          </div>
        </section>

        {/* New Session Block */}
        <section className="mb-8">
          <h2 className="text-[1.2rem] font-display font-semibold mb-4">Start a new session</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <button className="border border-border bg-bg-elevated hover:border-accent text-text hover:text-text p-4 rounded-sm font-medium flex items-center gap-2.5 transition-all text-left cursor-pointer">
              <span className="font-mono text-teal text-[0.95rem]">{'{ }'}</span>
              <span>Backend</span>
            </button>
            <button className="border border-border bg-bg-elevated hover:border-accent text-text hover:text-text p-4 rounded-sm font-medium flex items-center gap-2.5 transition-all text-left cursor-pointer">
              <span className="font-mono text-teal text-[0.95rem]">◧</span>
              <span>Frontend</span>
            </button>
            <button className="border border-border bg-bg-elevated hover:border-accent text-text hover:text-text p-4 rounded-sm font-medium flex items-center gap-2.5 transition-all text-left cursor-pointer">
              <span className="font-mono text-teal text-[0.95rem]">⎈</span>
              <span>DevOps / SRE</span>
            </button>
            <button className="border border-border bg-bg-elevated hover:border-accent text-text hover:text-text p-4 rounded-sm font-medium flex items-center gap-2.5 transition-all text-left cursor-pointer">
              <span className="font-mono text-teal text-[0.95rem]">▣</span>
              <span>System Design</span>
            </button>
          </div>
        </section>

        {/* Recent Sessions */}
        <section className="mb-8">
          <h2 className="text-[1.2rem] font-display font-semibold mb-4">Recent sessions</h2>
          <div className="border border-border rounded-sm bg-bg-elevated overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 px-5 py-3.5 border-b border-border font-mono text-[0.72rem] text-text-dim tracking-[0.05em] uppercase bg-bg-elevated-2">
              <span>Session</span>
              <span>Track</span>
              <span>Structure</span>
              <span>Depth</span>
            </div>
            {/* Table Rows */}
            <div className="grid grid-cols-4 px-5 py-4 border-b border-border-soft hover:bg-bg-elevated-2 transition-colors text-[0.92rem]">
              <span className="font-mono">session_042</span>
              <span>Backend → DevOps</span>
              <span className="text-good font-semibold">STAR ✓</span>
              <span className="text-warn font-semibold">shallow</span>
            </div>
            <div className="grid grid-cols-4 px-5 py-4 hover:bg-bg-elevated-2 transition-colors text-[0.92rem]">
              <span className="font-mono">session_041</span>
              <span>System Design</span>
              <span className="text-good font-semibold">STAR ✓</span>
              <span className="text-good font-semibold">solid</span>
            </div>
          </div>
        </section>

        {/* Dynamic Gated Pro Feature Block */}
        <section className="mb-4">
          <h2 className="text-[1.2rem] font-display font-semibold mb-4">Detailed analysis &amp; full progress history</h2>
          
          {plan === 'free' ? (
            /* Locked State Overlay */
            <div className="border border-border bg-bg-elevated rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex flex-col gap-2 max-w-[56ch]">
                <p className="font-display font-bold text-lg text-accent flex items-center gap-2">
                  <span className="font-mono text-sm border border-accent/20 bg-accent-soft px-2 py-0.5 rounded-sm">PRO</span>
                  This is a Pro feature
                </p>
                <p className="text-text-muted text-[0.9rem] leading-relaxed">
                  Full per-answer breakdowns, filler-word trends over time, and exportable debriefs are available on Pro — on every track, no per-track upgrades needed.
                </p>
              </div>
              <button
                onClick={handleUpgrade}
                className="px-6 py-3.5 bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold rounded-sm text-[0.95rem] transition-all hover:-translate-y-[1px] cursor-pointer self-stretch md:self-auto text-center"
              >
                Upgrade to Pro
              </button>
            </div>
          ) : (
            /* Unlocked Pro State */
            <div className="border border-accent bg-accent-soft rounded-sm p-6 md:p-8 flex flex-col gap-5">
              <p className="font-display font-bold text-lg text-accent flex items-center gap-2">
                <span className="font-mono text-sm border border-accent bg-accent text-[#191008] px-2 py-0.5 rounded-sm">UNLOCKED</span>
                Detailed Session Analysis & Trends
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-bg border border-border p-4 rounded-sm">
                  <p className="font-mono text-[0.65rem] text-text-dim tracking-[0.06em] uppercase mb-1">Filler Word Trend</p>
                  <p className="text-[0.9rem] leading-relaxed">Average filler words decreased by **15%** over the last 3 sessions.</p>
                </div>
                <div className="bg-bg border border-border p-4 rounded-sm">
                  <p className="font-mono text-[0.65rem] text-text-dim tracking-[0.06em] uppercase mb-1">STAR Adherence</p>
                  <p className="text-[0.9rem] leading-relaxed">You successfully structured **88%** of your situational answers.</p>
                </div>
                <div className="bg-bg border border-border p-4 rounded-sm">
                  <p className="font-mono text-[0.65rem] text-text-dim tracking-[0.06em] uppercase mb-1">Depth Metrics</p>
                  <p className="text-[0.9rem] leading-relaxed">Technical specificity increased. Identified tags: **Mongoose, Cache, Indexing**.</p>
                </div>
              </div>
              
              <p className="text-text-muted text-[0.82rem] font-mono">Full charts and detailed reports dashboard is active.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

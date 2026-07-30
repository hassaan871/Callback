import { useEffect, useState } from 'react';

export default function Hero() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-8 pb-[72px] md:pt-[88px] md:pb-[110px]">
      <div className="max-w-maxw mx-auto lg:px-8 px-5 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div className="flex flex-col items-start text-left">
          <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex items-center gap-2 mb-3.5 lowercase">
            <span className="w-1.5 h-1.5 rounded-full bg-good shadow-[0_0_0_3px_rgba(79,169,162,0.1)]"></span>
            mock interviews, run by ai
          </p>
          <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.6rem] leading-[1.05] tracking-tight mb-[22px]">
            Practice the<br />interview<br /><span className="text-accent italic font-normal">before</span> it's real.
          </h1>
          <p className="text-text-muted text-[1.05rem] max-w-[46ch] mb-[30px]">
            An AI interviewer that asks like your panel would, pushes back on vague answers, and hands you a debrief you can actually act on — built for engineers switching roles, and for anyone about to sit across from a hiring panel.
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <a href="#start" className="px-6 py-3.5 text-[0.98rem] rounded-sm bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold transition-all duration-150 hover:-translate-y-[1px]">Start a mock interview</a>
            <a href="#sample" className="px-5 py-3.5 text-[0.92rem] text-text-muted hover:text-text font-medium transition-colors">Watch a sample session <span aria-hidden="true" className="ml-1">↓</span></a>
          </div>
          <p className="font-mono text-[0.8rem] text-text-dim">No signup for your first session · 15 minutes · real follow-up questions</p>
        </div>

        <div className="bg-bg-elevated border border-border rounded-DEFAULT overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]" id="sample">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft bg-bg-elevated-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8613D] animate-rec-pulse"></span>
              <span className="font-mono text-[0.76rem] text-text-muted">session_042 · backend → devops</span>
            </div>
            <span className="font-mono text-[0.76rem] text-text-muted">{time}</span>
          </div>

          <div className="p-5 pb-2 flex flex-col gap-[18px]">
            <div className="grid grid-cols-[40px_40px_1fr] gap-2.5 items-baseline">
              <span className="font-mono text-[0.72rem] text-text-dim">00:00</span>
              <span className="font-mono text-[0.68rem] font-semibold text-teal tracking-[0.04em]">AI</span>
              <p className="text-[0.92rem] text-text">Walk me through a production incident you were paged for. What did you own, and what would you change now?</p>
            </div>
            <div className="grid grid-cols-[40px_40px_1fr] gap-2.5 items-baseline">
              <span className="font-mono text-[0.72rem] text-text-dim">00:14</span>
              <span className="font-mono text-[0.68rem] font-semibold text-accent tracking-[0.04em]">YOU</span>
              <p className="text-[0.92rem] text-text">We had a cascading timeout across three services after a config push. I rolled back the deploy, then—</p>
            </div>
            <div className="grid grid-cols-[40px_40px_1fr] gap-2.5 items-baseline">
              <span className="font-mono text-[0.72rem] text-text-dim">00:42</span>
              <span className="font-mono text-[0.68rem] font-semibold text-teal tracking-[0.04em]">AI</span>
              <p className="text-[0.92rem] text-text">Before the rollback — how did you confirm the config push was the cause, and not the traffic spike underneath it?</p>
            </div>
            <div className="grid grid-cols-[40px_40px_1fr] gap-2.5 items-baseline">
              <span className="font-mono text-[0.72rem] text-text-dim">01:03</span>
              <span className="font-mono text-[0.68rem] font-semibold text-accent tracking-[0.04em]">YOU</span>
              <p className="text-[0.92rem] text-text-dim"><span className="animate-caret-blink text-accent font-bold">▍</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border-soft mt-2 bg-bg-elevated-2">
            <div className="p-3.5 border-r border-border-soft border-b sm:border-b-0 flex flex-col gap-1">
              <span className="font-mono text-[0.65rem] text-text-dim tracking-[0.06em] uppercase">pace</span>
              <span className="font-mono text-base font-semibold">138<small className="text-[0.65rem] font-normal text-text-dim ml-0.5">wpm</small></span>
            </div>
            <div className="p-3.5 sm:border-r border-border-soft border-b sm:border-b-0 flex flex-col gap-1">
              <span className="font-mono text-[0.65rem] text-text-dim tracking-[0.06em] uppercase">fillers</span>
              <span className="font-mono text-base font-semibold">4</span>
            </div>
            <div className="p-3.5 border-r border-border-soft flex flex-col gap-1">
              <span className="font-mono text-[0.65rem] text-text-dim tracking-[0.06em] uppercase">structure</span>
              <span className="font-mono text-base font-semibold text-good">STAR ✓</span>
            </div>
            <div className="p-3.5 flex flex-col gap-1">
              <span className="font-mono text-[0.65rem] text-text-dim tracking-[0.06em] uppercase">depth</span>
              <span className="font-mono text-base font-semibold text-warn">shallow</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

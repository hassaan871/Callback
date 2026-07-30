export default function Progress() {
  return (
    <section className="py-16 md:py-24 bg-bg-elevated border-y border-border-soft" id="progress">
      <div className="max-w-maxw mx-auto lg:px-8 px-5 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col items-start text-left">
          <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex items-center gap-2 mb-3.5 lowercase">
            see yourself improve
          </p>
          <h2 className="text-[1.7rem] md:text-[2.3rem] max-w-[20ch] leading-[1.15] mb-5">
            The debrief matters less than the trend line.
          </h2>
          <p className="text-text-muted text-[1.05rem] max-w-[46ch] mb-[30px]">
            One good session tells you what to fix. Ten sessions tell you whether you fixed it. Callback keeps every transcript and every score, so "I think I got better" turns into a number.
          </p>
          <ul className="flex flex-col gap-3 mt-[22px]">
            <li className="flex items-center gap-2.5 text-text-muted text-[0.95rem]">
              <span className="text-good font-mono">✓</span>
              <span>Structure score per answer (STAR / not)</span>
            </li>
            <li className="flex items-center gap-2.5 text-text-muted text-[0.95rem]">
              <span className="text-good font-mono">✓</span>
              <span>Filler-word count, trending down</span>
            </li>
            <li className="flex items-center gap-2.5 text-text-muted text-[0.95rem]">
              <span className="text-good font-mono">✓</span>
              <span>Depth flag on answers that stayed surface-level</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="bg-bg border border-border rounded-DEFAULT p-6">
            <div className="flex justify-between items-baseline mb-[18px]">
              <span className="font-mono text-[0.76rem] text-text-muted">structure score · last 9 sessions</span>
              <span className="font-mono text-good font-semibold">+31%</span>
            </div>
            
            <svg viewBox="0 0 320 140" className="w-full h-[130px]" preserveAspectRatio="none">
              <polyline 
                className="fill-accent opacity-[0.08] stroke-none" 
                points="0,140 0,108 40,112 80,96 120,100 160,78 200,66 240,54 280,40 320,26 320,140" 
              />
              <polyline 
                className="fill-none stroke-accent stroke-[2.5] stroke-linecap-round stroke-linejoin-round" 
                points="0,108 40,112 80,96 120,100 160,78 200,66 240,54 280,40 320,26" 
              />
              <circle className="fill-accent" cx="320" cy="26" r="4" />
            </svg>

            <div className="flex justify-between font-mono text-[0.7rem] text-text-dim pt-1.5 border-t border-border-soft">
              <span>session 1</span>
              <span>session 9</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

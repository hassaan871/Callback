export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24" id="how">
      <div className="max-w-maxw mx-auto lg:px-8 px-5">
        <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex items-center gap-2 mb-3.5 lowercase">
          how a session runs
        </p>
        <h2 className="text-[1.7rem] md:text-[2.3rem] max-w-[20ch] leading-[1.15] mb-12">
          Four steps. Every session.
        </h2>

        <ol className="flex flex-col">
          <li className="grid grid-cols-[44px_1fr] sm:grid-cols-[72px_1fr] gap-6 py-7 border-t border-border-soft">
            <span className="font-mono text-accent text-[1.4rem] font-semibold">01</span>
            <div>
              <h3 className="text-[1.15rem] mb-1.5 font-semibold">Pick your track</h3>
              <p className="text-text-muted text-[0.95rem] max-w-[56ch]">
                Role, level, and how hard you want the panel to push — from "warm up" to "onsite loop."
              </p>
            </div>
          </li>

          <li className="grid grid-cols-[44px_1fr] sm:grid-cols-[72px_1fr] gap-6 py-7 border-t border-border-soft">
            <span className="font-mono text-accent text-[1.4rem] font-semibold">02</span>
            <div>
              <h3 className="text-[1.15rem] mb-1.5 font-semibold">Run the interview</h3>
              <p className="text-text-muted text-[0.95rem] max-w-[56ch]">
                Gemini asks, listens, and follows up on what you actually said — not a fixed script.
              </p>
            </div>
          </li>

          <li className="grid grid-cols-[44px_1fr] sm:grid-cols-[72px_1fr] gap-6 py-7 border-t border-border-soft">
            <span className="font-mono text-accent text-[1.4rem] font-semibold">03</span>
            <div>
              <h3 className="text-[1.15rem] mb-1.5 font-semibold">Get the debrief</h3>
              <p className="text-text-muted text-[0.95rem] max-w-[56ch]">
                Full transcript, pace and filler-word count, structure check, and the one question you dodged.
              </p>
            </div>
          </li>

          <li className="grid grid-cols-[44px_1fr] sm:grid-cols-[72px_1fr] gap-6 py-7 border-t border-b border-border-soft">
            <span className="font-mono text-accent text-[1.4rem] font-semibold">04</span>
            <div>
              <h3 className="text-[1.15rem] mb-1.5 font-semibold">Track the trend</h3>
              <p className="text-text-muted text-[0.95rem] max-w-[56ch]">
                Every session adds a point. Watch structure and depth move before the real interview does.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

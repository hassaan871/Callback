export default function Pricing() {
  return (
    <section className="py-16 md:py-24" id="pricing">
      <div className="max-w-maxw mx-auto lg:px-8 px-5 text-center">
        <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex justify-center items-center gap-2 mb-3.5 lowercase">
          pricing
        </p>
        <h2 className="text-[1.7rem] md:text-[2.3rem] max-w-[20ch] leading-[1.15] mb-12 mx-auto">
          Start free. Pay when it's paying off.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[720px] mx-auto text-left">
          {/* Free Card */}
          <div className="relative bg-bg-elevated border border-border-soft rounded-DEFAULT p-8">
            <h3 className="text-[1.1rem] text-text-muted mb-2 font-semibold">Free</h3>
            <p className="font-display text-[2.4rem] mb-1.5 font-semibold text-text">$0</p>
            <p className="text-text-muted text-[0.9rem] mb-5">For your first real sessions.</p>
            
            <ul className="flex flex-col gap-2.5 mb-[26px]">
              <li className="text-[0.9rem] text-text pl-[18px] relative before:content-['—'] before:absolute before:left-0 before:text-text-dim">
                3 mock interviews / month
              </li>
              <li className="text-[0.9rem] text-text pl-[18px] relative before:content-['—'] before:absolute before:left-0 before:text-text-dim">
                Full transcript + debrief
              </li>
              <li className="text-[0.9rem] text-text pl-[18px] relative before:content-['—'] before:absolute before:left-0 before:text-text-dim">
                1 active track
              </li>
            </ul>
            
            <a href="#start" className="inline-flex w-full justify-center px-5 py-2.5 rounded-sm border border-border text-text hover:border-teal hover:text-teal font-semibold text-[0.92rem] transition-all duration-150 hover:-translate-y-[1px]">
              Start free
            </a>
          </div>

          {/* Pro Card */}
          <div className="relative bg-gradient-to-b from-bg-elevated to-bg-elevated-2 border border-accent rounded-DEFAULT p-8">
            <span className="absolute top-[-13px] left-[28px] bg-accent text-[#191008] font-mono text-[0.68rem] px-2.5 py-0.5 rounded-[20px] font-semibold">
              most switch to this
            </span>
            <h3 className="text-[1.1rem] text-text-muted mb-2 font-semibold">Pro</h3>
            <p className="font-display text-[2.4rem] mb-1.5 font-semibold text-text">9/mo</p>
            <p className="text-text-muted text-[0.9rem] mb-5">For anyone actively interviewing.</p>
            
            <ul className="flex flex-col gap-2.5 mb-[26px]">
              <li className="text-[0.9rem] text-text pl-[18px] relative before:content-['—'] before:absolute before:left-0 before:text-text-dim">
                Unlimited mock interviews
              </li>
              <li className="text-[0.9rem] text-text pl-[18px] relative before:content-['—'] before:absolute before:left-0 before:text-text-dim">
                All tracks, adjustable difficulty
              </li>
              <li className="text-[0.9rem] text-text pl-[18px] relative before:content-['—'] before:absolute before:left-0 before:text-text-dim">
                Full progress history &amp; trends
              </li>
              <li className="text-[0.9rem] text-text pl-[18px] relative before:content-['—'] before:absolute before:left-0 before:text-text-dim">
                Export debriefs as PDF
              </li>
            </ul>
            
            <a href="#start" className="inline-flex w-full justify-center px-5 py-2.5 rounded-sm bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold text-[0.92rem] transition-all duration-150 hover:-translate-y-[1px]">
              Go Pro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

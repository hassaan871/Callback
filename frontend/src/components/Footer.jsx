export default function Footer() {
  return (
    <>
      {/* FINAL CTA */}
      <section className="py-[110px] text-center" id="start">
        <div className="max-w-maxw mx-auto lg:px-8 px-5 flex flex-col items-center gap-8">
          <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.4rem] leading-[1.25] font-semibold font-display">
            Your next interview won't be the first time<br />you've answered that question.
          </h2>
          <a href="#" className="px-6 py-3.5 text-[0.98rem] rounded-sm bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold transition-all duration-150 hover:-translate-y-[1px]">
            Start a mock interview
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border-soft pt-[56px] pb-6 bg-bg">
        <div className="max-w-maxw mx-auto lg:px-8 px-5 flex flex-wrap justify-between gap-10">
          <div className="flex flex-col gap-2 max-w-[32ch] text-left">
            <div className="flex items-center gap-2 font-display font-semibold text-[1.1rem]">
              <span className="font-mono text-accent">&gt;_</span>
              <span>Callback</span>
            </div>
            <p className="text-text-dim text-[0.85rem]">
              Mock interviews for people about to get a real one.
            </p>
          </div>

          <div className="flex gap-16 text-left">
            <div>
              <h4 className="text-[0.78rem] text-text-dim uppercase tracking-[0.06em] mb-3.5 font-semibold">
                Product
              </h4>
              <a href="#tracks" className="block text-text-muted hover:text-text text-[0.9rem] mb-2.5 transition-colors">
                Tracks
              </a>
              <a href="#how" className="block text-text-muted hover:text-text text-[0.9rem] mb-2.5 transition-colors">
                How it works
              </a>
              <a href="#progress" className="block text-text-muted hover:text-text text-[0.9rem] mb-2.5 transition-colors">
                Progress
              </a>
            </div>
            <div>
              <h4 className="text-[0.78rem] text-text-dim uppercase tracking-[0.06em] mb-3.5 font-semibold">
                Company
              </h4>
              <a href="#pricing" className="block text-text-muted hover:text-text text-[0.9rem] mb-2.5 transition-colors">
                Pricing
              </a>
              <a href="#" className="block text-text-muted hover:text-text text-[0.9rem] mb-2.5 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-maxw mx-auto mt-10 pt-5 lg:mx-auto lg:px-8 px-5 border-t border-border-soft flex flex-col sm:flex-row justify-between gap-1.5 font-mono text-[0.75rem] text-text-dim">
          <span>© 2026 Callback</span>
          <span>built for engineers between roles</span>
        </div>
      </footer>
    </>
  );
}

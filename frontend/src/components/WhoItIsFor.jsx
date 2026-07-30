export default function WhoItIsFor() {
  return (
    <section className="pt-0 pb-16 md:py-24" id="who">
      <div className="max-w-maxw mx-auto lg:px-8 px-5">
        <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex items-center gap-2 mb-3.5 lowercase">
          who's on the other side of the call
        </p>
        <h2 className="text-[1.7rem] md:text-[2.3rem] max-w-[20ch] leading-[1.15] mb-12">
          Three kinds of nervous, one panel.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-bg-elevated border border-border-soft rounded-DEFAULT p-7 transition-all duration-200 hover:border-teal hover:-translate-y-[3px]">
            <span className="inline-block font-mono text-[0.68rem] text-accent bg-accent-soft px-2 py-0.5 rounded-[4px] mb-3.5">
              early career
            </span>
            <h3 className="text-[1.15rem] mb-2.5 font-semibold">Students &amp; new grads</h3>
            <p className="text-text-muted text-[0.94rem]">
              Preparing for your first real technical screen — behavioral, coding, and "tell me about yourself" that doesn't ramble for four minutes.
            </p>
          </article>

          <article className="bg-bg-elevated border border-border-soft rounded-DEFAULT p-7 transition-all duration-200 hover:border-teal hover:-translate-y-[3px]">
            <span className="inline-block font-mono text-[0.68rem] text-accent bg-accent-soft px-2 py-0.5 rounded-[4px] mb-3.5">
              role switch
            </span>
            <h3 className="text-[1.15rem] mb-2.5 font-semibold">
              Devs moving into DevOps <span className="font-mono text-[0.95rem] text-text-dim">(and back)</span>
            </h3>
            <p className="text-text-muted text-[0.94rem]">
              You know the systems, not necessarily the vocabulary the other side of the interview is listening for. Callback interviews in the dialect of the role you're aiming at.
            </p>
          </article>

          <article className="bg-bg-elevated border border-border-soft rounded-DEFAULT p-7 transition-all duration-200 hover:border-teal hover:-translate-y-[3px]">
            <span className="inline-block font-mono text-[0.68rem] text-accent bg-accent-soft px-2 py-0.5 rounded-[4px] mb-3.5">
              leveling up
            </span>
            <h3 className="text-[1.15rem] mb-2.5 font-semibold">Working engineers</h3>
            <p className="text-text-muted text-[0.94rem]">
              Sharpening system design, incident retros, and the answers that get thinner the more senior the role gets.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

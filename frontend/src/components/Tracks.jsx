import { useSelector, useDispatch } from 'react-redux';
import { setActiveTrack } from '../store/uiSlice';

const TRACKS_LIST = [
  { name: 'Backend', glyph: '{ }' },
  { name: 'Frontend', glyph: '◧' },
  { name: 'DevOps / SRE', glyph: '⎈' },
  { name: 'Data Engineering', glyph: '▤' },
  { name: 'ML / AI', glyph: '◎' },
  { name: 'System Design', glyph: '▣' },
  { name: 'Behavioral', glyph: '✦' },
];

export default function Tracks() {
  const activeTrack = useSelector((state) => state.ui.activeTrack);
  const dispatch = useDispatch();

  return (
    <section className="py-16 md:py-24 bg-bg-elevated border-y border-border-soft" id="tracks">
      <div className="max-w-maxw mx-auto lg:px-8 px-5">
        <p className="font-mono text-[0.78rem] tracking-[0.08em] text-teal flex items-center gap-2 mb-3.5 lowercase">
          pick a track
        </p>
        <h2 className="text-[1.7rem] md:text-[2.3rem] max-w-[20ch] leading-[1.15] mb-12">
          The interviewer adapts to the role, not the other way around.
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {TRACKS_LIST.map((track) => (
            <button
              key={track.name}
              onClick={() => dispatch(setActiveTrack(track.name))}
              className={`
                border rounded-sm p-[18px_16px] font-medium flex items-center gap-2.5 transition-all text-left cursor-pointer
                ${activeTrack === track.name 
                  ? 'border-accent bg-accent-soft text-text' 
                  : 'border-border bg-bg hover:border-accent text-text-muted hover:text-text'
                }
              `}
            >
              <span className="font-mono text-teal text-[0.95rem]">{track.glyph}</span>
              <span>{track.name}</span>
            </button>
          ))}

          <div className="border border-border bg-bg p-[18px_16px] rounded-sm flex flex-col items-start gap-[2px] text-text-dim text-[0.9rem] font-medium select-none">
            <span>+ more</span>
            <span className="font-mono text-[0.7rem] lowercase">added weekly</span>
          </div>
        </div>
      </div>
    </section>
  );
}

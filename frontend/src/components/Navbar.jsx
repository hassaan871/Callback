import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../store/uiSlice';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isMenuOpen = useSelector((state) => state.ui.isMenuOpen);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-[100] bg-bg/82 backdrop-blur-[10px] border-b border-border-soft">
      <div className="max-w-maxw mx-auto px-8 py-4 flex items-center justify-between gap-6 md:px-8 px-5">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-[1.1rem]">
          <span className="font-mono text-accent">&gt;_</span>
          <span>Callback</span>
        </Link>

        {/* Desktop Links / Mobile Links Overlay */}
        <nav 
          id="navLinks" 
          className={`
            md:flex md:static md:flex-row md:gap-7 md:p-0 md:bg-transparent md:border-0 md:w-auto
            text-[0.92rem] text-text-muted
            ${isMenuOpen 
              ? 'flex absolute top-full left-0 right-0 bg-bg-elevated border-b border-border-soft flex-col gap-0 px-5 pb-4 pt-2' 
              : 'hidden'
            }
          `}
        >
          <a href="#tracks" className="hover:text-text py-3 md:py-0 border-b border-border-soft md:border-0">Tracks</a>
          <a href="#how" className="hover:text-text py-3 md:py-0 border-b border-border-soft md:border-0">How it works</a>
          <a href="#progress" className="hover:text-text py-3 md:py-0 border-b border-border-soft md:border-0">Progress</a>
          <a href="#pricing" className="hover:text-text py-3 md:py-0">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="btn btn-ghost hidden sm:inline-flex px-5 py-2.5 rounded-sm border border-border text-text hover:border-teal hover:text-teal font-semibold text-[0.92rem] transition-all duration-150 hover:-translate-y-[1px]">Log in</Link>
          <a href="#start" className="btn btn-primary px-5 py-2.5 rounded-sm bg-accent text-[#191008] hover:bg-[#f0af52] font-semibold text-[0.92rem] transition-all duration-150 hover:-translate-y-[1px]">Start practicing</a>
          
          <button 
            id="navToggle"
            onClick={() => dispatch(toggleMenu())}
            className="md:hidden flex flex-col gap-1 p-1.5 bg-none border-none cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="w-5 h-[2px] bg-text"></span>
            <span className="w-5 h-[2px] bg-text"></span>
            <span className="w-5 h-[2px] bg-text"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhoItIsFor from '../components/WhoItIsFor';
import Tracks from '../components/Tracks';
import HowItWorks from '../components/HowItWorks';
import Progress from '../components/Progress';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

/**
 * LandingPage component containing the complete pre-existing promotional sections,
 * header, and footer. The content is preserved exactly without modifications.
 * @returns {JSX.Element} The landing page view.
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <div className="noise-overlay" aria-hidden="true"></div>
      <Navbar />
      <main id="top">
        <Hero />
        <WhoItIsFor />
        <Tracks />
        <HowItWorks />
        <Progress />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

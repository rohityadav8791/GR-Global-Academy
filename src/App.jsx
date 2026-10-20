import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WelcomeSection from './components/WelcomeSection';
import PrincipalMessage from './components/PrincipalMessage';
import FeatureCards from './components/FeatureCards';
import AcademicsSection from './components/AcademicsSection';
import FacilitiesSection from './components/FacilitiesSection';
import StatisticsSection from './components/StatisticsSection';
import ActivitiesSection from './components/ActivitiesSection';
import GallerySection from './components/GallerySection';
import AdmissionsSection from './components/AdmissionsSection';
import EventsSection from './components/EventsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WelcomeSection />
        <PrincipalMessage />
        <FeatureCards />
        <AcademicsSection />
        <FacilitiesSection />
        <StatisticsSection />
        <ActivitiesSection />
        <GallerySection />
        <AdmissionsSection />
        <EventsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}

export default App;

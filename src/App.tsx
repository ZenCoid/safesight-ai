import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Technology from './components/Technology'
import DetectionSection from './components/DetectionSection'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Privacy from './components/Privacy'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <HowItWorks />
        <Technology />
        <DetectionSection />
        <Pricing />
        <FAQ />
        <Privacy />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

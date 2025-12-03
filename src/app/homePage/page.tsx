import React from 'react'
import HeroSection from './components/heroSection'
import ProductsSection from './components/productsSection'
import AboutSection from './components/aboutUs'
import OurValues from './components/ourValues'
import PhilosophySection from './components/philosophie'
import ContactSection from './components/contact'
import MaterialsTechnologySection from './components/material'
import Outsoles from './components/outsoles'
function Home() {
  return (
    <div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <MaterialsTechnologySection />
      <OurValues />
      <Outsoles />
      <PhilosophySection />
      <ContactSection />
    </div>
  )
}

export default Home;

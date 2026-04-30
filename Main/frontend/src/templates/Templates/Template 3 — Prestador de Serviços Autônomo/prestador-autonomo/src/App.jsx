import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyHireMe from './components/WhyHireMe';
import Portfolio from './components/Portfolio';
import ServiceArea from './components/ServiceArea';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <WhyHireMe />
      <Portfolio />
      <ServiceArea />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
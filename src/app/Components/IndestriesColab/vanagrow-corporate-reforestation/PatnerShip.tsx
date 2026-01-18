
import React, { useState } from 'react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Partners from './components/Partners';
import Benefits from './components/Benefits';
import Tiers from './components/Tiers';
import ApplicationForm from './components/ApplicationForm';

const PatnerShip: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main className="max-w-[1280px] mx-auto overflow-hidden">
        <Hero />
        <Stats />
        <Partners />
        <Benefits />
        <Tiers />
        <ApplicationForm />
      </main>

    </div>
  );
};

export default PatnerShip;

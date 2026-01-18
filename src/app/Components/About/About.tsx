
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ProblemSolution from './components/ProblemSolution';
import Timeline from './components/Timeline';
import Team from './components/Team';
import Partners from './components/Partners';
import CTA from './components/CTA';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <Hero />
        <Stats />
        <ProblemSolution />
        <Timeline />
        <Team />
        <Partners />
        <CTA />
      </main>

    </div>
  );
};

export default About;

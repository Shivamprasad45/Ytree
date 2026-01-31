
import React from 'react';
import MaxWidthRappers from '@/components/MaxWidthRapper';

const timelineEvents = [
  {
    year: '2018',
    title: 'The Seedling Idea',
    description: 'Founded in a small cabin in Oregon, VanaGrow started as a simple browser extension to plant trees while shopping.',
    icon: 'lightbulb'
  },
  {
    year: '2020',
    title: 'Global Community Launch',
    description: 'Expanded to 45 countries, allowing users worldwide to contribute to reforestation projects in the Amazon and Sub-Saharan Africa.',
    icon: 'public'
  },
  {
    year: '2022',
    title: '1 Million Trees Milestones',
    description: 'Celebrated our first million trees planted. Introduced real-time satellite monitoring for all our reforestation sites.',
    icon: 'forest'
  },
  {
    year: '2024',
    title: 'NGO Partnership Network',
    description: 'Formed official alliances with 15 leading environmental NGOs to scale our impact across all continents.',
    icon: 'handshake'
  }
];

const Timeline: React.FC = () => {
  return (
    <section className="py-24 bg-card">
      <MaxWidthRappers>
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-center text-4xl font-black mb-16 text-foreground">Our Growth Journey</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-border"></div>
            <div className="space-y-12">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative pl-16">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white z-10 border-4 border-background">
                    <span className="material-symbols-outlined text-sm">{event.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{event.title}</h4>
                  <span className="text-primary font-bold text-sm block mb-2 uppercase">{event.year}</span>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthRappers>
    </section>
  );
};

export default Timeline;

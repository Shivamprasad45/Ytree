
import React from 'react';
import Image from 'next/image';

const Testimonials: React.FC = () => {
const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Member since 2023",
    content:
      "I honestly didn’t expect this level of transparency. Being able to see the exact location of the tree planted in my name made the experience feel very real. It’s not just a purchase anymore, it feels like participation.",
    imageUrl:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Verified Planter",
    content:
      "What I like most about Vanagrow is that they actually show proof. From coordinates to regular updates, everything feels trustworthy. I’ve already gifted a tree to my parents, and they loved the idea.",
    imageUrl:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohit Verma",
    role: "Impact Contributor",
    content:
      "I’ve tried supporting sustainable brands before, but this is the first time I felt connected to the impact. Seeing my planted trees on the map gives a strange sense of pride. Simple concept, executed well.",
    imageUrl:
      "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-deep-forest dark:text-white text-3xl sm:text-4xl md:text-5xl font-black mb-4">What Our Community Says</h2>
          <p className="text-sage dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">Real stories from the people making the reforestation of our planet possible every day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`bg-background-light dark:bg-gray-800 p-6 sm:p-10 rounded-[2.5rem] border border-sage/10 dark:border-gray-700 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 ${idx === 1 ? 'md:-translate-y-6' : ''}`}
            >
              <div className="flex gap-1 text-primary mb-6" role="img" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[20px] fill-current">star</span>
                ))}
              </div>
              <p className="text-deep-forest dark:text-gray-200 text-base sm:text-lg font-medium italic mb-8 sm:mb-10 leading-relaxed">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative size-14 rounded-full border-2 border-primary/20 overflow-hidden flex-shrink-0">
                  <Image
                    src={"https://lh3.googleusercontent.com/aida-public/AB6AXuB1ZkmDLyLr53zfPTwOWQ-Hitms6qJtVP3NOujdpE94NAXFDIqhU9GTABRCgfnLPGdOc32LZDIlLs-UbkBu4Jgst5qcFu945J23sPUCKmbZ0dcLWR9C92gojBvPVMAWU4BmGCInvkmwEQnMe87QNLOWI3ZKfQ0Odf3km37buGBGbD7UiZkPumNFejPq7TEsPYt1CyEUE8nIo-yE2yLU7RusTnk0sQC9B4KbKeYqBrnUM1SHG2M89ibpg0gQeYBJq5oYeqkpFooONhMK"}
                    alt={`${t.name} - ${t.role}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-bold text-deep-forest dark:text-white">{t.name}</p>
                  <p className="text-sm text-sage dark:text-gray-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

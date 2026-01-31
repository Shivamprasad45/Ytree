
import React from 'react';
import Image from 'next/image';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Elena Rodriguez",
      role: "Active Member since 2022",
      content: "Seeing the GPS coordinates of my tree in Brazil was a game-changer. It makes the impact feel so real and personal. Vanagrow is the future of retail.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmXO7HK5jPkqKw7YANevlxOzNRwkUFW3avRAp9IwgjlsMDQTtMFDeQ5OD5ld7HR55E9KsN7F9nmHf_N-55ufU5gD57UdyQouAiHZxZd8zVgHTL23XHtrSn1-YPAZpnoqWn39zhcHEwJdkaRC6w1-sUJoGuwM8lSUI8SL9tXpMCd2lG8oVowTHhwWDcICVAVjqf222U4FvF-_97T6DuY9uKjwPRnP8C4K9ms6eOIn9DlXc0ZxA-fJkGqmcYShT4CqTOV2e4ZNNheWa-"
    },
    {
      name: "David Chen",
      role: "Legacy Planter",
      content: "I've switched all my home essentials to Vanagrow. Not only are the products superior quality, but knowing I've offset my entire year's carbon footprint is incredible.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1ZkmDLyLr53zfPTwOWQ-Hitms6qJtVP3NOujdpE94NAXFDIqhU9GTABRCgfnLPGdOc32LZDIlLs-UbkBu4Jgst5qcFu945J23sPUCKmbZ0dcLWR9C92gojBvPVMAWU4BmGCInvkmwEQnMe87QNLOWI3ZKfQ0Odf3km37buGBGbD7UiZkPumNFejPq7TEsPYt1CyEUE8nIo-yE2yLU7RusTnk0sQC9B4KbKeYqBrnUM1SHG2M89ibpg0gQeYBJq5oYeqkpFooONhMK"
    },
    {
      name: "Sarah Jenkins",
      role: "Verified Impact Maker",
      content: "Their transparency is unmatched. Most companies just talk about sustainability, but Vanagrow shows you exactly where your money goes. 12 trees and counting!",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6W1f3mKNa_PH7lB1kKBvoeUOfVYEVYrVVvUHeh4lrg0UD1iS9qZALvLQuVwjSJdpcYpsmuhjcVUrAskUv3TYfoMUQmpgCzj4B2Paocjk1bFl-6nlOPuSSVFU9DU2naRYXuzF8R4g4QjQKS83AhgTWlAfmlGjyI3X7YO1KSRjC1ye9q1U9FdiVmYZhMjp3adosXimYdkKtEYd2l9LS_Ao3OY_hwULofW4zEyOjiH04lb95EvtgPRwS2jrDVOLtV5rQXRoK_TeNBEzj"
    }
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
                    src={t.imageUrl}
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

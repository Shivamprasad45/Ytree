
import React from 'react';
import MaxWidthRappers from '@/components/MaxWidthRapper';

const teamMembers = [
  // {
  //   name: 'Dr. Elena Rossi',
  //   role: 'Chief Scientist',
  //   desc: 'Former IPCC contributor and forest ecologist with 15 years experience in biodiversity restoration.',
  //   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-bC4VbkjMk_NLnzeLZC8Q-D0DL-TpN4ayU3q5Uhcv-n5H0gqLTL9U6jLIgsT76yM0cDqWbZJFqDkAioTGSWIInO7oyAufI69oVM73yfKY3gTseS8nlFM9PENudNNsoTLzN7e3K4EmyYUjiMyWwK61ftZ-2t0gcnQClTnXc1inOpVO-gdQ8URgy_ntOP9lQaFZ3BGSq2YAMwCx5a85nEq4MiJ1AwMFYDtj9nkSRMQp7mrYVWJi0Xtvcuh1VmWbGATlT_gqrXW8otd-'
  // },
  {
    name: 'Shivam Prasad',
    role: 'Co-Founder',
    desc: 'Passionate about sustainable tech and building platforms that drive real environmental impact.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQHCnh8AcnnKSobXRpeuxMzYifnmzLCIj33lw0GDh13gZ8LbiZ4lgs03RYyboB8u46SNLnKYshJ8dIigtJXuIaulRkOq0tNQniXT3l7eAR6HZutFvavypBmeLD-rfcJdBFoVIn4qRtUwZ6zoho2ndvxP6nGKKy23PWVNRNBoxnAb7ED9x0rmX0LjL-jlIngXUSltAToMAYGdDqpJHsJ1aDjowr-n1sHwwAEXtw6qD7H6C9SiYjO3Qa4MlrsZIEIX4f2AfjJaL3vnV9'
  },
  // {
  //   name: 'Sarah Jenkins',
  //   role: 'Head of Impact',
  //   desc: 'Specialist in NGO relationships and on-the-ground reforestation logistics across the Global South.',
  //   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh-4daniPh_V7vM37VwkqJUIDGg41E265EguPzL2gn6-CzZVhADscOEe8Fj6m_e-ewXo-gd_NHEaKwAYePJjgpePBoAamUWc9ztfeGCbP0sCaEFTzcZsLBBySNfaH8GSZaxkKRwmnJng-qmeBXDYYHQRoKVO70WYeP_kFTSBsO_c3Mi3THX86AMGOSl9J87anFyqUJ0CVczd2I5ddZCXSmMUClgZMcB1OBJwPR-ZM4Te4MkV8wkypRZhtWzzuQlL5tphW6zklWvBY9'
  // }
];

const Team: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <MaxWidthRappers>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 text-foreground">Meet the Visionaries</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A team of environmental scientists, ethical engineers, and activists dedicated to restoration.</p>
        </div>
        <div className="grid md:grid-cols-1 gap-12">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="size-48 rounded-full border-4 border-primary p-2 mb-6">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${member.img}')` }}
                ></div>
              </div>
              <h4 className="text-xl font-bold text-foreground">{member.name}</h4>
              <p className="text-primary font-bold mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground px-4">{member.desc}</p>
            </div>
          ))}
        </div>
      </MaxWidthRappers>
    </section>
  );
};

export default Team;

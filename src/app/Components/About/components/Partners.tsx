
import React from 'react';
import Image from 'next/image';

const partners = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB3kLjnL6D4KwB4ac7Ay0iTwek9bXrnqKqFwujRcLmPzeO-X70YFFXGxrHI8GABlF-AUgLbKEcJwXZudpevJVqbwiyDMpdLBkP7acH1LMhe0pqPElHK4k6jV6RQalJE8VyLN542Y81AI4w7qXTZQtm8SMTp5Nqo7-l-xmOFCi0_04IejLRtqDZBR6ui3pf62CO-HwWIrt-SKmLDByA5I6UNL_14pB9tuwUpydpEcQArfex1JjGm0I6TaD-Am7wKkgVUyrhr1Yfmbk9b',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBpfHR3f7iNTUFbdCO26H_9TvP9Vshb4XQGDTk1K_5fPlIAuWZbl2ag68EQPgu_rhh8aQduU_XesvolNrdp63ngRqX03-p44WRD2OweAE4YdX_Alv7VqYL6WkIqxU546BOWRPS9yg850kboTLtLvOAeL4yb_4U85OwN2u037XenYZwjerXlnsLNUYSvbNlKPiNN5ttHqLPA-8HxbnFuQ8rWA3DZdUbB38_QrEqSIb1LyHLu1vxZ0XaKtjISAPeM1KYt19moYXpU9cCy',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDsAszi6U1qz89QFFAEahgd6WYI8p4iAR6dc7PBhk3iTSUVDlndmj25AvziQczuoVoi4LFIrMutS7JEs3mOiSWuYr64UKPxOxuq4i1_GPLyhqx_g6tbT9rYpiRkrmQhU67mHziPFIFcW4LBn4fYoxsDX0Aq-rOr8TuCZXa2feU1KnXOggSXuKblyMlKZvV1hXHKQ3o2keWvQABTJEviCQCEmrF0GtTdcrFizZRWwGajIepeZ3MdtnS2xSq1vei4OI4qvV3kMLnAzc7g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAY7bZkUx0_g7kPmffqUtMz-c0m0oJT5ctQtvF26MyrkIN0NF88113A7IXBsFqspOB3KZyfVLFwHVipYriRqwIgNnMM-NUqe8cximho0fn2RgnGTwzlW6ZZ4486TXsgztWmfPeojuMA-NH48hbVcZiVvoNiEICAEYx4MTUJO2eodsrllQK1Vw0fz_4tqGLxc4OBk4RlIXKE5QZO-oQGlSn91YV4Yxjrn1NrTTuq7ZGcceiHMhLlaDQVlXXP32kyiAwS3oAA8Evi-QdT',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAdbl2bBNiex3KCLxpJd2-EWOkIe-C0eeQAUv2DX7F3Zkslj-iOG-NIh8rJwrwg4xctZ_ndVs2yHQDMzlquC09y4_jYfkn7YEnlkuCy-QZWkkxoBFijZWLSjVxEeospRQthHxmPoIhq1aLjeDLE4FN1V8zuZaYJKDTbLuNlQ9RTJ3GNHznu2IqxgUUjY_DPiOVdob-zPBG9GSaCcvG1XTh5SD4LXf0y-5LAw_AppbCEQQpwomfK0Arc10j5nDudkcf8sCk4WzOLnrE3'
];

const Partners: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white dark:bg-background-dark">
      <div className="max-w-[1200px] mx-auto">
        <h3 className="text-center text-xl font-bold text-[#648764] uppercase tracking-widest mb-12">Our Verified NGO Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-60 grayscale hover:opacity-100 transition-all duration-500">
          {partners.map((logo, idx) => (
            <div key={idx} className="relative flex justify-center p-4 h-24">
              <Image alt={`NGO Partner ${idx + 1}`} className="object-contain" src={logo} fill sizes="(max-width: 768px) 50vw, 20vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

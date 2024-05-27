import React from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Common/Button';
import withAuth from '@/components/Auth/withAuth'; // Import withAuth

const IntroPage = () => {
  const router = useRouter();

  const goToUserSkills = () => {
    router.push('/goals'); // Assuming this is the correct route
  };

  return (
    <div className="">
      <div className="flex h-full flex-1
        flex-col justify-center items-center p-12 lg:px-8 
        bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd ">
        
        <img src="/img-unlock.png" alt="Logo" className="mb-6" />

        <div className="text-center text-white">
          <h1 className="text-3xl font-semibold">Unlock Your Potential</h1>

          <p className="mt-6 mb-4 text-left font-medium">
            Let's create a unique career profile just for you! Your skills and aspirations are key to finding your perfect career path. Together, we'll make this journey exciting and fun!
          </p>
        </div>

        <Button label="Let's get started" onClick={() => goToUserSkills()} />
      </div>
    </div>
  );
};

export default withAuth(IntroPage); // Wrap with withAuth HOC

import { useState, useEffect } from 'react';
import Button from "@/components/Common/Button";
import Router from 'next/router';

function CareerMatch() {
  const [firstCareer, setFirstCareer] = useState();

  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setFirstCareer(data.careerSuggestions[0]))
      .catch(error => console.error('Error fetching career suggestions:', error));
  }, []);



  const goToCareer = () => {
    router.push('/career'); 
  };

  return (
    <div className="bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd min-h-screen flex flex-col justify-center items-center p-6">
      <img src="/img-career-match.png" alt="Logo" className="mb-6" />
      <div className="text-center text-white">
        <h1 className="text-3xl font-semibold">
          {firstCareer && firstCareer.careerName}
        </h1>
        <p className="mt-6 mb-4 font-semibold text-xl">
          This career is an 80% match for you.
        </p>
      </div>
      <Button label="Let's get started"
      onClick={goToCareer} />
    </div>
  );
}

export default CareerMatch;

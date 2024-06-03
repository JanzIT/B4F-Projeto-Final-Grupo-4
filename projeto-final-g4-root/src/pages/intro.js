import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Common/Button";
import withAuth from "@/components/Auth/withAuth"; // Import withAuth
import { useUser } from "@/hooks/useUser";

const IntroPage = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Verifica se o usuário tem habilidades gerais
    if (user && user.userSkills && user.userSkills.generalSkills && user.userSkills.generalSkills.length > 0) {
      router.push("/dashboard"); // Redireciona para a página de dashboard se tiver habilidades gerais
    }
  }, [user]); // Assumindo que user é a única dependência

  const goToUserSkills = () => {
    router.push("/goals"); // Assuming this is the correct route
  };

  return (
    <div
      className="flex h-screen 
        flex-col justify-center items-center px-6 pt-12  lg:px-8 
        bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd "
    >
      <img src="/img-unlock.png" alt="Logo" className="mb-2" />

      <div className="text-center text-white mt-4">
        <h1 className="text-3xl text-center font-semibold px-2">
          Unlock Your Potential
        </h1>

        <p className="mt-6 mb-4 text-left text-base font-medium ">
          Let's create a unique career profile just for you! Your skills and
          aspirations are key to finding your perfect career path. Together,
          we'll make this journey exciting and fun!
        </p>
      </div>

      <Button
        className="mb-10"
        label="Let's get started!"
        onClick={goToUserSkills}
      />
    </div>
  );
};

export default withAuth(IntroPage); // Wrap with withAuth HOC

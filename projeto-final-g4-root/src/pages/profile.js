import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ScoreAcquiredSkills from "@/components/Profile/ScoreAcquiredSkills";
import ProfileSkills from "@/components/Profile/ProfileSkills";
import NavBar from "@/components/NavBar/NavBar";
import { useUser } from "@/hooks/useUser";
import { CiLogout } from "react-icons/ci";
import Streak from "@/components/Common/Streak";

const Profile = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [firstCareer, setFirstCareer] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [learningHours, setLearningHours] = useState(0); // Adicionando estado para learningHours
  const [loading, setLoading] = useState(true); // Estado de carregamento


  
  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(`/api/user/${user._id}`);
          const data = await response.json();

          if (!response.ok || !data.user) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          setUser(data.user);
          setUserName(data.user.name);
          setFirstCareer(data.user.chosenCareer);
          setProfileImage(data.profileImage);

          const { generalSkills, careerSkills } = data.user.userSkills;
          const careerPlan = data.user.chosenCareer.careerPlan;

          if (generalSkills && careerSkills && careerPlan) {
            const allCareerSkills = [
              ...careerPlan.essentials,
              ...careerPlan.intermediate,
              ...careerPlan.advanced,
            ];
            const totalCareerSkills = allCareerSkills.filter(
              (skill) => skill.checked
            ).length;

            let acquiredCareerSkills = 0;
            allCareerSkills.forEach((skill) => {
              if (generalSkills.includes(skill.name)) {
                acquiredCareerSkills++;
              }
            });

            // Adiciona 6 horas para cada habilidade em careerSkills
            const totalHours = careerSkills.length * 6;

            // Adiciona 6 horas para cada habilidade em data.user.userSkills.careerSkills
            const updatedCareerSkills = data.user.userSkills.careerSkills.map(
              (skill) => {
                return {
                  ...skill,
                  hours: skill.hours + 6,
                };
              }
            );

            // Atualiza as horas de aprendizado no estado
            setLearningHours(totalHours);

            // Atualiza o estado do usuário com as habilidades atualizadas
            const updatedUser = {
              ...data.user,
              userSkills: {
                ...data.user.userSkills,
                careerSkills: updatedCareerSkills,
              },
            };
            setUser(updatedUser);
            //            const progressPercentage = (acquiredCareerSkills / totalCareerSkills) * 100;              woulde be correct ==========  BUGGED
            //            const progressPercentage = (generalSkills.length / totalCareerSkills) * 100;              porcentagem em relação ao início(precisamos que passe de 100% no componente)
            const progressPercentage =
              (totalCareerSkills / generalSkills.length) * 100; //porcentagem da carreira em relação ao user (quebra galho pois normalmente não chega a 100%)
            setProgress(progressPercentage);
          } else {
            console.error("User skills data not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?._id]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove o usuário do localStorage
    router.push("/auth"); // Redireciona para a página de autenticação
  };

  if (loading) {
    return <div>Loading profile...</div>; // Exibe um carregamento enquanto os dados são buscados
  }

  return (
    <div className="bg-slate-950 text-white p-8">
      <div className="flex justify-between mt-8 mb-6">
        <div className="">
          <h1 className="text-3xl font-semibold mb-2">Hi, {userName}</h1>
          <h2>You are migrating to</h2>
          <span className="text-xl font-semibold">
            {firstCareer && firstCareer.careerName}
          </span>
        </div>

        <div className="h-20">
          <img src="/profile.webp" alt="profile" className="mb-6 h-20"  />
        </div>
      </div>
      <Streak />
      <ScoreAcquiredSkills
        progress={progress}
        learningHours={learningHours}
      />{" "}
      {/* Passando learningHours para o componente */}
      <ProfileSkills />

      <div className="flex flex-row justify-center">

        <CiLogout className="text-2xl mr-2" />
        <p onClick={handleLogout}> Logout </p>

      </div>{" "}

      <NavBar className="text-5xl" />
      <div className="h-20 w-11/12"></div>
      
        {/* <button
          className=" h-12 w-full rounded-3xl 
 text-white"
          onClick={handleLogout}
        >
          Logout
        </button> */}
    </div>
  );
};

export default Profile;

// import React, { useState } from "react";

// const ProfileSkills = () => {
//   // Lista de habilidades
//   const [skills, setSkills] = useState([
//     "Critical Thinking",
//     "Problem-Solving",
//     "Creativity",
//     "Communication",
//     "Analytical Thinking",
//     "Adaptability",
//     "Research Skills",
//     "Team Collaboration",
//     "Attention to Detail",
//     "Ethical Judgment",
//   ]);

//   // Estado inicial: todas as habilidades estão selecionadas
//   const [selectedSkills, setSelectedSkills] = useState([...skills]);

//   return (
//     <div className="text-white bg-neutral-900 rounded-[22.51px] p-10 mb-16">
//       <img
//         src="/img-profile-skills.svg"
//         alt="Logo"
//         className="mb-2 mx-auto block"
//       />
//       <h1 className="text-2xl font-medium mb-10 text-center">Your Skills</h1>
//       {/* Iterar sobre as habilidades para criar checkboxes */}
//       {skills.map((skill, index) => (
//         <div key={index} className="flex items-center mb-2">
//           <input
//             type="checkbox"
//             id={skill}
//             className="mr-4 custom-checkbox"
//             checked={selectedSkills.includes(skill)} // Verifica se a habilidade está selecionada
//             disabled // Impede que os checkboxes sejam clicados
//           />
//           <label htmlFor={skill} className="text-lg">
//             {skill}
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProfileSkills;

import React, { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";

const ProfileSkills = () => {
  const { user } = useUser();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchUserSkills = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(`/api/user/${user._id}`);
          const data = await response.json();
          if (
            data.user &&
            data.user.userSkills &&
            (data.user.userSkills.generalSkills ||
              data.user.userSkills.careerSkills)
          ) {
            const careerSkills = data.user.userSkills.careerSkills
            const generalSkills = data.user.userSkills.generalSkills
            setSkills([...generalSkills, ...careerSkills]);
          }
        } catch (error) {
          console.error("Error fetching user skills:", error);
        }
      }
    };

    fetchUserSkills();
  }, [user]);

  if (!user || skills.length === 0) {
    return <div className="bg-gradient-to-b from-slate-950 to-violet-950 inline-flex flex-col items-center p-[180px_24px_100px_24px] gap-[138px] h-[220vw] w-full text-white">LOADING SCREEN</div>;
  }

  return (
    <div className="text-white bg-neutral-900 rounded-[22.51px] p-10 mb-6">
      <img
        src="/img-profile-skills.svg"
        alt="Logo"
        className="mb-2 mx-auto block"
      />
      <h1 className="text-2xl font-medium mb-10 text-center">Your Skills</h1>
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center mb-2">

          <input
            type="checkbox"
            id={skill}
            className="mr-4 custom-checkbox"
            checked={skills.includes(skill)}
            disabled
          />

          <label htmlFor={skill} className="text-lg">
            {skill}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProfileSkills;

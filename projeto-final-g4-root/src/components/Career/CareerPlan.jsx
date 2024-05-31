import React, { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";

const CareerPlan = () => {
  const { user, setUser } = useUser();
  const [careerPlan, setCareerPlan] = useState(null);
  const [userChosenCareer, setUserChosenCareer] = useState("");

  const [loading, setLoading] = useState(true);

  // Estado inicial do usuário
  const [userData, setUserData] = useState({
    skills: [],
  });

  useEffect(() => {
    const fetchCareerPlan = async () => {
      if (!user || !user._id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/${user._id}`);
        const data = await response.json();
        if (
          data.user &&
          data.user.chosenCareer &&
          data.user.chosenCareer.careerPlan
        ) {
          console.log({ data });
          setUserChosenCareer(data.user.chosenCareer.careerName);
          setCareerPlan(data.user.chosenCareer.careerPlan);
        } else {
          console.error("Career plan data not found.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching career plan:", error);
      }
    };

    fetchCareerPlan();
  }, [user]);

  // Função para manipular a seleção de habilidades
  // const toggleSkill = (category, index) => {
  //   setCareerPlan((prevData) => {
  //     const updatedSkills = prevData[category].map((skill, i) =>
  //       i === index ? { ...skill, checked: !skill.checked } : skill
  //     );

  //     const updatedCareerData = {
  //       ...prevData,

  //       [category]: updatedSkills,
  //     };

  //     // Atualizar o estado do usuário
  //     const selectedSkill = updatedSkills[index];
  //     setUserData((prevUserData) => {
  //       let newSkills;
  //       if (selectedSkill.checked) {
  //         // Adicionar a habilidade se não estiver na lista
  //         if (!prevUserData.skills.includes(selectedSkill.name)) {
  //           newSkills = [...prevUserData, selectedSkill.name];
  //         } else {
  //           newSkills = prevUserData;
  //         }
  //       } else {
  //         // Remover a habilidade se estiver na lista
  //         newSkills = prevUserData.filter(
  //           (skill) => skill !== selectedSkill.name
  //         );
  //       }

  //       return {
  //         ...prevUserData,
  //         newSkills,
  //       };
  //     });

  //     return updatedCareerData;
  //   });
  // };

  const toggleSkill = (level, index) => {
    const updatedData = { ...careerPlan };
    updatedData[level][index].checked = !updatedData[level][index].checked;
    setCareerPlan(updatedData);

    // Fazer requisiçao ao backend para salvar as skills, usando fetch e método POST
};

  // Renderizar lista de habilidades com checkboxes
  const renderSkillsList = (category) => (
    <div key={category}>
      <h2 className="text-xl font-medium mb-4 mt-6">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      {careerPlan[category].map((skill, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`${category}-${index}`}
            className="mr-4 custom-checkbox"
            checked={skill.checked}
            onChange={() => toggleSkill(category, index)}
          />
          <label htmlFor={`${category}-${index}`} className="text-l">
            {skill.name}
          </label>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <div>Loading career plan...</div>;
  }

  if (!careerPlan) {
    return <div>Failed to fetch career plan.</div>;
  }

  return (
    <div className="text-white bg-neutral-900 rounded-[22.51px] p-10">
      <img
        src="/img-career-plan.svg"
        alt="Logo"
        className="mb-2 mx-auto block"
      />
      <h1 className="text-2xl font-medium mb-1 text-center">Career Plan</h1>
      <h2 className="text-xl font-medium mb-10 text-center">
        {userChosenCareer}
      </h2>

      {renderSkillsList("essentials")}
      {renderSkillsList("intermediate")}
      {renderSkillsList("advanced")}

      {/* A LISTA DE USER SKILLS DEVE SER DIRECIONADA PARA ProfileSkills */}
      <h2 className="text-xl font-medium mb-2 mt-4">User Skills</h2>
      <ul>
        {userData.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default CareerPlan;

// import React, { useState, useEffect } from "react";
// import { useUser } from "@/hooks/useUser";

// function CareerPlan() {
//   const { user } = useUser();
//   const [careerPlan, setCareerPlan] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCareerPlan = async () => {
//       if (!user || !user._id) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/user/${user._id}`);
//         const data = await response.json();
//         if (
//           data.user &&
//           data.user.chosenCareer &&
//           data.user.chosenCareer.careerPlan
//         ) {
//           setCareerPlan(data.user.chosenCareer.careerPlan);
//         } else {
//           console.error("Career plan data not found.");
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching career plan:", error);
//       }
//     };

//     fetchCareerPlan();
//   }, [user]);

//   if (loading) {
//     return <div>Loading career plan...</div>;
//   }

//   if (!careerPlan) {
//     return <div>Failed to fetch career plan.</div>;
//   }

//   const { essentials, intermediate, advanced } = careerPlan;

//   return (
//     <div className="text-white bg-neutral-900 rounded-[22.51px] p-10">
//       <img
//         src="/img-career-plan.svg"
//         alt="Logo"
//         className="mb-2 mx-auto block"
//       />
//       <h1 className="text-2xl font-medium mb-1 text-center">Career Plan</h1>
//       <h2 className="text-xl font-medium mb-10 text-center">
//         {careerPlan.name}
//       </h2>

//       <div>
//         <h2 className="text-xl font-medium mb-4 mt-6">Essentials</h2>
//         <ul>
//           {essentials.map((item, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <span className="text-l">{item.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2 className="text-xl font-medium mb-4 mt-6">Intermediate</h2>
//         <ul>
//           {intermediate.map((item, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <span className="text-l">{item.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2 className="text-xl font-medium mb-4 mt-6">Advanced</h2>
//         <ul>
//           {advanced.map((item, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <span className="text-l">{item.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default CareerPlan;

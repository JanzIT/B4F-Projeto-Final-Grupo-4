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

  console.log({ user })

  const addSkill = async (level, index, isChecked) => {
    if (!isChecked) {
      return;
    }

    const updatedData = { ...careerPlan };
    updatedData[level][index].checked = true;

    const response = await fetch("/api/updateCareerSkills", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        selectedSkill: updatedData[level][index],
        level,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to set chosen career");
    }

    const updatedUser = await response.json();

    setUser(updatedUser.user);
    setCareerPlan(updatedData);
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
            disabled={skill.checked}
            onChange={(e) => addSkill(category, index, e.target.checked)}
          />
          <label htmlFor={`${category}-${index}`} className="text-l">
            {skill.name}
          </label>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <div className="bg-gradient-to-b from-slate-950 to-violet-950 inline-flex flex-col items-center p-[180px_24px_100px_24px] gap-[138px] h-[220vw] w-full text-white">Loading career plan...</div>;
  }

  if (!careerPlan) {
    return <div>Failed to fetch career plan.</div>;
  }

  return (
    <div className="text-white bg-neutral-900 rounded-3xl p-10">
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

      <ul>
        {userData.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default CareerPlan;

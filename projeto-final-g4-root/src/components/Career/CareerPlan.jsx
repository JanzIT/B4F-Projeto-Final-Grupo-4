import React, { useState, useEffect } from "react";

const CareerPlan = () => {
  // Estado inicial das habilidades e nome da carreira
  const [careerData, setCareerData] = useState({
    name: "Business Analyst",
    skills: {
      essentials: [
        { name: "Business Analysis Fundamentals", checked: false },
        { name: "Requirements Gathering Techniques", checked: false },
        { name: "Process Flow Diagrams", checked: false },
      ],
      intermediate: [
        { name: "SWOT Analysis and Stakeholder Analysis", checked: false },
        { name: "Business Modeling Tools", checked: false },
        { name: "Agile Methodologies", checked: false },
      ],
      advanced: [
        { name: "Project Management", checked: false },
        { name: "Business Intelligence and Data Analysis", checked: false },
        { name: "ERP Tools", checked: false },
      ],
    },
  });

  // Estado inicial do usuário
  const [userData, setUserData] = useState({
    skills: [],
  });

  // Função para buscar dados do backend
  const fetchCareerData = async () => {
    try {
      const response = await fetch("/api/careerData");
      const data = await response.json();
      setCareerData(data);
    } catch (error) {
      console.error("Erro ao buscar dados da carreira:", error);
    }
  };

  // Buscar dados do backend quando o componente é montado
  useEffect(() => {
    fetchCareerData();
  }, []);

  // Função para manipular a seleção de habilidades
  const toggleSkill = (category, index) => {
    setCareerData((prevData) => {
      const updatedSkills = prevData.skills[category].map((skill, i) =>
        i === index ? { ...skill, checked: !skill.checked } : skill
      );

      const updatedCareerData = {
        ...prevData,
        skills: {
          ...prevData.skills,
          [category]: updatedSkills,
        },
      };

      // Atualizar o estado do usuário
      const selectedSkill = updatedSkills[index];
      setUserData((prevUserData) => {
        let newSkills;
        if (selectedSkill.checked) {
          // Adicionar a habilidade se não estiver na lista
          if (!prevUserData.skills.includes(selectedSkill.name)) {
            newSkills = [...prevUserData.skills, selectedSkill.name];
          } else {
            newSkills = prevUserData.skills;
          }
        } else {
          // Remover a habilidade se estiver na lista
          newSkills = prevUserData.skills.filter(
            (skill) => skill !== selectedSkill.name
          );
        }

        return {
          ...prevUserData,
          skills: newSkills,
        };
      });

      return updatedCareerData;
    });
  };

  // Renderizar lista de habilidades com checkboxes
  const renderSkillsList = (category) => (
    <div key={category}>
      <h2 className="text-xl font-medium mb-2">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      {careerData.skills[category].map((skill, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`${category}-${index}`}
            className="mr-2"
            checked={skill.checked}
            onChange={() => toggleSkill(category, index)}
          />
          <label htmlFor={`${category}-${index}`} className="text-sm">
            {skill.name}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="text-white bg-neutral-900 rounded-[22.51px] p-10">
      <h1 className="text-2xl font-medium mb-4">Career Plan</h1>
      <h2 className="text-lg font-medium mb-2">{careerData.name}</h2>

      {renderSkillsList("essentials")}
      {renderSkillsList("intermediate")}
      {renderSkillsList("advanced")}

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

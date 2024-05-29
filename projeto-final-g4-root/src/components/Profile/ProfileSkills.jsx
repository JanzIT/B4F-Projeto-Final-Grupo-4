import React, { useState } from "react";

const ProfileSkills = () => {
  // Lista de habilidades
  const [skills, setSkills] = useState([
    "Critical Thinking",
    "Problem-Solving",
    "Creativity",
    "Communication",
    "Analytical Thinking",
    "Adaptability",
    "Research Skills",
    "Team Collaboration",
    "Attention to Detail",
    "Ethical Judgment",
  ]);

  // Estado inicial: todas as habilidades estão selecionadas
  const [selectedSkills, setSelectedSkills] = useState([...skills]);

  return (
    <div className="text-white bg-neutral-900 rounded-[22.51px] p-10 mb-16">
      <img
        src="/img-profile-skills.svg"
        alt="Logo"
        className="mb-2 mx-auto block"
      />
      <h1 className="text-2xl font-medium mb-10 text-center">Your Skills</h1>
      {/* Iterar sobre as habilidades para criar checkboxes */}
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={skill}
            className="mr-4 custom-checkbox"
            checked={selectedSkills.includes(skill)} // Verifica se a habilidade está selecionada
            disabled // Impede que os checkboxes sejam clicados
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
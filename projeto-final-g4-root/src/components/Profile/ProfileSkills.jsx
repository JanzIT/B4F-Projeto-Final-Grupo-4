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
  // Estado para armazenar as habilidades desselecionadas
  const [deselectedSkills, setDeselectedSkills] = useState([]);

  // Função para manipular a seleção de habilidades
  const handleSkillChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      // Adiciona a habilidade selecionada ao estado
      setSelectedSkills([...selectedSkills, id]);
      // Remove a habilidade desselecionada do estado
      setDeselectedSkills(deselectedSkills.filter((skill) => skill !== id));
    } else {
      // Remove a habilidade selecionada do estado
      setSelectedSkills(selectedSkills.filter((skill) => skill !== id));
      // Adiciona a habilidade desselecionada ao estado
      setDeselectedSkills([...deselectedSkills, id]);
    }
  };

  // Função chamada ao submeter o formulário
  const onSubmit = () => {
    // Filtra apenas as habilidades desselecionadas
    const deselectedSkillsList = skills.filter((skill) =>
      deselectedSkills.includes(skill)
    );

    // Exibe uma mensagem de confirmação com as habilidades desselecionadas
    const confirmation = window.confirm(
      `Você tem certeza que quer remover as seguintes habilidades da sua lista de skills?\n${deselectedSkillsList.join(
        "\n"
      )}`
    );

    // Se o usuário confirmar a remoção
    if (confirmation) {
      // Remove as habilidades desselecionadas
      setSkills(selectedSkills);
      alert("Habilidades removidas com sucesso!");
    } else {
      // Se o usuário cancelar, mantém todas as habilidades na lista
      setSelectedSkills([...skills]);
      setDeselectedSkills([]);
      alert("Edição desfeita.");
    }
  };

  return (
    <div className="text-white bg-neutral-900 rounded-[22.51px] p-10">
      <h1 className="text-2xl font-medium mb-4">Your Skills</h1>
      {/* Iterar sobre as habilidades para criar checkboxes */}
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={skill}
            className="mr-2"
            checked={selectedSkills.includes(skill)} // Verifica se a habilidade está selecionada
            onChange={handleSkillChange}
          />
          <label htmlFor={skill} className="text-sm">
            {skill}
          </label>
        </div>
      ))}
      {/* Botão de submissão */}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={onSubmit} // Chama a função onSubmit ao clicar
      >
        Submit
      </button>
    </div>
  );
};

export default ProfileSkills;

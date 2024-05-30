import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "@/components/Common/Button";
import withAuth from "@/components/Auth/withAuth";

function GeneralSkills() {
  // Estado para armazenar os dados do usuário
  const [user, setUser] = useState(null);

  // Estado para armazenar as habilidades mentais e se estão selecionadas
  const [mentalSkill, setMentalSkill] = useState([
    { name: "Risk Management", checked: false },
    { name: "Research", checked: false },
    { name: "Strategic Thinking", checked: false },
    { name: "Analytic Thinking", checked: false },
    { name: "Decision-Making", checked: false },
    { name: "Problem-Solving", checked: false },
    { name: "Logical Thinking", checked: false },
    { name: "Data Interpretation", checked: false },
    { name: "Market Research", checked: false },
    { name: "Business Acumen", checked: false },
    { name: "Project Management", checked: false },
  ]);

  // Estado para armazenar as habilidades de comunicação e se estão selecionadas
  const [communicationSkill, setCommunicationSkill] = useState([
    { name: "Communication", checked: false },
    { name: "Team Collaboration", checked: false },
    { name: "Empathy", checked: false },
    { name: "Adaptability", checked: false },
    { name: "Leadership", checked: false },
    { name: "Ethical Judgment", checked: false },
    { name: "Stress Management", checked: false },
    { name: "Self-learning", checked: false },
    { name: "Presentation", checked: false },
    { name: "Patience", checked: false },
    { name: "Attention to Detail", checked: false },
    { name: "Customer Focus", checked: false },
    { name: "Relationship Building", checked: false },
    { name: "Technical Support", checked: false },
    { name: "Documentation", checked: false },
    { name: "Accountability", checked: false },
    { name: "User Advocacy", checked: false },
    { name: "Conflict Resolution", checked: false },
    { name: "Stakeholder Management", checked: false },
    { name: "Negotiation", checked: false },
  ]);

  // Estado para rastrear a visão ativa (habilidades mentais ou habilidades de comunicação)
  const [activeView, setActiveView] = useState("mentalSkill");

  // Hook para redirecionar o usuário
  const router = useRouter();

  // Efeito para buscar dados do usuário do localStorage ao montar o componente
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    } else {
      router.push("/auth");
    }
  }, [router]);

  // Função para alternar o estado de seleção de uma habilidade
  const handleSkillClick = (skills, setSkills, index) => {
    setSkills(
      skills.map((skill, i) => ({
        ...skill,
        checked: i === index ? !skill.checked : skill.checked,
      }))
    );
  };

  // Função para lidar com a continuação após a seleção de habilidades
  const handleContinue = async () => {
    // Filtra as habilidades selecionadas
    const selectedMentalSkills = mentalSkill.filter((skill) => skill.checked);
    const selectedCommunicationSkills = communicationSkill.filter(
      (skill) => skill.checked
    );

    // Verifica se pelo menos 5 habilidades foram selecionadas
    if (selectedMentalSkills.length + selectedCommunicationSkills.length < 5) {
      alert("Please select at least 5 skills.");
      return;
    }

    const selectedSkills = {
      skills: [...selectedMentalSkills, ...selectedCommunicationSkills].map(
        (skill) => skill.name
      ),
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      // await axios.post(
      //   "/api/insertSkillMental",
      //   {
      //     selectedSkills: selectedSkills.skills,
      //     userId: user.user._id,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // Envia as habilidades selecionadas para o backend
      await axios.post(
        "/api/orderedCareerSuggestions",
        {
          selectedSkills: selectedSkills.skills,
          userId: user.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redireciona para a página de combinação de carreiras
      router.push("/careerMatch");
    } catch (error) {
      console.error("Error submitting skills:", error);
      alert("Failed to continue. Please try again later.");
    }
  };

  // Função para lidar com o clique no botão
  const handleButtonClick = () => {
    if (activeView === "mentalSkill") {
      setActiveView("communicationSkill");
    } else {
      handleContinue();
    }
  };

  return (
    // Contêiner principal com fundo gradiente e altura mínima da tela
    <div className="bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd min-h-screen flex flex-col justify-between p-6 text-white">
      <div>
        {activeView === "mentalSkill" ? (
          <>
            {/* Seção de habilidades mentais */}
            <div className="text-left mt-20">
              <h1 className="text-4xl font-semibold">
                Mapping Your Mental Strength
              </h1>
              <p className="text-base font-medium mt-6">
                Identify your specific skills in critical thinking, problem
                solving and strategic analysis.
              </p>
              <p className="text-base font-normal mt-2">
                Select at least 5 skills.
              </p>
            </div>
            <div className="flex flex-wrap mt-12">
              {mentalSkill.map((skill, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleSkillClick(mentalSkill, setMentalSkill, index)
                  }
                  className={`flex flex-wrap p-2 px-3 my-2 mx-1 rounded-full cursor-pointer text-base font-medium ${
                    skill.checked ? "bg-violet-900" : "bg-[#261E3B]"
                  } text-white`}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Seção de habilidades de comunicação */}
            <div className="text-left mt-6">
              <h1 className="text-4xl font-semibold">
                Communication and Interaction Skills
              </h1>
              <p className="text-base font-medium mt-6">
                Assess your communication, collaboration, and empathy skills to
                build strong relationships.
              </p>
              <p className="text-base font-normal mt-2">
                Select at least 5 skills.
              </p>
            </div>
            <div className="flex flex-wrap mt-2">
              {communicationSkill.map((skill, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleSkillClick(
                      communicationSkill,
                      setCommunicationSkill,
                      index
                    )
                  }
                  className={`flex flex-wrap p-2 px-3 my-2 mx-1 rounded-full cursor-pointer text-base font-medium ${
                    skill.checked ? "bg-violet-900" : "bg-[#261E3B]"
                  } text-white`}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Botão para continuar */}
      <Button
        label={
          activeView === "mentalSkill" ? "Continue" : "Discover my career!"
        }
        onClick={handleButtonClick}
      />
    </div>
  );
}

// Envolve o componente com autenticação
export default withAuth(GeneralSkills);

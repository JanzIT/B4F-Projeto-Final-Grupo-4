// src/components/Goals.jsx

import React, { useState } from "react";

const GoalsPage = () => {
  // Define o estado inicial das metas usando o hook useState
  const [goals, setGoals] = useState([
    { name: "Develop skills", checked: false },
    { name: "Explore new careers and industries", checked: false },
    { name: "Plan career transition", checked: false },
    { name: "Improve your resume", checked: false },
    { name: "Discover new areas", checked: false },
  ]);

  // Função para alternar o estado de uma meta específica
  const toggleGoal = (index) => {
    setGoals(
      goals.map((goal, i) => {
        if (index === i) {
          return { ...goal, checked: !goal.checked }; // Inverte o valor atual da meta específica
        }
        return goal;
      })
    );
  };

  return (
    <div className="GoalsStyles bg-gradient-to-b from-slate-950 to-violet-950 min-h-screen flex flex-col justify-center items-center text-white p-8">
      <div>
        <h1 className="text-4xl font-medium">
          What are your goals with our app?
        </h1>
      </div>

      <div className="CheckboxList w-full max-w-md flex flex-col justify-start items-start gap-6 mt-8">
        {/* Itera sobre as metas e renderiza uma checkbox para cada uma */}
        {goals.map((goal, index) => (
          <label className="CheckboxLabel w-full" key={index}>
            <div
              className={`w-full h-16 rounded-2xl flex items-center justify-start text-white font-Urbanist text-base font-normal cursor-pointer p-6 ${
                goal.checked
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                  : "bg-[#261E3B] "
              }`}
              onClick={() => toggleGoal(index)}
            >
              {goal.name}
            </div>
          </label>
        ))}
      </div>

      <div className="w-full max-w-md mt-8">
        <button className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[23px] flex justify-center items-center">
          Continue
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;


// Algumas maneiras de utilizar as lógicas implementadas:
// 1. Integrar com um Formulário e Envio de Dados
//   - Ao clicar no botão "Continue", você pode enviar os dados das metas selecionadas para o backend para processamento adicional.

// 2. Adicionar Feedback Visual
//   - Adicione feedback visual para as checkboxes selecionadas, como mudar a cor de fundo ou adicionar um ícone ao lado das metas selecionadas.

// 3. Atualizar Interface de Usuário Dinamicamente
//   - Com a lógica implementada, você pode atualizar dinamicamente a interface do usuário com base nas metas selecionadas, exibindo informações adicionais ou desbloqueando recursos adicionais da aplicação.

// 4. Persistir Dados Localmente ou no Backend
//   - Você pode persistir os dados das metas selecionadas localmente no navegador do usuário usando localStorage ou sessionStorage, ou enviá-los para o backend e armazená-los em um banco de dados para referência futura.

// 5. Adicionar Validação de Formulário
//   - Adicione validação de formulário para garantir que o usuário selecione pelo menos uma meta antes de prosseguir, verificando se pelo menos uma das checkboxes está marcada antes de permitir que o usuário prossiga.

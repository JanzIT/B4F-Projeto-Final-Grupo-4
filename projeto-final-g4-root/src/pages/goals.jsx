import React, { useState } from 'react';
import withAuth from '@/components/Auth/withAuth'; // Import withAuth
import { useRouter } from 'next/router'; // Import for routing

const GoalsPage = () => {
  const router = useRouter(); // Initialize router

  // Define o estado inicial das metas usando o hook useState
  const [goals, setGoals] = useState([
    { name: 'Develop skills', checked: false },
    { name: 'Explore new careers and industries', checked: false },
    { name: 'Plan career transition', checked: false },
    { name: 'Improve your resume', checked: false },
    { name: 'Discover new areas', checked: false },
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

  const handleContinue = () => {
    // Verifique se o usuário está autenticado antes de prosseguir
    const isAuthenticated = true; // Substitua com lógica de autenticação real

    if (isAuthenticated) {
      // Redirecionar para "/generalSkills" se autenticado
      router.push('/generalSkills');
    } else {
      // Redirecionar para login ou exibir mensagem de aviso
      // ... implementar lógica de redirecionamento ou aviso
    }
  };

  return (
    <div className="GoalsStyles bg-gradient-to-b from-slate-950 to-violet-950 min-h-screen flex flex-col justify-center items-center text-white p-8 ">
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
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                  : 'bg-[#261E3B] '
              }`}
              onClick={() => {
                // Verifique se o usuário está autenticado antes de alternar a meta
                const isAuthenticated = true; // Substitua com lógica de autenticação real

                if (isAuthenticated) {
                  toggleGoal(index);
                } else {
                  // Redirecionar para login ou exibir mensagem de aviso
                  // ... implementar lógica de redirecionamento ou aviso
                }
              }}
            >
              {goal.name}
            </div>
          </label>
        ))}
      </div>

      <div className="w-full max-w-md mt-8">
        <button className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[23px] flex justify-center items-center" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default withAuth(GoalsPage); // Wrap with withAuth HOC

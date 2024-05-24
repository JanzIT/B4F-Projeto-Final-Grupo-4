import React, { useState } from 'react';
import { useRouter } from 'next/router';
import authMiddleware from '../middleware/authMiddleware';

const SkillMental = ({ user }) => {
  const [skills, setSkills] = useState([
    { name: "Risk Management", checked: false },
    { name: "Strategic Thinking", checked: false },
    { name: "Research", checked: false },
    { name: "Analytic Thinking", checked: false },
    { name: "Decision-Making", checked: false },
    { name: "Problem-Solving", checked: false },
    { name: "Logical Thinking", checked: false },
    { name: "Data Interpretation", checked: false },
    { name: "Project Management", checked: false },
    { name: "Market Research", checked: false },
    { name: "Business Acumen", checked: false },
  ]);

  const handleSkillClick = (index) => {
    setSkills(
      skills.map((skill, i) => ({
        ...skill,
        checked: i === index ? !skill.checked : skill.checked,
      }))
    );
  };

  const handleContinue = () => {
    console.log(skills);
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 to-violet-950 inline-flex flex-col items-end p-[180px_24px_100px_24px] gap-[138px] text-white">
      <div className="text-left mx-6">
        <h1 className="text-4xl font-semibold ">Mapping Your Mental Strength</h1>
        <p className="text-lg font-medium">
          Identify your specific skills in critical thinking, problem solving
          and strategic analysis.
        </p>
        <p className="text-base font-normal">Select at least 5 skills.</p>
      </div>

      <div className="flex w-[382px] px-2 py-0 items-start content-start gap-4 flex-wrap">
        {skills.map((skill, index) => (
          <div
            key={index}
            onClick={() => handleSkillClick(index)}
            className={`flex-wrap p-2 mb-2 rounded-full cursor-pointer text-lg font-medium ${
              skill.checked ? 'bg-violet-900' : 'bg-slate-800'
            } text-white`}
          >
            {skill.name}
          </div>
        ))}
      </div>

      <button onClick={handleContinue}>
        CONTINUE
      </button>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  await authMiddleware(context.req, context.res, () => {});

  if (!context.req.user) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: context.req.user,
    },
  };
};

export default SkillMental;

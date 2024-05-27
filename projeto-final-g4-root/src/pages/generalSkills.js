import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Button from "@/components/Common/Button";



function generalSkills() {

//todas as skills gerais 
  const [mentalSkill, setMentalSkill] = useState([
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

  const [activeView, setActiveView] = useState("mentalSkill");

  const handleCareer = async () => {
    try {
      const checkedCommunicationSkill = communicationSkill
        .filter((skill) => skill.checked)
        .map((skill) => skill.name);   //retorna a array de string
      const checkedMentalSkill = mentalSkill
        .filter((skill) => skill.checked)
        .map((skill) => skill.name);

      const response = await axios.post("/api/", {
        skills: [...checkedCommunicationSkill, ...checkedMentalSkill],
      });

      if (response.data.success) {
        router.push("/career");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className=" bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd
       inline-flex flex-col items-end h-full p-6
        text-white"
    >
      {activeView === "mentalSkill" ? (
        <>
          <div className="text-left mt-20">
            <h1 className="text-4xl font-semibold ">
              Mapping Your Mental Stregth
            </h1>

            <p className="text-base font-medium mt-6">
              Identify your specific skills in critical thinking, problem
              solving and strategic analysis.
            </p>

            <p className="text-base font-normal mt-2	">
              Select at least 5 skills.
            </p>
          </div>

          <div className="flex flex-wrap  mt-12">
            {mentalSkill.map((e, i) => {
              return (
                <>
                  <div
                    key={i}
                    onClick={() => {
                      setMentalSkill(
                        mentalSkill.map((e, j) => {
                          if (i === j) {
                            return { name: e.name, checked: !e.checked };
                          }
                          return e;
                        })
                      );
                    }}
                    className={`
                flex flex-wrap
                p-2 
                my-2

                rounded-full 
                cursor-pointer
                text-lg font-medium  ${
                  e.checked ? "bg-violet-900" : "bg-slate-800"
                } text-white`}
                    checked={e.checked}
                  >
                    {e.name}
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="text-left mt-20">
            <h1 className="text-4xl font-semibold ">
              Communication and Interaction Skills
            </h1>

            <p className="text-base font-medium mt-6">
              Assess your communication, collaboration, and empathy skills to
              build strong relationships.
            </p>

            <p className="text-base font-normal mt-2	">
              Select at least 5 skills.
            </p>
          </div>

          <div className="flex flex-wrap  mt-12">
            {communicationSkill.map((e, i) => {
              return (
                <>
                  <div
                    key={i}
                    onClick={() => {
                      setCommunicationSkill(
                        communicationSkill.map((e, j) => {
                          if (i === j) {
                            return { name: e.name, checked: !e.checked };
                          }
                          return e;
                        })
                      );
                    }}
                    className={`
                flex flex-wrap
                p-2 
                my-2

                rounded-full 
                cursor-pointer
                text-lg font-medium  ${
                  e.checked ? "bg-violet-900" : "bg-slate-800"
                } text-white`}
                    checked={e.checked}
                  >
                    {e.name}
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <Button
        label={
          activeView === "mentalSkill" ? "Continue" : "Discover my career!"
        }
        onClick={() => {
          if (activeView === "mentalSkill") {
            setActiveView("communicationSkill");
          } else {
            // handleCareer();
            console.log(handleCareer())
          }
        }}
      />
    </div>
  );
}

export default generalSkills;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "@/components/Common/Button";
import withAuth from "@/components/Auth/withAuth";

function GeneralSkills() {
  const [user, setUser] = useState(null); // State for storing user data
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
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    } else {
      router.push("/auth");
    }
  }, [router]);

  const handleSkillClick = (skills, setSkills, index) => {
    setSkills(
      skills.map((skill, i) => ({
        ...skill,
        checked: i === index ? !skill.checked : skill.checked,
      }))
    );
  };

  const handleContinue = async () => {
    const selectedMentalSkills = mentalSkill.filter((skill) => skill.checked);
    const selectedCommunicationSkills = communicationSkill.filter(
      (skill) => skill.checked
    );

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

      router.push("/careerMatch");
    } catch (error) {
      console.error("Error submitting skills:", error);
      alert("Failed to continue. Please try again later.");
    }
  };

  const handleButtonClick = () => {
    if (activeView === "mentalSkill") {
      setActiveView("communicationSkill");
    } else {
      handleContinue();
    }
  };

  return (
    <div className="bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd inline-flex flex-col items-end h-full p-6 text-white">
      {activeView === "mentalSkill" ? (
        <>
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
                className={`flex flex-wrap p-2 my-2 rounded-full cursor-pointer text-lg font-medium ${skill.checked ? "bg-violet-900" : "bg-slate-800"
                  } text-white`}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="text-left mt-20">
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
          <div className="flex flex-wrap mt-12">
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
                className={`flex flex-wrap p-2 my-2 rounded-full cursor-pointer text-lg font-medium ${skill.checked ? "bg-violet-900" : "bg-slate-800"
                  } text-white`}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </>
      )}
      <Button
        label={
          activeView === "mentalSkill" ? "Continue" : "Discover my career!"
        }
        onClick={handleButtonClick}
      />
    </div>
  );
}

export default withAuth(GeneralSkills);

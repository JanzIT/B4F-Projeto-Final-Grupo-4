import React, { useState, useEffect } from "react";
import Streak from "@/components/Common/streak";
import ScoreAcquiredSkills from "@/components/Profile/ScoreAcquiredSkills";
import ProfileSkills from "@/components/Profile/ProfileSkills";
import NavBar from "@/components/NavBar/NavBar";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const { user, token, setUser } = useUser();

  const [userName, setUserName] = useState("");
  const [firstCareer, setFirstCareer] = useState(null);
  const [profileImage, setProfileImage] = useState("");
console.log({user})
  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id){
      try {
        const response = await fetch(`/api/user/${user._id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log({data})
        setUser(data.user);
        setUserName(data.user.name);
        setFirstCareer(data.careerSuggestions[0]); // Acessa diretamente o primeiro elemento do array
        setProfileImage(data.profileImage);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }}
    };

    fetchData();
  }, [user?._id]);

  return (
    <div className="bg-slate-950 text-white p-6">
      <div className="flex justify-between mt-8 mb-6">
        <div className="">
          <h1 className="text-3xl font-semibold mb-2">Hi, {userName}</h1>
          <h2>You are migrating to</h2>
          <span className="text-2xl font-semibold">
            {firstCareer && firstCareer.careerName}
          </span>
        </div>

        <div className="h-20">
          <img src="/img-profile.png" alt="profile" className="mb-6" />
        </div>
      </div>
      <Streak />
      <ScoreAcquiredSkills />
      <ProfileSkills />

      <NavBar />
      <div className="h-14 w-11/12"></div>
    </div>
  );
};

export default Profile;

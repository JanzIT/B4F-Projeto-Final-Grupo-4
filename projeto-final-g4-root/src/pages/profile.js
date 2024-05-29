import React, { useState } from "react";
import ProfileSkills from "@/components/Profile/ProfileSkills";
import NavBar from "@/components/NavBar/NavBar";
import ScoreAcquiredSkills from "@/components/Profile/ScoreAcquiredSkills";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const { user, token, setUser } = useUser()
  return (
    <div>
      <ProfileSkills />
      <ScoreAcquiredSkills />


    </div>
  );
};

export default Profile;

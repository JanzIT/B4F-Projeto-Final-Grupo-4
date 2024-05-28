import React, { useState } from "react";
import ProfileSkills from "@/components/Profile/ProfileSkills";
import NavBar from "@/components/NavBar/NavBar";
import ScoreAcquiredSkills from "@/components/Profile/ScoreAcquiredSkills";

const Profile = () => {
  return (
    <div>
      <ProfileSkills />
      <ScoreAcquiredSkills/>


    </div>
  );
};

export default Profile;

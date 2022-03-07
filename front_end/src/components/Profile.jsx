import React, { useEffect } from "react";
import { useMyState, setMyState } from "../StatesContext";

const Profile = () => {
  const { userProfile } = useMyState();
  const {} = setMyState();

  useEffect(() => {
    console.log("use effect in Profile component");
  }, []);

  console.log("userProfile: ", userProfile);
  return (
    <>
      <div>
        <div>Profile</div>
        {console.log("Profile component userProfile: ", userProfile)}
        <img src={userProfile[2]} alt="profile picture" />
        <p>name: {userProfile[1]} </p>
      </div>
    </>
  );
};

export default Profile;

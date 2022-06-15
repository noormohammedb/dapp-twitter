import React, { useEffect } from "react";

import { useMyState } from "../StatesContext";
import SignupForm from "./SignupForm";
import Profile from "./Profile";

const Authendication = () => {
  const { myContractProvider, userProfile, account } = useMyState();

  useEffect(async () => {
    // console.log("abi: ", abi);
    // console.log("userProfile: ", userProfile);
  }, []);

  return (
    <>
      <div className="">Authendication</div>
      {/* <span>contract address : {myContractProvider?.address}</span> */}
      <span>wallet address : {account}</span>
      {userProfile?.isActive ? <Profile /> : <SignupForm />}
    </>
  );
};

export default Authendication;

import React, { useEffect } from "react";
import { ethers } from "ethers";
import abi, { ContractAddress } from "../utils/getContract";

import { useMyState, setMyState } from "../StatesContext";
import SignupForm from "./SignupForm";
import Profile from "./Profile";

const Authendication = () => {
  const { account, provider, myContract, userProfile } = useMyState();
  const { setMyContract, setUserProfile } = setMyState();

  useEffect(async () => {
    console.log("abi: ", abi);
    const contractObject = await new ethers.Contract(
      ContractAddress,
      abi,
      provider
    );
    console.log("contractObject: ", contractObject);

    setMyContract(contractObject);
    console.log("contract: ", myContract);
    console.log("account: ", account);

    // const myProfile = await contractObject.myProfile();
    const myProfile = await contractObject.users(account);
    setUserProfile(myProfile);
    console.log("myProfile: ", myProfile);
  }, []);

  return (
    <>
      <div className="">Authendication</div>
      <span>contract address : {myContract?.address}</span>
      {userProfile?.isActive ? <Profile /> : <SignupForm />}
    </>
  );
};

export default Authendication;

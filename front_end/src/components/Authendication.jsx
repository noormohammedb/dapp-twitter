import React, { useEffect } from "react";
import { ethers } from "ethers";
import abi, { ContractAddress } from "../utils/getContract";

import { useMyState, setMyState } from "../StatesContext";
import SignupForm from "./SignupForm";
import Profile from "./Profile";

const Authendication = () => {
  const { account, provider, myContractProvider, userProfile } = useMyState();
  const { setMyContractProvider, setMyContractSigner, setUserProfile } =
    setMyState();

  useEffect(async () => {
    // console.log("abi: ", abi);
    const contractObjectProvider = await new ethers.Contract(
      ContractAddress,
      abi,
      provider
    );
    // console.log("contractObjectProvider: ", contractObjectProvider);
    const contractObjectSigner = await new ethers.Contract(
      ContractAddress,
      abi,
      provider.getSigner()
    );
    // console.log("contractObjectSigner: ", contractObjectSigner);
    setMyContractProvider(contractObjectProvider);
    setMyContractSigner(contractObjectSigner);
    // console.log("contract: ", myContractProvider);
    // console.log("account: ", account);

    // const myProfile = await contractObjectSigner.myProfile();
    const myProfile = await contractObjectProvider.users(account);
    console.log("myProfile: ", myProfile);
    setUserProfile(myProfile);
  }, []);

  return (
    <>
      <div className="">Authendication</div>
      <span>contract address : {myContractProvider?.address}</span>
      {userProfile?.isActive ? <Profile /> : <SignupForm />}
    </>
  );
};

export default Authendication;

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi, { ContractAddress } from "../utils/getContract";

import { useMyState, setMyState } from "../StatesContext";
import SignupForm from "./SignupForm";

const Authendication = () => {
  const { account, provider, myContract } = useMyState();
  const { setMyContract } = setMyState();

  const [user, setUser] = useState();

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
    setUser(myProfile);
    console.log("user: ", user);
    console.log("myProfile: ", myProfile);
  }, []);

  console.log("before return contract: ", myContract);
  console.log("before return user: ", user);

  return (
    <>
      <div className="">Authendication</div>
      <span>contract address : {myContract?.address}</span>
      {user?.isActive ? <></> : <SignupForm />}
    </>
  );
};

export default Authendication;

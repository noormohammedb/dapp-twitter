import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import abi, { ContractAddress } from "../utils/getContract";

import { useMyState, setMyState } from "../StatesContext";
import Authendication from "../components/Authendication";
import { networkId } from "../utils/getContract";

const Singup = () => {
  const { account, provider, myContractProvider } = useMyState();
  const { setAccount, setMyContractSigner, setUserProfile } = setMyState();

  useEffect(async () => {
    console.log("signup use effect");
    console.log("account: ", account);
    console.log("provider: ", provider);
  }, []);

  const authFunction = async () => {
    // console.log("provider.network.chainId: ", provider.network.chainId);
    if (!provider) {
      alert("You should Install MetaMask to use this Application.");
      return;
    } else if (provider.network.chainId != networkId) {
      console.log("You should connect to Ropsten Test Network.");
      alert("Change Network to Ropsten Test Network In MetaMask.");
      return;
    }
    let myAccount;
    try {
      myAccount = await provider.send("eth_requestAccounts", []);
      await window.localStorage.setItem("address", myAccount[0]);
    } catch (metaMaskError) {
      console.log("cancelled metamask connect");
      console.log("metaMaskError: ", metaMaskError);
    }
    console.log("myAccount", myAccount);

    const contractObjectSigner = await new ethers.Contract(
      ContractAddress,
      abi,
      provider.getSigner()
    );
    // console.log("contractObjectSigner: ", contractObjectSigner);

    // console.log("myContractProvider: ", myContractProvider);
    // const myProfile = await myContractProvider.myProfile();
    const myProfile = await myContractProvider.users(myAccount[0]);
    console.log("myProfile: ", myProfile);

    setAccount(myAccount[0]);
    setMyContractSigner(contractObjectSigner);
    setUserProfile(myProfile);
  };

  const logoutAccount = () => {
    setAccount();
  };

  console.log("Signup Render");

  return (
    <>
      <div className="">Signup Form</div>
      {account?.length > 0 ? (
        <>
          <p>{account}</p>
          <Authendication />
          <button onClick={logoutAccount}>Logout</button>
        </>
      ) : (
        <button onClick={authFunction}>Connect Wallet</button>
      )}
      <Link to="/dashboard">dashboard</Link>
    </>
  );
};

export default Singup;

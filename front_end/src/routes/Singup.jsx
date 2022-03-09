import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import abi, { ContractAddress } from "../utils/getContract";

import { useMyState, setMyState } from "../StatesContext";
import Authendication from "../components/Authendication";
import { networkId } from "../utils/getContract";

const Singup = () => {
  const {} = setMyState();

  const { account, provider, myContractProvider } = useMyState();
  const {
    setAccount,
    setProvider,
    setMyContractProvider,
    setMyContractSigner,
    setUserProfile,
  } = setMyState();

  useEffect(async () => {
    console.log("signup use effect");
    if (window.ethereum) {
      const myProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(myProvider);
      console.log("account: ", account);
      console.log("provider: ", provider);

      const contractObjectProvider = await new ethers.Contract(
        ContractAddress,
        abi,
        myProvider
      );
      setMyContractProvider(contractObjectProvider);
      console.log("contractObjectProvider: ", contractObjectProvider);
      console.log("contract: ", myContractProvider);
      // console.log("account: ", account);
    } else {
      console.log("Non Ethereum browser detected.");
    }
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
    console.log("provider: ", provider);
    const myAccount = await provider.send("eth_requestAccounts", []);
    setAccount(myAccount[0]);
    console.log("myAccount", myAccount);

    console.log("abi: ", abi);
    const contractObjectSigner = await new ethers.Contract(
      ContractAddress,
      abi,
      provider.getSigner()
    );
    // console.log("contractObjectSigner: ", contractObjectSigner);
    setMyContractSigner(contractObjectSigner);

    // console.log("myContractProvider: ", myContractProvider);
    // const myProfile = await myContractProvider.myProfile();
    const myProfile = await myContractProvider.users(myAccount[0]);
    console.log("myProfile: ", myProfile);
    setUserProfile(myProfile);
  };

  const logoutAccount = () => {
    setAccount();
  };

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

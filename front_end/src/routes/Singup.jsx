import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
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
    <div className="flex min-h-screen justify-around items-center flex-col">
      {account?.length > 0 ? (
        <>
          <Navigate to="/dashboard" />
          {/* <p>{account}</p>
          <Authendication />
          <button onClick={logoutAccount}>Logout</button> */}
        </>
      ) : (
        <button
          onClick={authFunction}
          type="button"
          className="border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 text-sm text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl"
        >
          <img
            className="w-10 h-14 mr-5"
            src="https://ipfs.fleek.co/ipfs/bafybeidrv26xx2hu6gpfqyfhclvljks5b355cruw74qj5ezbdzh4w7t5l4"
            alt="metamask icon"
          />
          Connect with MetaMask
        </button>
      )}
      <Link
        to="/dashboard"
        className="underline text-indigo-600 hover:text-indigo-900"
      >
        dashboard
      </Link>
    </div>
  );
};

export default Singup;

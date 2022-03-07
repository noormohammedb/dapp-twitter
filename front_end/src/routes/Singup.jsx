import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

import { useMyState, setMyState } from "../StatesContext";
import Authendication from "../components/Authendication";

const Singup = () => {
  const { account, provider } = useMyState();
  const { setAccount, setProvider } = setMyState();

  useEffect(async () => {
    if (window.ethereum) {
      const myProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(myProvider);
      console.log("account: ", account);
      console.log("provider: ", provider);
    } else {
      console.log("Non Ethereum browser detected.");
    }
  }, []);

  const authFunction = async () => {
    if (!provider) {
      alert("You should Install MetaMask to use this Application.");
      return;
    } else if (provider.network.chainId != 3) {
      console.log("You should connect to Ropsten Test Network.");
      alert("Change Network to Ropsten Test Network In MetaMask.");
      return;
    }
    console.log("provider: ", provider);
    const account = await provider.send("eth_requestAccounts", []);
    setAccount(account[0]);
    console.log("account", account);
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

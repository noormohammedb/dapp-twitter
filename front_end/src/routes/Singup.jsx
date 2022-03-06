import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

import { useMyState, setMyState } from "../StatesContext";

const Singup = () => {
  const [account, provider] = useMyState();
  const [setAccount, setProvider] = setMyState();

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    } else {
      console.log("Non Ethereum browser detected.");
      alert("You should Install MetaMask to use this Application.");
    }
  }, []);

  const authFunction = async () => {
    const account = await provider?.send("eth_requestAccounts", []);
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
          <button onClick={logoutAccount}>Logout</button>
        </>
      ) : (
        <button onClick={authFunction}>Signup Or Login</button>
      )}
      <Link to="/dashboard">dashboard</Link>
    </>
  );
};

export default Singup;

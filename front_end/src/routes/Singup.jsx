import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const Singup = () => {
  const authFunction = async () => {
    const account = await provider.send("eth_requestAccounts", []);
    setAccount(account[0]);
    console.log("account", account);
  };

  const logoutAccount = () => {
    setAccount();
  };

  const [account, setAccount] = useState();
  useEffect(async () => {}, []);

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

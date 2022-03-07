import React, { useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { useMyState, setMyState } from "../StatesContext";

const Landing = () => {
  const { provider } = useMyState();
  const { setProvider } = setMyState();

  useEffect(() => {
    console.log("Landing");
    if (window.ethereum) {
      console.log("MetaMask is installed");
      const myProvider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("myProvider: ", myProvider);
      setProvider(myProvider);
      console.log("provider: ", provider);
    }
  }, []);

  console.log("provider: ", provider);
  return (
    <>
      <div>Landign Page</div>
      <Link to="/signup">singup login</Link>
    </>
  );
};

export default Landing;

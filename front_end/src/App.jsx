import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import { useMyState, setMyState } from "./StatesContext";
import Landing from "./routes/Landing";
import Dashboard from "./routes/Dashboard";
import Singup from "./routes/Singup";
import abi, { ContractAddress } from "./utils/getContract";

const App = () => {
  const { provider } = useMyState();
  const { setProvider, setMyContractProvider } = setMyState();

  useEffect(async () => {
    console.log("Landing");
    if (window.ethereum) {
      console.log("MetaMask is installed");
      const myProvider = new ethers.providers.Web3Provider(window.ethereum);

      const contractObjectProvider = await new ethers.Contract(
        ContractAddress,
        abi,
        myProvider
      );

      setProvider(myProvider);
      setMyContractProvider(contractObjectProvider);
    } else {
      console.log("Non Ethereum Browser Detected");
    }
  }, []);
  console.log("provider from context in App: ", provider);
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;

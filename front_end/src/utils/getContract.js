import { ethers } from "ethers";
import { useMyState, setMyState } from "../StatesContext";
import { abi } from "../../contractArtifact.json";

// export const ContractAddress = "0xb0acE55ADa53784Be4e42844970c2096F3A0d4Af";   // Ropsten
export const ContractAddress = "0xE16735Bf8cD27aA2385b19476ea9CAC71E787106"; // ganache
export const networkId = 1337; // ganache
// export const networkId = 3;  // Ropsten
export default abi;

// export const getContract = () => {
//   const [provider] = useMyState();
// };

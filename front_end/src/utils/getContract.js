import { ethers } from "ethers";
import { useMyState, setMyState } from "../StatesContext";
import { abi } from "../../contractArtifact.json";

// export const ContractAddress = "0x6E3131622c39260330e3c644A4F9a838C6c520aA";   // Ropsten
export const ContractAddress = "0x334F8d9e61fbB163d946a13290CAfEe2B438d9E0"; // ganache
export const networkId = 1337; // ganache
// export const networkId = 3;  // Ropsten
export default abi;

// export const getContract = () => {
//   const [provider] = useMyState();
// };

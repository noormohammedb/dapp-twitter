import { useState, useContext, createContext } from "react";

const stateContext = createContext();
const stateUpdateContext = createContext();

export const useMyState = () => useContext(stateContext);
export const setMyState = () => useContext(stateUpdateContext);

// export const useMyState = () => {
//   const foo = useContext(stateContext);
//   console.log("foo: ", foo);
//   return { ...foo };
// };

// export const setMyState = () => {
//   const bar = useContext(stateUpdateContext);
//   console.log("bar: ", bar);
//   return { ...bar };
// };

export const StatesProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [provider, setProvider] = useState();
  const [myContractProvider, setMyContractProvider] = useState();
  const [myContractSigner, setMyContractSigner] = useState();
  const [userProfile, setUserProfile] = useState();
  const [globalTweets, setGlobalTweets] = useState([]);

  return (
    <stateContext.Provider
      value={{
        account,
        provider,
        myContractProvider,
        userProfile,
        myContractSigner,
        globalTweets,
      }}
    >
      <stateUpdateContext.Provider
        value={{
          setAccount,
          setProvider,
          setMyContractProvider,
          setUserProfile,
          setMyContractSigner,
          setGlobalTweets,
        }}
      >
        {children}
      </stateUpdateContext.Provider>
    </stateContext.Provider>
  );
};

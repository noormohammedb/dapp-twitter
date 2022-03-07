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
  const [myContract, setMyContract] = useState();
  const [userProfile, setUserProfile] = useState();

  return (
    <stateContext.Provider
      value={{ account, provider, myContract, userProfile }}
    >
      <stateUpdateContext.Provider
        value={{ setAccount, setProvider, setMyContract, setUserProfile }}
      >
        {children}
      </stateUpdateContext.Provider>
    </stateContext.Provider>
  );
};

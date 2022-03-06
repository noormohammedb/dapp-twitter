import { useState, useContext, createContext } from "react";

const stateContext = createContext();
const stateUpdateContext = createContext();

export const useMyState = () => useContext(stateContext);
export const setMyState = () => useContext(stateUpdateContext);

export const StatesProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [provider, setProvider] = useState();

  return (
    <stateContext.Provider value={[account, provider]}>
      <stateUpdateContext.Provider value={[setAccount, setProvider]}>
        {children}
      </stateUpdateContext.Provider>
    </stateContext.Provider>
  );
};

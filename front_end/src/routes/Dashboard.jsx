import React from "react";
import { useMyState, setMyState } from "../StatesContext";

const Dashboard = () => {
  const { account } = useMyState();
  const { setAccount } = setMyState();

  const logoutAccount = () => {
    setAccount();
  };

  return (
    <>
      <div className="">Dashboard</div>
      {account?.length > 0 ? (
        <>
          <div className="acc">{account}</div>
          <button onClick={logoutAccount}>Logout</button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;

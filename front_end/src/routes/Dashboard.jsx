import React from "react";
import { useMyState } from "../StatesContext";
import CreateTweet from "../components/CreateTweet";
import GlobalTweets from "../components/GlobalTweets";
import Singup from "./Singup";

const Dashboard = () => {
  const { account } = useMyState();

  return (
    <>
      <div className="">Dashboard</div>
      {console.log("rendering Dashboard")}
      {account?.length > 0 ? (
        <>
          <CreateTweet />
          <GlobalTweets />
        </>
      ) : (
        <>
          <Singup />
        </>
      )}
    </>
  );
};

export default Dashboard;

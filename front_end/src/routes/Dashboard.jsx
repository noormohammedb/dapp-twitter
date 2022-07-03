import React from "react";
import { useMyState } from "../StatesContext";
import CreateTweet from "../components/CreateTweet";
import GlobalTweets from "../components/GlobalTweets";
import Singup from "./Singup";

const Dashboard = () => {
  // const { account } = useMyState();
  const account = window.localStorage.getItem("address");

  return (
    <>
      <div className="flex flex-col items-center m-10 p-4">
        {console.log("rendering Dashboard")}
        {account?.length > 0 ? (
          <>
            <CreateTweet />
            <div className="w-fit">
              <GlobalTweets />
            </div>
          </>
        ) : (
          <>
            <Singup />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;

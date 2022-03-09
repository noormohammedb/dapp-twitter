import React, { useEffect, useState } from "react";
import { useMyState, setMyState } from "../StatesContext";
import formatTweet from "../utils/formateTweet";

const GlobalTweets = () => {
  const { account, globalTweets, myContractProvider } = useMyState();
  const { setAccount, setGlobalTweets } = setMyState();

  const logoutAccount = () => {
    setAccount();
  };

  useEffect(async () => {
    const myTweets = await myContractProvider.listAllTweets();
    console.log("myTweets: ", myTweets);

    setGlobalTweets(myTweets.map(formatTweet).reverse());
  }, []);
  return (
    <>
      <div className="acc">address : {account}</div>
      <div className="contract">contract : {myContractProvider?.address}</div>

      {console.log("global tweets render")}

      {globalTweets.map((tweet, index) => (
        <p key={index}> {JSON.stringify(tweet)} </p>
      ))}

      <button onClick={logoutAccount}>Logout</button>
    </>
  );
};

export default GlobalTweets;

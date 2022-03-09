import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useMyState, setMyState } from "../StatesContext";

const GlobalTweets = () => {
  const { account, myContractProvider } = useMyState();
  const { setAccount } = setMyState();
  const [tweets, setTweets] = useState([]);

  const logoutAccount = () => {
    setAccount();
  };

  useEffect(async () => {
    const myTweets = await myContractProvider.listAllTweets();
    console.log("myTweets: ", myTweets);

    myTweets.forEach(async (singleTweet, index) => {
      console.log("singleTweet: ", singleTweet);

      setTweets((prevTweets) => {
        console.log("singleTweet.content: ", singleTweet.content);
        let tempTimeStamp = Number(
          ethers.utils.formatUnits(singleTweet.timestamp, 0) * 1000
        );
        return [
          ...prevTweets,
          {
            tweetId: ethers.utils.formatUnits(singleTweet.tweetId, 0),
            content: singleTweet.content,
            timeStamp: tempTimeStamp,
            userId: ethers.utils.formatUnits(singleTweet.userId, 0),
            timeStampFormated: new Date(tempTimeStamp).toLocaleString(),
          },
        ];
      });
    });
  }, []);
  return (
    <>
      <div className="acc">address : {account}</div>
      <div className="contract">contract : {myContractProvider?.address}</div>

      {console.log("global tweets render")}

      {tweets.map((tweet, index) => (
        <p key={index}> {JSON.stringify(tweet)} </p>
      ))}

      <button onClick={logoutAccount}>Logout</button>
    </>
  );
};

export default GlobalTweets;

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useMyState, setMyState } from "../StatesContext";

const Dashboard = () => {
  const { account, myContractProvider } = useMyState();
  const { setAccount } = setMyState();
  const [tweets, setTweets] = useState([]);

  useEffect(async () => {
    console.log("Dashboard");
    console.log("account: ", account);

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

  const logoutAccount = () => {
    setAccount();
  };

  console.log("tweets: ", tweets);

  return (
    <>
      <div className="">Dashboard</div>
      {console.log("rendering Dashboard")}
      {account?.length > 0 ? (
        <>
          <div className="acc">address : {account}</div>
          <div className="contract">
            contract : {myContractProvider?.address}
          </div>
          {tweets.map((tweet, index) => (
            <p key={index}> {JSON.stringify(tweet)} </p>
          ))}
          <button onClick={logoutAccount}>Logout</button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;

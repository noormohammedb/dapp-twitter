import React, { useState } from "react";
import { useMyState, setMyState } from "../StatesContext";
import formatTweet from "../utils/formateTweet";
import { AnimationLoading } from "./utilComponents/AnimationLoading";

const CreateTweet = () => {
  const [tweetContent, setTweetContend] = useState("");
  const [waiting, setWaiting] = useState(false);
  const { myContractSigner } = useMyState();
  const { setGlobalTweets } = setMyState();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("handle click");

    console.log("tweetContent: ", tweetContent);

    setWaiting(true);
    const newTweetTx = await myContractSigner.createTweet(tweetContent);
    // console.log("newTweetTx: ", newTweetTx);
    const txComp = await newTweetTx.wait();
    // console.log("txComp: ", txComp);
    const newTweetInBlockchain = txComp.events[0].args;
    // console.log("newTweetInBlockchain: ", newTweetInBlockchain);
    console.log("New Tweet Sucess");
    setGlobalTweets((old) => [formatTweet(newTweetInBlockchain), ...old]);
    setTweetContend("");
    setWaiting(false);
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Tweet Content"
          disabled={waiting}
          value={tweetContent}
          onChange={(e) => setTweetContend(e.target.value)}
        />
        <button onClick={handleClick}>Tweet</button>
        {waiting ? <AnimationLoading /> : ""}
      </form>
    </>
  );
};

export default CreateTweet;

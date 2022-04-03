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
      <div className="p-2 border-2 rounded w-96">
        <form className="flex justify-between">
          <input
            type="text"
            placeholder="Tweet Content"
            disabled={waiting}
            value={tweetContent}
            onChange={(e) => setTweetContend(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="text-blue-700 border border-blue-500 hover:bg-blue-200 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 px-3 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            Tweet
          </button>
          {waiting ? <AnimationLoading /> : ""}
        </form>
      </div>
    </>
  );
};

export default CreateTweet;

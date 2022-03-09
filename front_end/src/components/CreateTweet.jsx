import React, { useState } from "react";
import { useMyState, setMyState } from "../StatesContext";
import formatTweet from "../utils/formateTweet";

const CreateTweet = () => {
  const [tweetContent, setTweetContend] = useState("");
  const [waiting, setWaiting] = useState(false);
  const { account, myContractSigner } = useMyState();
  const { setAccount, setGlobalTweets } = setMyState();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("handle click");

    console.log("tweetContent: ", tweetContent);

    setWaiting(true);
    const newTweetTx = await myContractSigner.createTweet(tweetContent);
    console.log("newTweetTx: ", newTweetTx);
    const txComp = await newTweetTx.wait();
    console.log("txComp: ", txComp);
    const newTweetInBlockchain = txComp.events[0].args;
    console.log("newTweetInBlockchain: ", newTweetInBlockchain);
    console.log("New Tweet Sucess");
    setTweetContend("");
    setGlobalTweets((old) => [formatTweet(newTweetInBlockchain), ...old]);
    setWaiting(false);

    // setAccount("");
    // setAccount(account);
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
      </form>
    </>
  );
};

export default CreateTweet;

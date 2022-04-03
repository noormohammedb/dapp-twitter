import React, { useEffect, useRef } from "react";
import { useMyState, setMyState } from "../StatesContext";
import formatTweet from "../utils/formateTweet";

const GlobalTweets = () => {
  const { account, globalTweets, myContractProvider } = useMyState();
  const { setAccount, setGlobalTweets } = setMyState();
  const isMounted = useRef();

  const logoutAccount = () => {
    setAccount();
  };

  useEffect(() => {
    isMounted.current = true;
    myContractProvider && loadTweets();
    return () => (isMounted.current = false);
  }, [myContractProvider]);

  const loadTweets = async () => {
    const myTweets = await myContractProvider.listAllTweets();
    console.log("myContractProvider: in GlobalTweets ", myContractProvider);
    console.log("myTweets: ", myTweets);
    if (isMounted.current) {
      setGlobalTweets(myTweets.map(formatTweet));
    }
  };

  console.log("global tweets render");
  const profileImage =
    "https://ipfs.fleek.co/ipfs/bafybeibaqmi2zntxu7gcllhloxj4vldzw4esthdy5tcsu2pdt5mmoe2sxq";
  return (
    <>
      <div className="my-5 p-4 border-2 rounded w-96">
        {/* <div className="acc">address : {account}</div>
      <div className="contract">contract : {myContractProvider?.address}</div> */}

        {globalTweets.map((tweet, index) => (
          <div
            className="flex space-x-3 py-8 pt-2 p-2 my-1 border-t-1 border-b-2 border-slate-300 max-w-3xl w-full hover:bg-gray-50 hover:shadow-sm"
            key={index}
          >
            <img
              className="h-9 w-9 rounded-full ring-2 ring-blue-100"
              src={profileImage}
              alt="profile picture"
            />
            <div className="flex-1 space-y-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="">
                  <h3 className="text-sm font-bold">{tweet.userId}</h3>
                  <p className="text-gray-500 text-sm">{""}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {tweet?.timestamp?.slice(5, 10) +
                    " " +
                    tweet?.timestamp?.slice(12, 16)}
                </p>
              </div>
              <p className="text-base text-gray-800 line-clamp-4 break-all">
                {tweet.content?.replace(/(<([^>]+)>)/gi, "")}
                {/* {pubContent} */}
              </p>
            </div>
          </div>
        ))}

        <button onClick={logoutAccount}>Logout</button>
      </div>
    </>
  );
};

export default GlobalTweets;

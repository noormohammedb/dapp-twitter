import { ethers } from "ethers";

const formatTweet = (tweet) => {
  let tempTimeStamp = Number(
    ethers.utils.formatUnits(tweet.timestamp, 0) * 1000
  );
  return {
    tweetId: ethers.utils.formatUnits(tweet.tweetId, 0),
    content: tweet.content,
    timeStamp: tempTimeStamp,
    userId: ethers.utils.formatUnits(tweet.userId, 0),
    timeStampFormated: new Date(tempTimeStamp).toLocaleString(),
  };
};

export default formatTweet;

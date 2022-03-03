//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.12;

contract Twitter {
    struct User {
        uint256 userId;
        string name;
        string imageUrl;
        bool isActive;
        // Tweet[] userTweet;
    }
    struct Tweet {
        uint256 tweetId;
        string content;
        uint256 timestamp;
        uint256 userId;
        // address userAddress;
    }

    struct TweetComment {
        uint256 commentId;
        address whosComment;
        uint256 tweetId;
        uint256 timestamp;
        string comment;
    }

    mapping(address => uint256[]) public tweetIndex;
    mapping(address => User) public users;
    address[] public userAddressList;
    uint256 public globalUserId = 1;
    Tweet[] public tweets;
    uint256 public globalTweetId = 0;

    function signup(string memory _name, string memory _url)
        external
        returns (uint256 id)
    {
        require(!users[msg.sender].isActive, "you are alredy signed up");
        require(bytes(_name).length > 0, "Please write name before submit");
        require(bytes(_url).length > 0, "Link IFPS Error");
        users[msg.sender] = User({
            userId: globalUserId,
            name: _name,
            imageUrl: _url,
            isActive: true
        });
        userAddressList.push(msg.sender);
        id = globalUserId++;
    }

    function myProfile() external view returns (User memory) {
        return users[msg.sender];
    }

    function createTweet(string memory _tweetContent) external {
        require(users[msg.sender].isActive, "Please signup before tweet");
        require(
            bytes(_tweetContent).length > 0,
            "Please write tweet before submit"
        );
        uint256 _userId = users[msg.sender].userId;
        tweetIndex[msg.sender].push(globalTweetId);
        tweets.push(
            Tweet({
                tweetId: globalTweetId++,
                content: _tweetContent,
                timestamp: block.timestamp,
                userId: _userId
                // userAddress: msg.sender
            })
        );
    }

    function listAllTweets() external view returns (Tweet[] memory) {
        return tweets;
    }

    function listUserTweets() external view returns (Tweet[] memory) {
        uint256[] memory userTweetIndexs = tweetIndex[msg.sender];
        Tweet[] memory userTweets = new Tweet[](userTweetIndexs.length);
        for (uint256 i = 0; i < userTweetIndexs.length; i++) {
            userTweets[i] = tweets[userTweetIndexs[i]];
        }
        return userTweets;
    }

    // function listUserTweets() external view returns (Tweet[] memory) {
    //     // uint256 _userId = users[msg.sender].userId;
    //     uint256[] memory _tweetIndex = tweetIndex[msg.sender];
    //     Tweet[] memory _tweets = new Tweet[](_tweetIndex.length);
    //     for (uint256 i = 0; i < _tweetIndex.length; i++) {
    //         _tweets[i] = tweets[_tweetIndex[i]];
    //     }
    //     return _tweets;
    // }

    // event UserTweetListEvent(
    //     uint256 tweetId,
    //     string content,
    //     uint256 timestamp,
    //     uint256 userId
    //     // address userAddress
    // );

    // function listUserTweets() external payable returns (Tweet[] memory) {
    // function listUserTweets() external {
    // require(users[msg.sender].isActive , "Please signup before list your tweets");
    // uint256[] memory userTweetIndex = tweetIndex[msg.sender];
    // uint256 tweetIndexArrayLenth = getCount(tweetIndex[msg.sender]);
    // Tweet[] memory userTweetsArray = new Tweet[](tweetIndexArrayLenth);
    // for (uint256 i = 0; i <= globalTweetId; i++) {
    // uint256 j = tweetIndex[msg.sender][i];
    // userTweetsArray[i] = tweets[j];
    // uint256 j = 0;
    // emit UserTweetListEvent(
    //     tweets[j].tweetId,
    //     tweets[j].content,
    //     tweets[j].timestamp,
    //     tweets[j].userId
    //     // tweets[j].userAddress
    // );
    // }

    // return userTweetsArray;
    // }

    // function getCount(uint256[] memory array)
    //     internal
    //     pure
    //     returns (uint256 count)
    // {
    //     return array.length;
    // }
}

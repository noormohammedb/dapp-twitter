import React from "react";

const CreateTweet = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("handle click");
  };

  return (
    <>
      <form>
        <input type="text" placeholder="Tweet Content" />
        <button onClick={handleClick}>Tweet</button>
      </form>
    </>
  );
};

export default CreateTweet;

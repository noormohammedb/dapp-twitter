import React from "react";

const SignupForm = () => {
  return (
    <>
      <form>
        <input type="text" name="userName" placeholder="Name" />
        <input type="text" name="imageUrl" placeholder="Ipfs Link Of Image" />
      </form>
    </>
  );
};

export default SignupForm;

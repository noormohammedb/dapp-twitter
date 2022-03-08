import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyState } from "../StatesContext";

const SignupForm = () => {
  const [userName, setUserName] = useState("");
  const [imageLink, setImageLink] = useState("https://loremflickr.com/320/240");
  const { myContractSigner } = useMyState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    // console.log("myContractSigner: ", myContractSigner);
    const signupTransaction = await myContractSigner.signup(
      userName,
      imageLink
    );
    console.log("signupTransaction: ", signupTransaction);
    await signupTransaction.wait();
    console.log("signup success");
    navigate("/dashboard");
  };

  console.log("userName: ", userName);

  return (
    <>
      <h3>You Are Not SignedUp. Please Signup</h3>
      <form>
        <input
          type="text"
          name="userName"
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        {/* <input type="text" name="imageUrl" placeholder="Ipfs Link Of Image" /> */}
        <button onClick={handleSubmit}>submit</button>
      </form>
    </>
  );
};

export default SignupForm;

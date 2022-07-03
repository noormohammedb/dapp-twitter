import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyState } from "../StatesContext";
import { AnimationLoading } from "./utilComponents/AnimationLoading";

const SignupForm = () => {
  const [userName, setUserName] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [imageLink, setImageLink] = useState("https://loremflickr.com/320/240");
  const { myContractSigner } = useMyState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName) return;
    console.log("handleSubmit");
    // console.log("myContractSigner: ", myContractSigner);
    const signupTransaction = await myContractSigner.signup(
      userName,
      imageLink
    );
    setWaiting(true);
    console.log("signupTransaction: ", signupTransaction);
    await signupTransaction.wait();
    console.log("signup success");
    setWaiting(false);
    navigate("/dashboard");
  };

  return (
    <>
      <h3>You Are Not SignedUp. Please Signup</h3>
      <form>
        <input
          type="text"
          name="userName"
          placeholder="Name"
          className="border border-gray-200 text-lg text-left mr-2 mb-2 bg-gray-200 hover:bg-gray-250 text-gray-800 font-bold py-2 px-4 rounded-xl"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        {/* <input type="text" name="imageUrl" placeholder="Ipfs Link Of Image" /> */}
        <button
          onClick={handleSubmit}
          className="border-4 py-2 px-4 rounded-lg"
        >
          submit
        </button>
        {waiting ? <AnimationLoading /> : ""}
      </form>
    </>
  );
};

export default SignupForm;

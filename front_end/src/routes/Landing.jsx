import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="flex items-center justify-evenly min-h-screen">
        <div className="">
          <img
            className="w-40 "
            src="https://res.cloudinary.com/gameovermarinehubby/image/upload/v1655302968/icon-ios.b1fc7275_vuf5dz.png"
            alt="Decentalised twitter"
          />
        </div>
        <div className=""></div>
        <div className="second">
          <Link
            to="/signup"
            className="underline text-indigo-900 hover:text-violet-800"
          >
            &nbsp; singup/login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;

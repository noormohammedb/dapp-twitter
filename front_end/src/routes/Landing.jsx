import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="flex items-center justify-evenly min-h-screen">
        <div className="">
          <img
            className="w-40 "
            src="https://abs.twimg.com/responsive-web/client-web-legacy/icon-ios.b1fc7275.png"
            alt="Decentalised twitter"
          />
        </div>
        <div className=""></div>
        <div className="second">
          <Link
            to="/signup"
            className="underline text-indigo-600 hover:text-indigo-900"
          >
            &nbsp; singup/login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;

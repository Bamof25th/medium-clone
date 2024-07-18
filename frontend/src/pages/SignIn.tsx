import Auth from "../components/Auth";
import Quotes from "../components/Quotes";

const SignIn = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
          <Auth type={"signin"} />
        </div>
        <div>
          <Quotes />
        </div>
      </div>
    </>
  );
};

export default SignIn;

import Auth from "../components/Auth";
import Quotes from "./../components/Quotes";

function Signup() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
          <Auth type={"signup"} />
        </div>
        <div>
          <Quotes />
        </div>
      </div>
    </>
  );
}

export default Signup;

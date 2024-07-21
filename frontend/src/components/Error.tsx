import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <p className="mb-4 text-7xl tracking-tight font-extrabold text-slate-700 ">
              Login to Access
            </p>

            <Link
              to="/signin"
              className="inline-flex text-white bg-slate-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4"
            >
              Back to SignIn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;

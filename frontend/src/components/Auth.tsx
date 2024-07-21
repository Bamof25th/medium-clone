import { SignupInput } from "@aniketbaghel/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./../config";
import toast from "react-hot-toast";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const responce = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = responce.data.jwt;
      localStorage.setItem("token", jwt);
      if (responce) {
        toast.success("Successfully Loggedin!");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Inputs");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center ">
      <div className="flex justify-center ">
        <div className="w-[39vw] md:max-w-[20vw]">
          <div className="mb-4">
            <p className="text-4xl flex-wrap font-bold  text-center">
              {type === "signup"
                ? " Create an account      "
                : " Login to your account "}
            </p>
            <p className="font-light text-slate-400 text-center">
              {type === "signup"
                ? " Already have an account?  "
                : " Dont have an account ?  "}
              <Link
                to={type === "signup" ? "/signin" : "/signup"}
                className="underline "
              >
                {type === "signup" ? "Login" : "Signup"}
              </Link>
            </p>
          </div>
          <div className="">
            {type === "signup" ? (
              <LabledInput
                type="text"
                lable="Name"
                placeHolder="Your Fullname"
                onChange={(e) =>
                  setPostInputs({ ...postInputs, name: e.target.value })
                }
              />
            ) : null}
            <LabledInput
              type="email"
              lable="Email"
              placeHolder="e-mail"
              onChange={(e) =>
                setPostInputs({ ...postInputs, email: e.target.value })
              }
            />
            <LabledInput
              type="password"
              lable="Password"
              placeHolder="password"
              onChange={(e) =>
                setPostInputs({ ...postInputs, password: e.target.value })
              }
            />

            <button
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5"
              onClick={sendRequest}
            >
              {type === "signup" ? "Sign up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface LabledInputType {
  type: string;
  lable: string;
  placeHolder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabledInput = ({
  type,
  lable,
  placeHolder,
  onChange,
}: LabledInputType) => {
  return (
    <div className="grid gap-1 mb-4">
      <label className="block mb-0.5 text-sm font-medium ">{lable}</label>
      <input
        type={type}
        id="email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeHolder}
        onChange={onChange}
        required
      />
    </div>
  );
};

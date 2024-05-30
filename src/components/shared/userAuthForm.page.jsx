import React, {  useEffect, useRef, useState } from "react";
import InputBox from "./input.component";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveToLocalStorage } from "../../lib/utils";
import { Loader } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useSession } from "../../context/SessionContext";

const UserAuthForm = ({ type, }) => {
  const authform = useRef(HTMLFormElement);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate()
  let { userAuth, setUserAuth, setShowModal } = useSession()

  
  const userAuthThroughServer = async (serverRoute, formData) => {
    try {
      setIsloading(true);
      const res = await axios.post(
        import.meta.env.VITE_API_URL + serverRoute,
        formData
      )

      if(res.data){
        // setShowModal(false)/
        saveToLocalStorage(res.data.data, "user");
        setUserAuth(res.data.data);
        authform.current.reset();
        setShowModal(false)
      }
    } catch (err) {
      if(err.response?.data?.msg){
      toast.error(err.response?.data?.msg);
      } 
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let serverRoute = type === "sign-in" ? "/signin" : "/signup";
    // regex for email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    let form = new FormData(e.target);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { username, password } = formData;

    if (!username || !password) {
      return toast.error("Please fill in the fields");
    }

    userAuthThroughServer(serverRoute, formData);
  };

  
  return userAuth.access_token ? (
    <Navigate to="/" />
  ) : (
    <>
    <div className="absolute">
    <Toaster position="top-center" />
    </div>
      <section className="h-screen bg-orange-500 flex items-center justify-center">
        <form
          ref={authform}
          className="w-[90%] bg-white shadow-2xl rounded-lg py-10 px-14 max-w-[600px]"
          action=""
          onSubmit={(e) => handleSubmit(e)}
          id="formElement"
        >
          <h1 className="text-4xl font-semibold capitalize mb-24 text-center">
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>
          {type !== "sign-in" ? (
            <InputBox
              disabled={isLoading}
              id={"fullname"}
              name={"fullname"}
              type={"text"}
              placeholder={"Full Name"}
              icon={"user"}
            />
          ) : null}

          <InputBox
            disabled={isLoading}
            id={"username"}
            name={"username"}
            type={"username"}
            placeholder={"Username"}
            icon={"username"}
          />
          <InputBox
            disabled={isLoading}
            id={"password"}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            icon={"password"}
          />

          <button
            disabled={isLoading}
            className="btn-dark center relative disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-opacity-100 flex items-center justify-center gap-3 mt-14 w-full"
            type="submit"
          >
            {isLoading && (
              <div className="absolute left-5">
                <Loader className="animate-spin" />
              </div>
            )}
            <div className="">{type.replace(/\-/g, " ")}</div>
          </button>

          

        </form>
      </section>
    </>
  );
};

export default UserAuthForm;

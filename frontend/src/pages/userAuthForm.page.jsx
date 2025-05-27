import { useRef, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";

const UserAuthForm = ({ type }) => {
  const authForm = useRef(null);
  const navigate = useNavigate();
  const { userAuth: { access_token }, setUserAuth } = useContext(UserContext);
  const [redirectNow, setRedirectNow] = useState(false);

  // Redirect to home only once after successful login
  useEffect(() => {
    if (redirectNow && access_token) {
      navigate("/");
    }
  }, [redirectNow, access_token]);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data); // Triggers re-render
        setRedirectNow(true); // Triggers redirect only once
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serverRoute = type === "sign in" ? "/signin" : "/signup";
    if (!authForm.current) return;

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const form = new FormData(authForm.current);
    const formData = Object.fromEntries(form.entries());
    const { fullname, email, password } = formData;

    if (type !== "sign in" && (!fullname || fullname.length < 3)) {
      return toast.error("Full name must be at least 3 letters long");
    }
    if (!email) return toast.error("Please enter email");
    if (!emailRegex.test(email)) return toast.error("Enter a valid email");
    if (!passwordRegex.test(password)) {
      return toast.error("Password must be 6–20 chars, with a digit, 1 lowercase and 1 uppercase letter");
    }

    userAuthThroughServer(serverRoute, formData);
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form ref={authForm} onSubmit={handleSubmit} className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign in" ? "Welcome back" : "Join us today"}
          </h1>

          {type !== "sign in" && (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-users"
            />
          )}
          <InputBox name="email" type="email" placeholder="Email ID" icon="fi-rr-envelope" />
          <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-lock" />

          <button className="btn-dark center mt-14" type="submit">
            {type}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button type="button" className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
            <img src={googleIcon} className="w-5" alt="Google Icon" />
            Continue with Google
          </button>

          {type === "sign in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">Join us today.</Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link to="/signin" className="underline text-black text-xl ml-1">Sign in here.</Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;

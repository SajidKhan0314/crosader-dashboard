import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

// Base Url
import customAxios from "../../config/config";

// Components
import Input from "../../components/reusableui/Input";

// Context
import AuthContext from "../../contexts/AuthContext";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  // Auth Context
  const { token, setToken, authenticated, setAuthenticated } =
    useContext(AuthContext);

  // next router
  const router = useRouter();

  useEffect(() => {
    if (token && authenticated) {
      router.push("/projects");
    }
  });

  // Form submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setIsloading(true);

    customAxios
      .post("users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setAuthenticated(true);
        // setIsloading(false);
      })
      .catch((err) => {
        setIsloading(false);
        setError("Unable to authenticate!");
      });
  };

  return (
    <section className=" bg-gray-50 px-4 pb-4 h-screen">
      {isloading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <div className="flex items-center justify-center flex-col ">
        {/* Logo */}
        <div className="mt-10">
          <Image src={"/logo.svg"} width={64} height={64} alt="Logo" />
        </div>
        {/* Login*/}
        <div className="mt-5 max-w-[600px] rounded-lg bg-white w-full px-6 sm:px-16 pt-10 auth-modal-shadow pb-[100px]">
          <h1 className="text-gray-800 text-xl md:text-3xl lg:text-4xl leading-9 font-bold">
            Hi, Welcome Back!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-10">
              <Input
                name={"email"}
                label="Email address"
                value={email}
                onChangeHandler={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="mt-5">
              <Input
                name={"password"}
                label="Password"
                value={password}
                onChangeHandler={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            {error && (
              <p className={"text-red-500 mt-2 text-center italic"}>{error}</p>
            )}
            <button
              // onClick={() => router.push("/projects")}
              className="py-3 sm:text-base text-sm mt-10 hover:bg-purple-600 text-white font-semibold w-full text-center rounded-lg bg-purple-700"
            >
              Sign In
            </button>
          </form>
          <div className="w-full text-center mt-4">
            <p className="text-gray-500 sm:text-base text-sm font-semibold leading-4">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-purple-700 hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;

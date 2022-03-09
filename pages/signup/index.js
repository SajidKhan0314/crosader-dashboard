import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

// Components
import Input from "../../components/reusableui/Input";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // next router
  const router = useRouter();

  // Form submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className=" bg-gray-50 px-4 pb-4 ">
      <div className="flex items-center justify-center flex-col ">
        {/* Logo */}
        <div className="mt-10">
          <Image src={"/logo.svg"} width={64} height={64} />
        </div>
        {/* Login*/}
        <div className="mt-5 max-w-[600px] rounded-lg bg-white w-full px-6 sm:px-16 pt-16 auth-modal-shadow pb-[65px]">
          <h1 className="text-gray-800 text-xl md:text-3xl lg:text-4xl leading-9 font-bold">
            Get started its easy!
          </h1>
          {/* External provider buttons */}
          <div className="mt-7 flex justify-between w-full items-center">
            <button className="text-xs text-gray-800 font-semibold flex items-center justify-center max-w-[219px] w-full hover:bg-gray-100 gap-4 py-4 rounded-[50px] border border-[#E5E7EB]">
              <Image src="/googleLogo.svg" width={24} height={24} />
              Sign up with Google
            </button>
            <button className="text-xs text-gray-800 font-semibold flex items-center justify-center max-w-[219px] w-full hover:bg-gray-100 gap-4 py-4 rounded-[50px] border border-[#E5E7EB]">
              <Image src="/facebookLogo.svg" width={24} height={24} />
              Sign up with Facebook
            </button>
          </div>
          {/* Or */}
          <div className="w-full flex items-center gap-4 justify-center mt-8">
            <span className="max-w-[162px] w-full border-t border-[#E5E7EB]"></span>
            <p className="text-xs text-gray-600 leading-4">
              Or sign up with email
            </p>
            <span className="max-w-[162px] w-full border-t border-[#E5E7EB]"></span>
          </div>
          {/* Form */}
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
            <button className="py-3 sm:text-base text-sm mt-12 hover:bg-purple-600 text-white font-semibold w-full text-center rounded-lg bg-purple-700">
              Sign Up
            </button>
          </form>
          <div className="w-full text-center mt-4">
            <p className="text-gray-500 sm:text-base text-sm font-semibold leading-4">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-purple-700 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;

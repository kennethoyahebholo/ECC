import { Link, NavLink } from "react-router-dom";
import { Button, Input, Loader } from "../../components/widgets";
import { useState } from "react";
import {
  TPFacebookIcon,
  TPTwitterIcon,
  TPInstagramIcon,
} from "../../components/icons";
import { LOGIN } from "../../routes/CONSTANTS";

const SignupView = ({
  googleLogin,
  linkedLogin,
  microsoftLogin,
  loading,
  formik,
}) => {
  const [emailError, setEmailError] = useState("");

  // Validating User Email Provided On Mouse Leave
  const validateEmail = () => {
    if (formik.values.email) {
      const email = formik.values.email;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        setEmailError("Ensure a valid email is provided.");
      } else {
        setEmailError("");
      }
    }
  };

  return (
    <div className="flex w-full justify-center h-full p-[20px] lg:p-[40px] bg-slate-100">
      <div className="gap-10 grid grid-cols-1 w-full lg:max-w-2xl flex-wrap">
        <div className="bg-white p-8 h-full rounded-md">
          <div className="space-y-1">
            <p className="text-lg text-green-700 capitalize">About You</p>

            <div className="space-y-1 py-4">
              <h6 className="text-lg capitalize">
                Signup with social Accounts
              </h6>

              <div className="w-full flex items-center justify-start space-x-5">
                <button
                  onClick={googleLogin}
                  className="w-12 h-12 flex items-center justify-center rounded-md shadow-lg bg-white"
                >
                  {/* <img src="" className="w-6 h-6" alt="linkedin" /> */}
                  <TPFacebookIcon />
                </button>
                <button
                  onClick={microsoftLogin}
                  className="w-12 h-12 flex items-center justify-center rounded-md shadow-lg bg-white"
                >
                  {/* <img src="" className="w-6 h-6" alt="linkedin" /> */}
                  <TPTwitterIcon />
                </button>
                <button
                  onClick={linkedLogin}
                  className="w-12 h-12 flex items-center justify-center rounded-md shadow-lg bg-white"
                >
                  {/* <img src="" className="w-6 h-6" alt="linkedin" /> */}
                  <TPInstagramIcon />
                </button>
              </div>
            </div>
            <div className="my-2 w-full flex items-center">
              <div className="w-full h-px bg-gray-300 shadow" />
              <p className="px-5 text-base text-gray-300">Or</p>
              <div className="w-full h-px bg-gray-300 shadow" />
            </div>
            <h4 className="font-bold">Create an Account!</h4>
          </div>

          {/* <div className="w-full h-px my-5 bg-gray-100 shadow" /> */}
          <form onSubmit={formik.handleSubmit} className="space-y-3 mt-8">
            <div>
              <label htmlFor="fullName" className="block text-lg text-gray-300">
                Full Name
              </label>
              <Input
                size="lg"
                type="text"
                id="fullName"
                name="fullName"
                value={formik.values.fullName}
                placeholder="Enter your full name"
                onChange={formik.handleChange}
                onMouseLeave={() => validateEmail()}
                className="w-full"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-900 text-sm ">
                  {formik.errors.fullName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-lg text-gray-300">
                Email address
              </label>
              <Input
                size="lg"
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                placeholder="Enter email address"
                onChange={formik.handleChange}
                onMouseLeave={() => validateEmail()}
                className="w-full"
              />
              {formik.touched.email && formik.errors.password && (
                <p className="text-red-900 text-sm ">{formik.errors.email}</p>
              )}
              {emailError && (
                <p className="text-red-900 text-sm ">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-lg text-gray-300">
                Password
              </label>
              <Input
                size="lg"
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                autoComplete="on"
                className="w-full"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-900 text-sm ">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <Input
                  id="terms"
                  name="terms"
                  onChange={formik.handleChange}
                  size="sm"
                  type="checkbox"
                  className="accent-green"
                />
                <p className="capitalize text-[16px] text-gray-400">
                  I agree to{" "}
                  <Link to="" className="text-green-600 hover:text-green-700">
                    terms & condition
                  </Link>
                </p>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <p className="text-red-900 text-sm">{formik.errors.terms}</p>
              )}
            </div>
            <div className="my-2 w-full flex items-center">
              <span>
                Already have an account?{" "}
                <NavLink to={LOGIN}>
                  <span className="text-green-600">login</span>
                </NavLink>
              </span>
            </div>
            <Button
              size="lg"
              type="submit"
              variant="full-green"
              className="w-full flex items-center justify-center bg-green-600 text-lg hover:bg-green-700 max-h-[59px] transition-colors duration-700"
            >
              {!loading ? <Loader /> : "Signup"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupView;

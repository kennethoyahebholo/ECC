import { Link } from "react-router-dom";
import { SIGNUP } from "../../routes/CONSTANTS";
import { Button, Input, Loader } from "../../components/widgets";
import { useState } from "react";

const LoginView = ({ loading, formik }) => {
  const [emailError, setEmailError] = useState("");

  // Validating User Email Provided On Mouse Leave
  const validateEmail = () => {
    if (formik?.values.email) {
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
      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 w-full lg:max-w-5xl flex-wrap">
        <div className="bg-transparent md:bg-white p-0 md:p-8 h-full rounded-md">
          <div className="space-y-1">
            <p className="text-lg text-green-700 capitalize">
              Existing customers
            </p>
            <h4 className="font-bold">Login your Account!</h4>
          </div>

          {/* <div className="w-full h-px my-5 bg-gray-100 shadow" /> */}
          <form onSubmit={formik?.handleSubmit} className="space-y-3 mt-8">
            <div>
              <label htmlFor="email" className="block text-lg text-gray-300">
                Email address
              </label>
              <Input
                size="lg"
                type="email"
                id="email"
                name="email"
                value={formik?.values.email}
                placeholder="Enter email address"
                onChange={formik?.handleChange}
                onMouseLeave={() => validateEmail()}
                className="w-full"
              />
              {formik?.touched.email && formik?.errors.password && (
                <p className="text-red-900 text-sm ">{formik?.errors.email}</p>
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
                onChange={formik?.handleChange}
                autoComplete="on"
                className="w-full"
              />
              {formik?.touched.password && formik?.errors.password && (
                <p className="text-red-900 text-sm ">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link
                to=""
                className="text-sm md:text-lg text-green-600 hover:text-green"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              size="lg"
              type="submit"
              variant="full-green"
              className="w-full flex items-center justify-center bg-green-600 text-lg hover:bg-green-700 max-h-[59px] transition-colors duration-700"
            >
              {!loading ? <Loader /> : "Login"}
            </Button>
          </form>
          <div className="my-2 w-full flex items-center">
            <div className="w-full h-px bg-gray-300 shadow" />
            <p className="px-5 text-base text-gray-300">Or</p>
            <div className="w-full h-px bg-gray-300 shadow" />
          </div>
        </div>
        <div className="bg-white p-8 rounded-md h-[200px]">
          <h3>Don't have an account? </h3>
          <p className="my-5 text-lg text-gray-200 text-center">
            <Link to={SIGNUP}>
              <Button
                size="lg"
                variant="full-green"
                type="submit"
                className="w-full flex items-center justify-center bg-slate-300 text-lg hover:bg-slate-500 transition-colors duration-700"
              >
                {!loading ? <Loader /> : "Create An Account"}
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

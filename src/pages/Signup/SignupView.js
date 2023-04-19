import { Link, NavLink } from "react-router-dom";
import { Button, Input, Loader, FormSelect } from "../../components/widgets";
import { useState } from "react";
import { LOGIN } from "../../routes/CONSTANTS";

const SignupView = ({
  googleLogin,
  linkedLogin,
  microsoftLogin,
  loading,
  formik,
}) => {
  const [emailError, setEmailError] = useState("");
  const industriesList = [
    {
      value: "",
      title: "Select Role",
    },
    {
      value: "admin",
      title: "Admin",
    },
    {
      value: "store-manager",
      title: "Store Manager",
    },
    {
      value: "staff",
      title: "Staff",
    },
    {
      value: "customer",
      title: "Customer",
    },
  ];

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
        <div className="bg-transparent md:bg-white p-0 md:p-8 h-full rounded-md">
          <div className="space-y-1">
            <p className="text-lg text-green-700 capitalize">About You</p>

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
                First Name
              </label>
              <Input
                size="lg"
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                placeholder="Enter your first name"
                onChange={formik.handleChange}
                onMouseLeave={() => validateEmail()}
                className="w-full"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-900 text-sm ">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-lg text-gray-300">
                Last Name
              </label>
              <Input
                size="lg"
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                placeholder="Enter your last name"
                onChange={formik.handleChange}
                onMouseLeave={() => validateEmail()}
                className="w-full"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-900 text-sm ">
                  {formik.errors.lastName}
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
              <label htmlFor="lastName" className="block text-lg text-gray-300">
                Phone Number
              </label>
              <Input
                size="lg"
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onMouseLeave={() => validateEmail()}
                className="w-full"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-900 text-sm ">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>
            <div>
              <FormSelect
                required
                size="lg"
                id="role"
                name="role"
                options={industriesList}
                label="Role"
                placeholder="Select Your Role"
                errors={formik.errors.role}
                touched={formik.touched.role}
                onChange={formik.handleChange}
              />
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
                autoComplete="off"
                className="w-full"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-900 text-sm ">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-lg text-gray-300"
              >
                Confirm Password
              </label>
              <Input
                size="lg"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                autoComplete="off"
                className="w-full"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-900 text-sm ">
                    {formik.errors.confirmPassword}
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

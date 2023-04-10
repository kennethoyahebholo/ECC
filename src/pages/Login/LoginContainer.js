import * as Yup from "yup";
import {
  GOOGLE_END_POINT,
  LINKED_IN_END_POINT,
  MICROSOFT_END_POINT,
} from "../../services/CONSTANTS";
// import { useEffect } from "react";
import { useFormik } from "formik";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

import { Auth } from "../../components/layouts";
// import { HOME, SIGNUP_BUSINESS } from "routes/CONSTANTS";
// import { confirmAccount, login, loginSuccess } from "redux/slices/auth.slice";
// import { useAppDispatch, useAppSelector, useQuery } from "hooks";
// import { GOOGLE_END_POINT, LINKED_IN_END_POINT, MICROSOFT_END_POINT } from "services/CONSTANTS";

import LoginView from "./LoginView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/auth.slice";
import { DASHBOARD, HOME } from "../../routes/CONSTANTS";
import { useQuery } from "../../hooks";
import { toast } from "react-toastify";

export const LoginContainer = () => {
  //   const { confirmationCode } = useParams();
  //   const { isLoading } = useAppSelector((state) => state.auth);

  //   useEffect(() => {
  //     const queryString = query.get("redirect");
  //     if (queryString) {
  //       if (queryString === "success") {
  //         void dispatch(loginSuccess());
  //       } else {
  //         const errorMessage = query.get("error");
  //         if (errorMessage) {
  //           if (errorMessage?.length > 0 && errorMessage !== "undefined") {
  //             toast.error(errorMessage);
  //           }
  //         }
  //       }
  //     }
  //   }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      remember: Yup.boolean(),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Weak Password. Password must have at least: 1 upper case, 1 digit, 1 special character, Minimum eight in length"
        ),
    }),
    onSubmit: (details) => {
      console.log(details);
      void dispatch(login(details))
        .unwrap()
        .then((resp) => {
          console.log("hiiiii", resp);
          const redirect = query.get("redirect");
          if (redirect) {
            //  redirect to absolute URL - possibly initiated from VC app
            if (redirect.startsWith("http")) {
              return window.location.replace(redirect);
            }
            navigate(`../${redirect}`, { replace: true });
          } else if (resp?.status === 200) {
            toast.success("login successfully, navigating to dashboard");
            navigate(DASHBOARD);
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
  });

  //   useEffect(() => {
  //     if (confirmationCode !== undefined) {
  //       dispatch(confirmAccount(confirmationCode))
  //         .unwrap()
  //         .then(({ userId, email }) => {
  //           if (query.get("next") === "onboarding") {
  //             navigate(
  //               `${SIGNUP_BUSINESS}?owner=${userId as string}&next=onboarding&user_email=${email}`
  //             );
  //           } else {
  //             void formik.setValues({ ...formik.values, email });
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }, []);

  const googleLogin = () => {
    window.open(GOOGLE_END_POINT, "_self");
  };
  const microsoftLogin = () => {
    window.open(MICROSOFT_END_POINT, "_self");
  };
  const linkedLogin = () => {
    window.open(LINKED_IN_END_POINT, "_self");
  };

  return (
    <Auth reverse>
      <LoginView
        formik={formik}
        loading={() => {}}
        googleLogin={googleLogin}
        microsoftLogin={microsoftLogin}
        linkedLogin={linkedLogin}
      />
    </Auth>
  );
};

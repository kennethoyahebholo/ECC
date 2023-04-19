import * as Yup from "yup";
import { ECC_USER_DATA } from "../../services/CONSTANTS";
import { useFormik } from "formik";

import { Auth } from "../../components/layouts";

import LoginView from "./LoginView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/auth.slice";
import { DASHBOARD, HOME } from "../../routes/CONSTANTS";
import { useQuery } from "../../hooks";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export const LoginContainer = () => {
  const userToken = JSON.parse(localStorage.getItem(ECC_USER_DATA));
  const decodedToken = jwt_decode(userToken ? userToken : "");

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
      const userRole = decodedToken.role;
      console.log(details);
      void dispatch(login(details))
        .unwrap()
        .then((resp) => {
          const redirect = query.get("redirect");
          if (redirect) {
            //  redirect to absolute URL - possibly initiated from VC app
            if (redirect.startsWith("http")) {
              return window.location.replace(redirect);
            }
            navigate(`../${redirect}`, { replace: true });
          } else if (resp?.status === 200) {
            toast.success("login successfully, navigating to dashboard");
            if (userRole === "customer") {
              navigate(HOME);
              // window.location.reload();
            } else {
              navigate(DASHBOARD);
              // window.location.reload();
            }
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Auth reverse>
      <LoginView formik={formik} loading={() => {}} />
    </Auth>
  );
};

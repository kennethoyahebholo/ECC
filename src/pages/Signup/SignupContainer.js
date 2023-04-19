import { Auth } from "../../components/layouts";
import { useFormik } from "formik";
import SignupView from "./SignupView";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { register } from "../../redux/slices/auth.slice";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../routes/CONSTANTS";

export const SignupContainer = () => {
  const { refId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
      confirmPassword: "",
      refId: refId ?? "",
      terms: false,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(
          /^(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Invalid phone number"
        )
        .required("Phone number is required"),
      role: Yup.string().required("Role is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(15, "Password must be at most 15 characters")
        .required("Password is required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Weak Password. Password must have at least: 1 upper case, 1 digit, 1 special character, Minimum eight in length"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions."
      ),
    }),
    onSubmit: (details) => {
      console.log(details);

      void dispatch(
        register({
          firstName: details.firstName,
          lastName: details.lastName,
          email: details.email,
          password: details.password,
          confirmPassword: details.confirmPassword,
          phoneNumber: details.phoneNumber.toString(),
          UserRole: details.role,
        })
      )
        .unwrap()
        .then((res) => {
          if (res) {
            navigate(LOGIN);
          }
        });
    },
  });

  return (
    <Auth reverse>
      <SignupView formik={formik} loading={() => {}} />
    </Auth>
  );
};

import { Auth } from "../../components/layouts";
import { useFormik } from "formik";
import SignupView from "./SignupView";
import * as Yup from "yup";
import {
  GOOGLE_END_POINT,
  LINKED_IN_END_POINT,
  MICROSOFT_END_POINT,
} from "../../services/CONSTANTS";
import { useParams } from "react-router-dom";

export const SignupContainer = () => {
  const { refId } = useParams();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      refId: refId ?? "",
      terms: false,
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Weak Password. Password must have at least: 1 upper case, 1 digit, 1 special character, Minimum eight in length"
        ),
      refId: Yup.string(),
      terms: Yup.boolean().isTrue("Terms and condition not accepted"),
    }),
    onSubmit: (details) => {
      console.log(details);
      // void dispatch(
      //   register({
      //     email: details.email,
      //     password: details.password,
      //     firstName: details.fullname.split(" ")[0],
      //     lastName: details.fullname.split(" ")[1],
      //     refId: details.refId ? details.refId : undefined,
      //   })
      // )
      //   .unwrap()
      //   .then((res) => {
      //     setTimeout(() => {
      //       toast.success(
      //         `Verification Link has been sent to this email "${res.email}", kindly follow the instruction in the mail to verify your account`
      //       );
      //     }, 5000);
      //   });
    },
  });

  const googleLogin = () => {
    window.open(`${GOOGLE_END_POINT}?refId=${refId}`, "_self");
  };
  const microsoftLogin = () => {
    window.open(`${MICROSOFT_END_POINT}?refId = ${refId}`, "_self");
  };
  const linkedLogin = () => {
    window.open(`${LINKED_IN_END_POINT}?refId=${refId}`, "_self");
  };

  return (
    <Auth reverse>
      <SignupView
        formik={formik}
        loading={() => {}}
        googleLogin={googleLogin}
        microsoftLogin={microsoftLogin}
        linkedLogin={linkedLogin}
      />
    </Auth>
  );
};

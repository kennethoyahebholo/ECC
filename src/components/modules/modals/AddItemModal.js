// import { logoutimg } from "assets/images";
// import { useAppDispatch } from "hooks";
// import { useDispatch } from "react-redux";
// import { logout } from "redux/slices/auth.slice";
// import { LOGIN } from "../../../routes/CONSTANTS";
// import { logout } from "../../../redux/slices/auth.slice";
// import { useNavigate } from "react-router-dom";

const AddItemModal = ({ children }) => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const onLogoutSubmit = () => {
  //     dispatch(logout())
  //       .unwrap()
  //       .then(() => navigate(LOGIN))
  //       .catch((err) => console.log(err));
  //   };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5">
      <div className="w-[440px] bg-white p-4 flex flex-col gap-8 rounded-lg h-[680px] overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default AddItemModal;

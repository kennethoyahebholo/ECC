// import { logoutimg } from "assets/images";
// import { useAppDispatch } from "hooks";
import { useDispatch } from "react-redux";
// import { logout } from "redux/slices/auth.slice";
import { LOGIN } from "../../../routes/CONSTANTS";
import { logout } from "../../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";

const AlertModal = ({
  setOpenModal,
  title,
  subTitle,
  action,
  handleAction,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const onLogoutSubmit = () => {
  //   dispatch(logout())
  //     .unwrap()
  //     .then(() => navigate(LOGIN))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5">
      <div className="h-[406px] w-[440px] bg-white pb-4 flex flex-col gap-8 rounded-lg">
        <div className="bg-gray-50 flex items-center justify-center rounded-t-lg h-48">
          {/* <img src={logoutimg} className="h-28 w-28 text-center" alt=""/> */}
        </div>
        <div className="px-8">
          <p className="text-black font-bold text-[21px]">{title}</p>
          <p className="text-black text-[18px]">{subTitle}</p>
        </div>
        <div className="flex items-center justify-between px-8">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="bg-white border-2 border-green-500 rounded-md py-2 px-4 text-green"
          >
            Nevermind
          </button>
          <button
            className="bg-green-600 py-2 px-4 rounded-md text-white"
            onClick={handleAction}
          >
            Yes, {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

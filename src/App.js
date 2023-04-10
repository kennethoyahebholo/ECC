import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import UserRouter from "./routes/Router";
import AdminRouter from "./routes/Router";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { store } from "./redux/store";
// import RouterConfig from "routes/RouterConfig";

// import "./styles/tailwind.css";
// import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";

const Router =
  process.env.REACT_APP_TYPE === "ADMIN" ? AdminRouter : UserRouter;

function App() {
  return (
    <AnimatePresence>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </AnimatePresence>
  );
}

export default App;

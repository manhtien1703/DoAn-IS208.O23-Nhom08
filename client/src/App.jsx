import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebRoutes from "./routes/Routes";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";
import { GoMoveToTop } from "react-icons/go";

function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {showScrollButton && (
          <button
            className="z-10 border-2 border-orange-200  fixed bottom-3 right-4 text-white flex items-center"
            onClick={scrollToTop}
          >
            <GoMoveToTop className="text-blue-600 z-12 " />
          </button>
        )}
        <WebRoutes />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}
export default App;

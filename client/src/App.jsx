import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebRoutes from "./routes/Routes";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebRoutes />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}
export default App;

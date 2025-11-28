import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { userRouter } from "./routes/userRouter";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={userRouter} />
    </Provider>
  );
}

export default App;

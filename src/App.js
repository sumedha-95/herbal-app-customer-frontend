import "./App.css";
import Pages from "./components/pages/Pages";

// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Pages />
      </PersistGate>
    </Provider>
  );
}

export default App;

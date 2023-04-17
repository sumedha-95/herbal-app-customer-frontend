import "./App.css"
import Pages from "./components/pages/Pages"


// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";

function App() {
  return <Pages />
}

export default App

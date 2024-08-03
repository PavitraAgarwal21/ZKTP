import { useState } from "react";
import "./App.css";
import Router from "./routes/Router";
import Header from "./components/Header";
import { storeContext } from "./useContext/storeContext";
import "react-toastify/dist/ReactToastify.css";
import {getWeb3Provider , requestAccounts} from "./web3/web3";
function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [event_creation, setEvent_creation] = useState(false);
  const [status, setStatus] = useState(false);
  const [index, setIndex] = useState(null);



  return (
    <storeContext.Provider
      value={{
        account,
        setAccount,
        loading,
        setLoading,
        event_creation,
        setEvent_creation,
        status,
        setStatus,
        index,
        setIndex,
      }}
    >
      <div className="App">
        <Header />
        <Router />
      </div>
    </storeContext.Provider>
  );
}

export default App;
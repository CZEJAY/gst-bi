import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import FormPage from "./components/shared/formPage";
import Print from "./components/shared/Print";
import { getFromLocalStorage, getUserIP } from "./lib/utils";
import axios from "axios";
import { DeviceProvider } from "./context/deviceContext";
import UserAuthForm from "./components/shared/userAuthForm.page";
import { Toaster } from "sonner";

export const userContext = createContext({});

const App = () => {
  const navigate = useNavigate()
  const [userAuth, setUserAuth] = useState({});
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    let session = getFromLocalStorage("user");
    session
      ? setUserAuth(session)
      : setUserAuth({ access_token: null });
  }, []);
  
  if(!userAuth.access_token){
    return <UserAuthForm type={"sign-in"} />
  }
  
  return (
    <DeviceProvider>
      <userContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>

          <Route path="/print" element={<Print />} />
          <Route path="/" index element={<FormPage />} />
        </Routes>
      </userContext.Provider>
    </DeviceProvider>
  );
};

export default App;

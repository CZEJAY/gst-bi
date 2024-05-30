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
  useEffect(() => {
    let session = getFromLocalStorage("user");
    session
      ? setUserAuth(session)
      : setUserAuth({ access_token: null });
  }, []);

  useEffect(() => {
    if(!userAuth.access_token){
      navigate("/signin")
    }
  }, [
    userAuth
  ])
  
  return (
    <DeviceProvider>
      <userContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>

          <Route path="/print" element={<Print />} />
          <Route path="/" index element={<FormPage />} />
          <Route path="signin" element={<UserAuthForm type={"sign-in"} />} />
        </Routes>
      </userContext.Provider>
    </DeviceProvider>
  );
};

export default App;

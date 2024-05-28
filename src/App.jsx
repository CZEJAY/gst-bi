import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import FormPage from "./components/shared/formPage";
import Print from "./components/shared/Print";
import { getFromLocalStorage, getUserIP } from "./lib/utils";
import axios from "axios";
import { DeviceProvider } from "./context/deviceContext";

export const userContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});
  useEffect(() => {
    let session = getFromLocalStorage("user");
    session
      ? setUserAuth(JSON.parse(session))
      : setUserAuth({ access_token: null });
  }, []);

  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
  const allowedIPs = ['192.168.56.1', '192.168.0.178', '192.168.0.187'];

    getUserIP(function(ip) {
      if (ip) {
        if(allowedIPs.includes(ip)){
          setIsAllowed(true)
        } else {
          setIsAllowed(false)
        }
      }
    })
  }, []);

  if (!isAllowed) {
    return <div>Access Denied</div>;
  }

  return (
    <DeviceProvider>
      <userContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path="/print" element={<Print />} />
          <Route path="/" element={<FormPage />}>
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Route>
        </Routes>
      </userContext.Provider>
    </DeviceProvider>
  );
};

export default App;

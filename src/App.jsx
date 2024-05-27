import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import FormPage from "./components/shared/formPage";
import Print from "./components/shared/Print";
import NavBar from "./components/navBar";
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

  const [isAllowed, setIsAllowed] = useState(true);

  // useEffect(() => {
  //   getUserIP(function(ip) {
  //     if (ip) {
  //       axios.get('http://localhost:3000/api/check-access', {
  //         headers: {
  //           'X-User-IP': ip
  //         }
  //       })
  //       .then(response => {
  //         console.log('Access response:', response.data);
  //         if(response.status === 200){
  //           setIsAllowed(true)
  //         } else {
  //           setIsAllowed(false)
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error checking access:', error);
  //       });
  //     } else {
  //       console.error('Unable to get user IP address.');
  //     }
  //   })
  // }, []);

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

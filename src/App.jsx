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
  const [details, setDetails] = useState(null);
  const [localIP, setLocalIP] = useState(null);
  const getUserGeolocationDetails = () => {
    fetch(
      "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    )
      .then((response) => response.json())
      .then((data) => { setDetails(data);});
  };
  useEffect(() => {
    const allowedIPs = [
      "192.168.56.1",
      "192.168.0.178",
      "192.168.0.187",
      "192.168.75.70",
      "102.90.66.187",
      "102.90.58.243",
      "102.90.66.187",
      "102.90.67.95",
      "102.90.65.140",
      "197.210.54.182",
      "197.210.226.77",
      "197.210.55.234",
      "192.168.43.54"
    ];
    getUserIP(function(ip){
      setLocalIP(ip);
      if (allowedIPs.includes(ip)) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    })
    const getUserGeolocationDetails = () => {
      fetch(
        "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
      )
        .then((response) => response.json())
        .then((data) => {
          setDetails(data);
          
        });
    };
    getUserGeolocationDetails();
  }, []);

  if (!isAllowed) {
    return <div className="">
    <div className="text-center">
      

            <div className="row justify-content-center mt-3">
                <div className="col-lg-6 text-center text-dark">
                    {details && (
                        <ul className="list-group">
                            <li className="list-group-item">
                                Location :{" "}
                                {`${details.city}, ${details.country_name}(${details.country_code})`}
                            </li>
                            <li className="list-group-item">
                               public IP: {details.IPv4}
                            </li>
                            <li className="list-group-item">
                               local IP: {localIP}
                            </li>
                        </ul>
                    )}
                </div>
            </div>
    </div>
</div>;
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

import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import FormPage from "./components/shared/formPage";
import Print from "./components/shared/Print";
import { getFromLocalStorage, getUserIP } from "./lib/utils";
import axios from "axios";
import { DeviceProvider } from "./context/deviceContext";
import UserAuthForm from "./components/shared/userAuthForm.page";
import { Toaster } from "sonner";
import { SessionProvider } from "./context/SessionContext";

export const userContext = createContext({});

const App = () => {
  
  
  return (
    <DeviceProvider>
      <SessionProvider>
        <Routes>
          <Route path="/print" element={<Print />} />
          <Route path="/" index element={<FormPage />} />
          <Route path="/auth" element={<UserAuthForm type={"sign-in"}/>} />
        </Routes>
      </SessionProvider>
    </DeviceProvider>
  );
};

export default App;

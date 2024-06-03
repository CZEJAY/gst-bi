import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import FormPage from "./components/shared/formPage";
import Print from "./components/shared/Print";
import { getFromLocalStorage, getUserIP } from "./lib/utils";
import axios from "axios";
import { DeviceProvider } from "./context/deviceContext";
import UserAuthForm from "./components/shared/userAuthForm.page";
import { Toaster } from "sonner";
import Modal from "react-modal";
import { SessionProvider, useSession } from "./context/SessionContext";
import "react-tabs/style/react-tabs.css";
import {
  CaptureFingerprintTab,
  PersonInfoTab,
} from "./components/shared/VerificationModal";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    zIndex: "9999"
  },
};

const FingerprintContext = createContext();
export const useFingerPrintContext = () => {
  const { fingerprintData, personData, modalIsOpen, closeModal, openModal } = useContext(FingerprintContext);
  return { fingerprintData, personData, modalIsOpen, closeModal, openModal };
};

Modal.setAppElement("#root");
const App = () => {
  const [fingerprintData, setFingerprintData] = useState(null);
  const [personData, setPersonData] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const handleFingerprintCapture = async () => {
    try {
      // Placeholder for fingerprint capture logic
      const capturedFingerprint = "sample_fingerprint_data";
      setFingerprintData(capturedFingerprint);

      // Send fingerprint to backend for matching
      const response = await axios.post("/api/match-fingerprint", {
        fingerprint: capturedFingerprint,
      });
      setPersonData(response.data);
    } catch (error) {
      console.error("Error capturing fingerprint:", error);
    }
  };
  const { showModal } = useSession();
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <DeviceProvider>
      <SessionProvider>
        <FingerprintContext.Provider
          value={{ fingerprintData, personData, modalIsOpen, closeModal, openModal }}
        >
        <Routes>
          <Route path="/print" element={<Print />} />
          <Route path="/" index element={<FormPage />} />
          <Route path="/auth" element={<UserAuthForm type={"sign-in"} />} />
        </Routes>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Fingerprint Modal"
          >
            <Tabs >
              <TabList className={`flex w-full items-center gap-4 mb-4`}>
                <Tab className={`text-lg font-bold border p-2 rounded`}>Capture Fingerprint</Tab>
                <Tab className={`text-lg font-bold border p-2 rounded`} disabled={!personData}>Person Information</Tab>
              </TabList>

                <TabPanel>
                  <CaptureFingerprintTab onCapture={handleFingerprintCapture} />
                </TabPanel>
                <TabPanel>
                  <PersonInfoTab />
                </TabPanel>
            </Tabs>
          </Modal>
        </FingerprintContext.Provider>
      </SessionProvider>
    </DeviceProvider>
  );
};

export default App;

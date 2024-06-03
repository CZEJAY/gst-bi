// import React, { useState, useContext, createContext } from 'react';
// import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import axios from 'axios';

import VerificationBiometric from "../MultiStepForm/StepForms/VerificationModal";

// import { useSession } from '../../context/SessionContext';



// Modal.setAppElement("#root")


// const VerificationModal = ({ isOpen, onRequestClose }) => {
//   const [personData, setPersonData] = useState(null);
//   const { showModal, setShowModal } = useSession();

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     subtitle.style.color = '#f00';
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   const handleFingerprintCapture = async () => {
//     try {
//       // Placeholder for fingerprint capture logic
//       const capturedFingerprint = 'sample_fingerprint_data';
//       setFingerprintData(capturedFingerprint);

//       // Send fingerprint to backend for matching
//       const response = await axios.post('/api/match-fingerprint', { fingerprint: capturedFingerprint });
//       setPersonData(response.data);
//     } catch (error) {
//       console.error('Error capturing fingerprint:', error);
//     }
//   };
//   console.log(showModal)
//   return (
//     <FingerprintContext.Provider value={{ fingerprintData, personData }}>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={onRequestClose}
//         contentLabel="Fingerprint Modal"
//       >
//         <Tabs>
//           <TabList>
//             <Tab>Capture Fingerprint</Tab>
//             <Tab disabled={!personData}>Person Information</Tab>
//           </TabList>

//           <TabPanel>
//             <TabPanel>
//               <CaptureFingerprintTab onCapture={handleFingerprintCapture} />
//             </TabPanel>
//             <TabPanel>
//               <PersonInfoTab />
//             </TabPanel>
//           </TabPanel>
//         </Tabs>
//       </Modal>
//     </FingerprintContext.Provider>
//   );
// };

export const CaptureFingerprintTab = ({ onCapture }) => {
  return (
    <div>
      <VerificationBiometric />
    </div>
  );
};

export const PersonInfoTab = () => {
  const { personData } = useContext(FingerprintContext);

  if (!personData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Person Information</h2>
      <p>Name: {personData.name}</p>
      <p>Age: {personData.age}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

// export default VerificationModal;

import { DropletIcon } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';



const DeviceContext = createContext({ device: 'laptop' });

export const useDeviceContext = () => useContext(DeviceContext);

export const DeviceProvider = ({ children }) => {
  const [device, setDevice] = useState('laptop');

  const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('mobile') || userAgent.includes('tablet')) {
      setDevice('phone');
    } else {
      setDevice('laptop');
    }
  };

  useEffect(() => {
    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  if(device === "phone") {
    return (
      <div className='h-screen bg-black text-white w-screen flex items-center justify-center'>
        <DropletIcon />
        Incompartible Device
      </div>
    )
  }

  return (
    <DeviceContext.Provider value={{ device }}>
      {children}
    </DeviceContext.Provider>
  );
};



import NavButtons from "../../../components/FormInputs/NavButtons";
import {
  setCurrentStep,
  updateFormData,
} from "../../../redux/slices/onboardingStudentsSlice";
import { Fingerprint, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import axios from "axios"

// @ts-ignore
// #######################################################################################
import React, { useState, useEffect, useCallback } from 'react';
import { FingerprintReader, SampleFormat, DeviceDisconnected, DeviceConnected } from '@digitalpersona/devices';
import { BrowserRouter as Router } from 'react-router-dom';
import { decodeBase64, encodeToBase64 } from "../../../lib/utils";

const Biometric = () => {
  const formData = useSelector((store) => store.onboarding.formData);
  const [devices, setDevices] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [samples, setSamples] = useState(null);
  const [firstCapture, setFirstCapture] = useState(formData.fingerPrint || null);
  const reader = new FingerprintReader();
  // @ts-ignore
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  // @ts-ignore
console.log(formData, currentStep);
const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...formData,
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    reader.on('DeviceConnected', onDeviceConnected);
    reader.on('DeviceDisconnected', onDeviceDisconnected);
    reader.on('SamplesAcquired', onSamplesAcquired);
    reader.on('AcquisitionStarted', onAcquisitionStarted);
    reader.on('AcquisitionStopped', onAcquisitionStopped);
    
    return () => {
      reader.off('DeviceConnected', onDeviceConnected);
      reader.off('DeviceDisconnected', onDeviceDisconnected);
      reader.off('SamplesAcquired', onSamplesAcquired);
      reader.off('AcquisitionStarted', onAcquisitionStarted);
      reader.off('AcquisitionStopped', onAcquisitionStopped);
    };
  }, [reader]);

 useEffect(() => {
   captureImage()
 }, [samples])
 

  const onDeviceConnected = (event) => {
    console.log('Device Connected', event);
    toast.success("Device connected.", { position: "top-center"})
  }

  const onDeviceDisconnected = (event) => {
    console.log('Device Disconnected', event);
  }

  const onSamplesAcquired = async (event) => {
    console.log('Samples Acquired', event);
    toast.success("Samples acquired.")
    setSamples(event.samples);
   captureImage()
  }

  const onAcquisitionStarted = (event) => {
    console.log('Acquisition Started', event);
    toast.message("Acquisition started")
  }

  const onAcquisitionStopped = (event) => {
    console.log('Acquisition Stopped', event);
    toast.message("Acquisition stopped")
  }

  const listDevices = async () => {
    try {
      const devices = await reader.enumerateDevices();
      setDevices(devices);
      console.log(devices)
      if(devices.length > 0) {
        toast.success("Device listed.")
      } else {
        toast.info("No device found.")
      }
    } catch (error) {
      console.error('Error listing devices:', error);
    }
  };

  const getDeviceInfo = () => {
    if (devices.length > 0) {
      const deviceInfo = JSON.stringify(devices[0]).replace(/[[\]"]/g, '');
      console.log(deviceInfo);
      setDeviceInfo(deviceInfo);
    }
  };

  const startCapture = async () => {
    try {
      await reader.startAcquisition(SampleFormat.PngImage, deviceInfo);
      console.log('Capture started');
      // toast.success("Capture started.")
    } catch (error) {
      toast.error("Couldn't start")
      console.error('Error starting capture:', error);
    }
  };

  const stopCapture = async () => {
    try {
      await reader.stopAcquisition(deviceInfo);
      toast.success("Capture stopped.")
      console.log('Capture stopped');
    } catch (error) {
      console.error('Error stopping capture:', error);
    }
  };

  const captureImage = () => {
    if (samples && samples.length > 0) {
      try {
        let base64 = samples[0];
        console.log('Original base64 string:', base64);
  
        // Replace URL-safe characters
        base64 = decodeBase64(base64)
  
        // Check if the base64 string is valid
          setFirstCapture((`data:image/png;base64,${(base64)}`));
          console.log('Image captured');
      } catch (error) {
        console.error('Error processing base64 string:', error);
        // Optionally, show an error message to the user
      }
    } else {
      console.log('No fingerprint captured');
      // Optionally, show a message to the user
    }
  };

  const isValidBase64 = (str) => {
    try {
      // Decode the base64 string
      atob(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  async function processData(data) {
    setLoading(true);
    try {
      if (!firstCapture) {
        return toast.error("Fingerprint is required.", {position: "top-center"});
      }
      if (!formData?.fingerPrintId) {
        let loadingToast = toast.loading("Uploading fingerprint...", {position: "top-center"});
        const value = await axios
          .post(
            import.meta.env.VITE_API_URL + "/upload/fingerPrint",
            {imageURL: firstCapture},
          )
          .finally(() => toast.dismiss(loadingToast));

        if (value.data) {
          toast.success(value?.data.data.message);
          setFirstCapture(value?.data?.data?.template);
          const FData = { ...data, fingerPrint: value?.data?.data?.template, fingerPrintId: value.data?.data._id };
          dispatch(updateFormData(FData));
          dispatch(setCurrentStep(currentStep + 1));
        }
      } else {
        dispatch(setCurrentStep(currentStep + 1));
      }

      //Make API Request to Save the Data also in the DB

      //Update the Current Step
      console.log(data);
    } catch (error) {
      console.log("Error occurred: ", error);
      toast.error("Something went wrong.", {position: "top-center"})
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      <form
      className="px-12 py-4 flex flex-col"
      onSubmit={handleSubmit(processData)}
    >
      <div className="mb-8">
        <h5 className="text-xl md:text-3xl font-bold text-gray-900">
          Biometric Authentication
        </h5>
        <p className="font-semibold text-sm">Please Scan at least one finger.</p>
        <hr />
        <div className="mt-3">
          {
            devices.length > 0 ?  
              <select
              value={deviceInfo}
              onChange={(e) => setDeviceInfo(e.target.value)}
              className="w-full p-2 pl-4 pr-4 text-sm font-semibold text-gray-700"
              >
              {devices.map((device, index) => (
                <option  key={index} value={device}>
                {device}
                </option>
                ))}
                </select>
              
               : 
                <p className="font-semibold text-sm">No devices found. Please connect a fingerprint reader.</p>
                
          }
        </div>
        <div className="flex w-full items-center gap-3">
        <button
          onClick={listDevices}
          type="button"
          className="inline-flex mx-auto items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-800 "
        >
          <Fingerprint className="w-5 h-5 mr-2" />
          <span>List Device</span>
        </button>
        {/* <button
          onClick={getDeviceInfo}
          type="button"
          className="inline-flex mx-auto items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-800 "
        >
          <Fingerprint className="w-5 h-5 mr-2" />
          <span>Connect Device</span>
        </button> */}
        <button
          onClick={startCapture}
          type="button"
          className="inline-flex mx-auto items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-800 "
        >
          <Fingerprint className="w-5 h-5 mr-2" />
          <span>Start Capture</span>
        </button>
        <button
          onClick={captureImage}
          type="button"
          className="inline-flex mx-auto items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-800 "
        >
          <Fingerprint className="w-5 h-5 mr-2" />
          <span>Capture Finger</span>
        </button>
        <button
          onClick={stopCapture}
          type="button"
          className="inline-flex mx-auto items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-800 "
        >
          <Fingerprint className="w-5 h-5 mr-2" />
          <span>Stop Capture</span>
        </button>
        {/* <button  type="button" onClick={}>List Devices</button>
        <button  type="button"onClick={getDeviceInfo}>Device Info</button> */}
        </div>
      </div>
        <div className="inline-flex aspect-video w-full items-center justify-evenly">
        <div className="">
        {firstCapture ? 
          <div className="relative border rounded-lg p-2 ">
            <img src={firstCapture} className="w-36 rounded-full" alt="Fingerprint" />
            <X onClick={() => {
              setFirstCapture(null)
              setSamples(null)
            }} className="absolute cursor-pointer top-0 right-0"/>
          </div>
         : <div className="w-full flex flex-col">
            <img src="/finger.png" alt="finger" className="w-40" />
            <div className="">
              <p className="font-bold text-xl ">No fingerprint data.</p>
            </div>
         </div>
        }
        </div>
        
        </div>
      <NavButtons  loading={loading} />
    </form>
    </>
  );
};


export default Biometric
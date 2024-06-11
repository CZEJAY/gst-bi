import NavButtons from "../../../components/FormInputs/NavButtons";
import {
  setCurrentStep,
  updateFormData,
} from "../../../redux/slices/onboardingStudentsSlice";
import { Camera } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import axios from "axios";

export default function FacialAuthentication() {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const formData = useSelector((store) => store.onboarding.formData);
  console.log(formData, currentStep);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(formData?.image || "");
  const [isCapturing, setIsCapturing] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
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
  async function processData(data) {
    setLoading(true);
    try {
      if (!imageURL) {
        return toast.error("Image is required.");
      }
      if (!formData?.image) {
        let loadingToast = toast.loading("Uploading image...");
        const imageData = new FormData();
        imageData.append("file", data);
        const value = await axios
          .post(import.meta.env.VITE_API_URL + "/upload", { imageURL })
          .finally(() => toast.dismiss(loadingToast));

        if (value.data) {
          toast.success(value.data?.message);
          setImageURL(value?.data?.data?.secure_url);
          const FData = { ...data, image: value?.data?.data?.secure_url };
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
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handleClick = async () => {
    setImageURL(null);
    const FData = { ...formData, image: null };
    dispatch(updateFormData(FData));
    setIsCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setMediaStream(stream);
    } catch (error) {
      toast.info("Could not access camera. Please reload!");
      console.log(error);
    }
  };
  const handleCapture = () => {
    // Pause the video
    videoRef.current.pause();

    // Get the canvas context
    const ctx = canvasRef.current.getContext("2d");

    // Get the dimensions of the video and set the canvas dimensions to match
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Calculate the position to draw the image so it is centered in the canvas
    const x = (canvasRef.current.width - videoWidth) / 2;
    const y = (canvasRef.current.height - videoHeight) / 2;

    // Clear the canvas before drawing the new image
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw the image centered in the canvas without scaling
    ctx.drawImage(videoRef.current, x, y, videoWidth, videoHeight);

    // Convert the canvas content to a data URL
    const image = canvasRef.current.toDataURL("image/png");

    // Set the image URL state
    setImageURL(image);

    // Close the camera
    handleCloseCamera();

    // Set capturing state to false
    setIsCapturing(false);
  };

  const handleCloseCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };
  return (
    <>
      <div className="absolute">
        <Toaster position="top-center" />
      </div>
      <form
        className="px-12 py-4 flex w-full flex-col"
        onSubmit={handleSubmit(processData)}
      >
        <div className="mb-8">
          <h5 className="text-xl md:text-3xl font-bold text-gray-900">
            Facial Authentication
          </h5>
          <p className="font-semibold text-lg">Please look into the camera.</p>
        </div>
        <canvas
          ref={canvasRef}
          className="hidden bg-current "
          width={200}
          height={200}
        />
        {!imageURL && (
          <video
            ref={videoRef}
            autoPlay
            className=" h-[200px] w-[200px] p-0 mx-auto bg-black "
          />
        )}
        {imageURL && (
          <img
            src={imageURL}
            alt="CaptImage"
            className="h-[200px] w-[200px] mx-auto object-cover bg-center"
          />
        )}
        <button
          onClick={isCapturing ? handleCapture : handleClick}
          type="button"
          className="inline-flex mx-auto items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-orange-900 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-800 "
        >
          <Camera className="w-5 h-5 mr-2" />
          <span>{isCapturing ? "Capture" : "Start Camera"}</span>
        </button>

        <NavButtons loading={loading} />
      </form>
    </>
  );
}

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { clearLocalStorage } from "../lib/utils";
import { useSession } from "../context/SessionContext";
import { useFingerPrintContext } from "../App";
// import { setAppElement } from "react-modal";

// setAppElement("#root");

const UserNavigationPanel = () => {
  const { userAuth, setUserAuth, setShowModal } = useSession();
  const { openModal } = useFingerPrintContext()
  const signOutUser = () => {
    clearLocalStorage("user");
    setUserAuth({ access_token: null });
  };
 
  return (
    <div className="bg-white flex flex-col  absolute right-0 border border-grey w-60 overflow-hidden duration-200">
      <button onClick={() => openModal()} className="flex gap-2 link font-semibold pl-8 py-4">
        Open verification modal
      </button>
      
      <button
        className="text-left p-4 border-t hover:bg-grey w-full pl-8 py-4"
        onClick={signOutUser}
      >
        <h1 className="font-bold text-xl mb-1">Sign Out</h1>
        <p className="text-dark-grey">@{userAuth?.username}</p>
      </button>
    </div>
  );
};

export default UserNavigationPanel;

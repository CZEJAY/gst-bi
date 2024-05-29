import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import { clearLocalStorage } from "../lib/utils";

const UserNavigationPanel = () => {
    const {userAuth, setUserAuth} = useContext(userContext)
    const signOutUser = () => {
        clearLocalStorage("user")
        setUserAuth({access_token: null})
    }
  return (
      <div className="bg-white flex flex-col  absolute right-0 border border-grey w-60 overflow-hidden duration-200">


        <Link to={`/user/${userAuth?.username}`} className="flex gap-2 link md:hidden pl-8 py-4">
            Profile
        </Link>
        <Link to={`/dashboard/blogs}`} className="flex gap-2 link md:hidden pl-8 py-4">
            Dashboard
        </Link>
        <Link to={`/settings/edit-profile}`} className="flex gap-2 link md:hidden pl-8 py-4">
            Settings
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>

        <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4" onClick={signOutUser}>
            <h1 className="font-bold text-xl mb-1">Sign Out</h1>
            <p className="text-dark-grey">@{userAuth?.username}</p>
        </button>
      </div>
  );
};

export default UserNavigationPanel;

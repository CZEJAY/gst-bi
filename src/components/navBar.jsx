import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserNavigationPanel from "./user-navigation.component";
import { userContext } from '../App';
import { UserCircle } from 'lucide-react';
import { useSession } from '../context/SessionContext';
const NavBar = () => {
  const [searcBoxVisible, setSearhBoxVisible] = useState(false);
  const [isModalActive, setIsModalAtive] = useState(false);
  const navigate = useNavigate();
  const {
    userAuth,
    setUserAuth,
  } = useSession();

  const handleUserNavPanel = () => {
    setIsModalAtive((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsModalAtive(false);
    }, 200);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    if (e.keyCode === 13 && query.length) {
      navigate(`/search/${query.replace(/\s+/g, "-")}`);
    }
  };
  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-20">
          <img src={"/uniuyo-logo.png"} alt="logo" className="" />
        </Link>


        <div className="flex items-center gap-3 md:gap-6 ml-auto">

          {userAuth?.access_token ? (
            <>
              {/* <Link to={"/dashboard/notification"}>
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-grey relative hover:bg-black/10">
                  <FaBell className="block mt-1" />
                </button>
              </Link> */}

              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1 relative">
                  <UserCircle size={40} />
                </button>
                {isModalActive ? <UserNavigationPanel /> : null}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to={"/signin"}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;

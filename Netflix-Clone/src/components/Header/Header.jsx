import React, { useEffect, useState } from "react";
import "./Header.css";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header() {
  const [show, setShow] = useState(false);

  // Make header visible on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${show && "header-black"}`}>
      <div className="header-left">
        <img
          className="header-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        <ul className="header-nav">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
      </div>

      <div className="header-right">
        <SearchIcon className="header-icon" />
        <NotificationsIcon className="header-icon" />

        <img
          className="header-avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Profile"
        />

        <ArrowDropDownIcon className="header-icon" />
      </div>
    </header>
  );
}

export default Header;

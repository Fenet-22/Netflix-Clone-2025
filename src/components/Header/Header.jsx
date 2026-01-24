/* STEP 1: BRINGING IN THE TOOLS
   We are importing the 'brain' of React and some icons to make the header look professional.
*/
import React, { useEffect, useState } from "react";
import "./Header.css"; // The "Style Manual" that tells the header how to look (colors, sizes)

// These are graphics for Search, Notifications, and the little dropdown arrow
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header() {
  /* STEP 2: THE "MEMORY" (State)
     We create a 'memory' called 'show'. 
     Initially, it is 'false' (off). It's like a light switch that starts in the OFF position.
  */
  const [show, setShow] = useState(false);

  /* STEP 3: THE "WATCHMAN" (useEffect)
     This part of the code acts like a security guard. It stands there and watches 
     the user as they scroll down the page.
  */
  useEffect(() => {
    const handleScroll = () => {
      // If the user has scrolled more than 50 pixels down (about the width of a thumb):
      if (window.scrollY > 50) {
        setShow(true); // Flip the switch to "ON" (Show the black background)
      } else {
        setShow(false); // Flip the switch back to "OFF" (Make it transparent)
      }
    };

    // We tell the browser: "Hey, every time the user moves the scroll wheel, run the code above."
    window.addEventListener("scroll", handleScroll);

    // This is a 'cleanup'. It's like turning off the lights when you leave a room.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // The empty [] means: "Start watching as soon as the page opens."

  return (
    /* STEP 4: THE STRUCTURE
       The `backticks` here allow us to do something clever:
       If 'show' is true, we add the CSS class "header-black". 
       This makes the header go from see-through to solid black, just like the real Netflix!
    */
    <header className={`header ${show && "header-black"}`}>
      
      {/* THE LEFT SIDE: LOGO AND MENU */}
      <div className="header-left">
        {/* The Netflix Red Logo */}
        <img
          className="header-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />

        {/* The Navigation Menu (ul = Unordered List, li = List Item) */}
        <ul className="header-nav">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
      </div>

      {/* THE RIGHT SIDE: BUTTONS AND PROFILE */}
      <div className="header-right">
        {/* Search and Notification Icons */}
        <SearchIcon className="header-icon" />
        <NotificationsIcon className="header-icon" />

        {/* The User's Profile Picture (Avatar) */}
        <img
          className="header-avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Profile"
        />

        {/* The little downward arrow next to the profile pic */}
        <ArrowDropDownIcon className="header-icon" />
      </div>
    </header>
  );
}

// Making this Header available for the rest of the app to use
export default Header;
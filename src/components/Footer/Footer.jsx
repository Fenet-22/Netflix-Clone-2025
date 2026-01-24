/* STEP 1: THE IMPORTS (Gathering the Ingredients)
   Think of these like bringing in tools from a toolbox before you start building.
*/

// Import the React library so this file understands how to create a "Component" (a reusable block of UI)
import React from "react";

// Import the "Style Sheet" which is like the paint and layout instructions for this specific part
import "./Footer.css";

// Import specific icons from the Material UI library (Facebook, Instagram, etc.)
// These are pre-made graphics so we don't have to draw them ourselves from scratch
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

/* STEP 2: THE FUNCTION (The Blueprint)
   This function is like a recipe. When the website calls "Footer()", it follows these instructions.
*/
function Footer() {
  
  // The 'return' statement tells the computer exactly what should appear on the screen
  return (
    // <footer...>: This is a semantic tag telling the browser "this is the very bottom of the page"
    // className="footer": This links this HTML to the styling rules in Footer.css
    <footer className="footer">
      
      {/* SECTION 1: TOP AREA (Questions and Social Media) */}
      <div className="footer-top">
        {/* <p> is a 'paragraph' tag for simple text */}
        <p>Questions? Contact us.</p>
        
        {/* A container specifically for the social media icons */}
        <div className="footer-social">
          {/* We place the icons we imported earlier. 'footer-icon' is used to size/color them in CSS */}
          <FacebookIcon className="footer-icon" />
          <InstagramIcon className="footer-icon" />
          <YouTubeIcon className="footer-icon" />
          <TwitterIcon className="footer-icon" />
        </div>
      </div>

      {/* SECTION 2: THE LINKS GRID (The Library of Links)
          We divide these into "columns" so they look organized in a grid, just like on the real Netflix site.
      */}
      <div className="footer-links">
        
        {/* COLUMN 1: General Info. <a> tags are 'anchors' (clickable links). 
            The href="#" is a placeholder that means "stay on this page for now" 
        */}
        <div className="footer-column">
          <a href="#">FAQ</a>
          <a href="#">Investor Relations</a>
          <a href="#">Privacy</a>
          <a href="#">Speed Test</a>
        </div>

        {/* COLUMN 2: Support and Legal */}
        <div className="footer-column">
          <a href="#">Help Center</a>
          <a href="#">Jobs</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Legal Notices</a>
        </div>

        {/* COLUMN 3: User Account & Content */}
        <div className="footer-column">
          <a href="#">Account</a>
          <a href="#">Ways to Watch</a>
          <a href="#">Corporate Information</a>
          <a href="#">Only on Netflix</a>
        </div>

        {/* COLUMN 4: Contact & Terms */}
        <div className="footer-column">
          <a href="#">Media Center</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
        </div>
      </div>

      {/* SECTION 3: FOOTER NOTE 
          This is a simple text line showing the region or copyright info.
      */}
      <p className="footer-country">Netflix USA</p>
    </footer>
  );
}

/* STEP 3: THE EXPORT (Shipping the Product)
   This line makes the Footer available to be used in other files (like App.js).
   Without this, the rest of the app wouldn't be able to "see" this component.
*/
export default Footer;
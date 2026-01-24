/* STEP 1: BRINGING IN THE "LIFE-GIVERS"
   We import StrictMode to help us find bugs, and createRoot, which is 
   the tool that actually injects our code into the browser.
*/
import { StrictMode } from 'react' // A "Safety Monitor" for developers
import { createRoot } from 'react-dom/client' // The "Bridge" between React and the Web
import './index.css' // Global styles (fonts, margins, background colors)
import App from './App.jsx' // Bringing in the "App" (The finished car we built)

/* STEP 2: THE HOOK-UP
   In your 'index.html' file (the basic skeleton), there is a single 
   empty box (a <div>) with the ID of "root". 
   
   This line says: "Go find that empty box named 'root' and make it 
   the home for our entire React application."
*/
createRoot(document.getElementById('root')).render(
  /* STEP 3: THE PROTECTOR (StrictMode)
     StrictMode doesn't show up on the website. It’s like an 
     Invisible Inspector that double-checks your code while you are 
     building it to make sure you aren't using old or broken methods.
  */
  <StrictMode>
    {/* This is the App component we assembled in the last file. 
        Because it is inside 'render', it finally becomes visible to the world! */}
    <App />
  </StrictMode>,
)
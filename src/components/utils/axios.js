/* STEP 1: IMPORTING THE MESSENGER
   We bring in 'axios'. Think of axios as a professional delivery service 
   (like FedEx or UPS) that specializes in carrying data back and forth 
   across the internet.
*/
import axios from "axios";

/* STEP 2: CREATING THE "SPEED DIAL" (The Instance)
   We are creating a customized version of axios that already knows 
   where it's going. 
*/
const instance = axios.create({
    // baseURL: This is the "Main Office" address of the Movie Database (TMDB).
    // Every request we make will automatically start with this address.
    baseURL: "https://api.themoviedb.org/3",
});

/* STEP 3: MAKING IT PUBLIC
   By exporting this 'instance', we allow every other file in our project 
   to use this specific "Speed Dial" messenger.
   
   Example: 
   Instead of writing: axios.get("https://api.themoviedb.org/3/trending/all")
   We can now just write: instance.get("/trending/all")
*/
export default instance;
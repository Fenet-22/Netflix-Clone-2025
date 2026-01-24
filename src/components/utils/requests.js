/* STEP 1: THE SECRET VAULT (Environment Variables)
   In coding, we never write our "passwords" (API Keys) directly in the code 
   because hackers could steal them. 
   
   Instead, we put them in a "Secret Vault" (.env file). 
   Vite uses 'import.meta.env' to reach into that vault and grab the keys.
*/
const API_KEY = import.meta.env.VITE_TMDB_KEY; // Grabbing your secret API key
const BASE_URL = import.meta.env.VITE_BASE_URL; // Grabbing the main TMDB web address

/* STEP 2: THE MENU (The Requests Object)
   We are creating a list of "Orders." 
   Each line combines the Base URL, the specific category, and your Secret Key 
   into one long web link that the Movie Database understands.
*/
const requests = {
    // "Hey TMDB, show me what's popular this week"
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,

    // "Hey TMDB, show me only shows made by Netflix (Network 213)"
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,

    // "Show me the movies with the highest star ratings"
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,

    // The following lines use "Genre IDs" (like 28 for Action, 35 for Comedy).
    // It's like telling the computer: "Filter the library for Category #28."
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

/* STEP 3: THE DELIVERY
   We export this menu so that our Row.js and Banner.js files can 
   simply say: "I'll take the fetchActionMovies, please!"
*/
export default requests;
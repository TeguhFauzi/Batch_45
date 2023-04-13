import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import TvShow from "./pages/TvShow";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import DetailFilm from "./pages/Detail";
import DetailFilms from "./pages/DetailMovie";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import AuthContextProvider from "./auth/AuthcContext";
import Transaction from "./pages/Transaction";


// Mendefinisikan komponen utama
function App() {
  return (
    // Mengelilingi aplikasi dengan AuthContextProvider dan Router
    <AuthContextProvider>
     
      <Router>
      
        <Navbar />  {/* Menampilkan Navbar */}
      
        <Routes>  {/* Menentukan rute-rute */}
         
          <Route path="/" element={<Home />} /> {/* Menampilkan komponen Home ketika path URL adalah '/' */}
         
          <Route path="/TVshow" element={<TvShow />} /> {/* Menampilkan komponen TvShow ketika path URL adalah '/TVshow' */}
        
          <Route path="/Movies" element={<Movies />} />  {/* Menampilkan komponen Movies ketika path URL adalah '/Movies' */}
       
          <Route path="/DetailFilm" element={<DetailFilm />} />   {/* Menampilkan komponen DetailFilm ketika path URL adalah '/DetailFilm' */}
        
          <Route path="/Detail-Movie/:id" element={<DetailFilms />} />  {/* Menampilkan komponen DetailFilms ketika path URL adalah '/DetailFilms' */}
      
          <Route path="/Profile" element={<Profile />} />    {/* Menampilkan komponen Profile ketika path URL adalah '/Profile' */}
      
          <Route path="/Payment" element={<Payment />} />    {/* Menampilkan komponen Payment ketika path URL adalah '/Payment' */}
    
          <Route path="/Transaction" element={<Transaction />} />      {/* Menampilkan komponen Transaction ketika path URL adalah '/Transaction' */}
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

// Mengekspor komponen App sebagai default
export default App;


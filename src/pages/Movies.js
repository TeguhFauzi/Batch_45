import { React,useState,useContext } from "react";
import Background from "../image/masjok.png";
import Thewitch from "../image/joktit.png";
import Thetext from "../image/joktext.png";
import Card from "../components/Card";
import FakeData from '../data/FakeData';
import { AuthContext } from "../auth/AuthcContext";
import LoginModal from "../auth/Login";
import { Link } from "react-router-dom";


function Movies() {
  const handleShowLoginModal = () => setShowLoginModal(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const handleSuccessfulLogin = () => {
    localStorage.setItem("setIsLoggedIn", true); // simpan isLoggedIn di local storage agar tetap login meskipun di-refresh

    setShowLoginModal(false);
    setIsLoggedIn(true);
  };
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const mvData = FakeData.MV; // cek apakah movies memiliki properti TV

  return (
    <div className="black">
      {/* <Navbar /> */}
      <div className="thewitch">
        <div>
          <img className="titleimg" src={Thewitch} alt="text" />
          <img src={Thetext} alt="text" />
          <div className="years">
            <p className="tvsi">2019</p>
            <p className="tvs">TV Series</p>
          </div>
          {!isLoggedIn && (
  <button onClick={handleShowLoginModal}>WATCH NOW !</button>
)}
{isLoggedIn && (
  <Link to="/DetailFilm" >WATCH NOW !</Link>
)}
        </div>
      </div>
      <img className="background" src={Background} alt="Background" />
      <div className="bottom">
        <div className="pad">
          <div>
            {mvData && (
              <Card showTV={false} showMV={true} value={{ MV: FakeData.MV }} />
            )}
          </div>
        </div>
      </div>
      {showLoginModal && <LoginModal handleCloseLoginModal={() => setShowLoginModal(false)} handleSuccessfulLogin={handleSuccessfulLogin} />}
    </div>
  );
}

export default Movies;

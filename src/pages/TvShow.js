import { React,useState,useContext } from "react";

import LoginModal from "../auth/Login";
import Background from "../image/mask.png";
import Thewitch from "../image/lacasa.png";
import Thetext from "../image/moneytext.png";
import Card from "../components/Card";
import FakeData from '../data/FakeData';
import { AuthContext } from "../auth/AuthcContext";
import { Link } from "react-router-dom";


function TvShow() {

  const handleShowLoginModal = () => setShowLoginModal(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const handleSuccessfulLogin = () => {
    localStorage.setItem("setIsLoggedIn", true); // simpan isLoggedIn di local storage agar tetap login meskipun di-refresh

    setShowLoginModal(false);
    setIsLoggedIn(true);
  };
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const tvData = FakeData.TV; // cek apakah movies memiliki properti TV

  return (
    <div className="black">
      {/* <Navbar /> */}
      <div className="thewitch">
        <div>
          <img className="titleimg" src={Thewitch} alt="text" />
          <img src={Thetext} alt="text" />
          <div className="years">
            <p className="tvsi">2017</p>
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
            {tvData && (
              <Card showTV={true} showMV={false} value={{ TV: FakeData.TV }} />
            )}
          </div>
        </div>
      </div>
      {showLoginModal && <LoginModal handleCloseLoginModal={() => setShowLoginModal(false)} handleSuccessfulLogin={handleSuccessfulLogin} />}

    </div>
  );
}

export default TvShow;

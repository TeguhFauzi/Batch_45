
import { React, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthcContext";
import Background from "../image/Jumbotron.png";
import Thewitch from "../image/thewitcher.png";
import Thetext from "../image/textt.png";
import Card from "../components/Card";
import FakeData from '../data/FakeData';
import LoginModal from "../auth/Login";
import { Link } from "react-router-dom";



function Home() {
  const handleShowLoginModal = () => setShowLoginModal(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const handleSuccessfulLogin = () => {
    localStorage.setItem("setIsLoggedIn", true); // simpan isLoggedIn di local storage agar tetap login meskipun di-refresh
    setShowLoginModal(false);
    setIsLoggedIn(true);
  };
  const [showLoginModal, setShowLoginModal] = useState(false);

  const tvData = FakeData.TV;
  const mvData = FakeData.MV;
  function filterObjectById(obj) {
    const filteredObj = {};
    for (let key in obj) {
      if (obj[key].id >= 1 && obj[key].id <=6) { // only get object with id between 1 and 6 (inclusive)
        filteredObj[key] = obj[key];
      }
    }
    return filteredObj;
  }
  const filteredTVData = filterObjectById(tvData);
  const filteredMVData = filterObjectById(mvData);

  return (
    <div className="black">
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
          {isLoggedIn && <Link to="/DetailFilm">WATCH NOW !</Link>}
        </div>
      </div>
      <img className="background" src={Background} alt="Background" />
      <div className="bottom">
        <div className="pad">
          <div>
            {tvData && (
              <Card showTV={true} showMV={false} value={{ TV: filteredTVData }} />
            )}
            {mvData && (
              <Card showTV={false} showMV={true} value={{ MV: filteredMVData }} />
            )}
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          handleCloseLoginModal={() => setShowLoginModal(false)}
          handleSuccessfulLogin={handleSuccessfulLogin}
        />
      )}
    </div>
  );
}

export default Home;

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthcContext";
import LoginModal from "../auth/Login";
import RegisterModal from "../auth/Regist"; // Import RegisterModal component

const Card = (props) => {
  const tvser = Object.values(props.value?.TV || {});
  const movieser = Object.values(props.value?.MV || {});

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleShowLoginModal = () => setShowLoginModal(true);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("setIsLoggedIn", true);
    setLoginData({ email: "", password: "" });
    setShowLoginModal(false);
  };

  const handleSuccessfulRegister = () => {
    setIsLoggedIn(true);
    localStorage.setItem("setIsLoggedIn", true);
    setShowRegisterModal(false);
  };

  const ListTv = () => {
    return tvser.map((tv) => {
      // Enclose conditional rendering statements in parentheses
      return (
        <>
          {isLoggedIn ? (
            <Link to="/DetailFilm" key={tv.name}>
              <div className="cardx">
                <img src={require(`../image/${tv.image}.png`)} alt="" />
                <p className="cardx-title text-white">{tv.name}</p>
                <p className="cardx-text text-white">{tv.year}</p>
              </div>
            </Link>
          ) : (
            <div>
              <div className="cardx" key={tv.name}>
                <button onClick={handleShowLoginModal}>
                  <img src={require(`../image/${tv.image}.png`)} alt="" />
                  <p className="cardx-title">{tv.name}</p>
                  <p className="cardx-text">{tv.year}</p>
                </button>
              </div>
            </div>
          )}
        </>
      );
    });
  };

  const ListMv = () => {
    return movieser.map((movie) => {
      // Enclose conditional rendering statements in parentheses
      return (
        <>
          {isLoggedIn ? (
            <Link to={`/Detail-Movie/${movie.id}`}>
            {/* // <Link to='/DetailFilm'> */}
              <div className="cardx" key={movie.name}>
                <img src={require(`../image/${movie.image}.png`)} alt="" />
                <p className="cardx-title text-white">{movie.name}</p>
                <p className="cardx-text text-white">{movie.year}</p>
              </div>
            </Link>
          ) : (
            <div className="divbut">
              <div className="cardx" key={movie.name}>
                <button onClick={handleShowLoginModal}>
                  <img src={require(`../image/${movie.image}.png`)} alt="" />
                  <p className="cardx-title">{movie.name}</p>
                  <p className="cardx-text">{movie.year}</p>
                </button>
              </div>
            </div>
          )}
        </>
      );
    });
  };

  return (
    <div className="wrapper">
      {props.showTV && (
        <div className="center">
          <p className="tvseries">TV SERIES</p>
          <div className="series">
            <ListTv />
          </div>
        </div>
      )}
      {props.showMV && (
        <div className="bord">
          <p className="tvseries">MOVIES</p>
          <div className="series">
            <ListMv />
          </div>
        </div>
      )}
      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          handleCloseLoginModal={() => setShowLoginModal(false)}
          loginData={loginData}
          setLoginData={setLoginData}
          handleSuccessfulLogin={handleSuccessfulLogin}
          handleShowRegisterModal={() => {
            setShowRegisterModal(true);
            setShowLoginModal(false);
          }}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          show={showRegisterModal}
          handleCloseRegisterModal={() => setShowRegisterModal(false)}
          handleShowLoginModal={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
          handleSuccessfulRegister={handleSuccessfulRegister}
        />
      )}
    </div>
  );
};

export default Card;

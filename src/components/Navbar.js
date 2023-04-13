import LoginModal from "../auth/Login"; 
import RegisterModal from "../auth/Regist";
import { Link } from "react-router-dom"; 
import { Button } from "react-bootstrap"; 
import React, { useState, useContext } from "react"; 
import Logo from "../image/dumbflix.png"; 
import LogoutIcon from "../image/Logout.png"; 
import PayIcon from "../image/Bill.png"; 
import ProfileIcon from "../image/Profile.png"; 
import PolygonIcon from "../image/Polygon.png"; 
import Agan from "../image/agan.png"; 
import { AuthContext } from "../auth/AuthcContext"; 

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false); // state untuk menampilkan modal Login
  const [showRegisterModal, setShowRegisterModal] = useState(false); // state untuk menampilkan modal Register
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // context dan state untuk autentikasi
  const [showDropdown, setShowDropdown] = useState(false); // state untuk menampilkan dropdown menu
  const [loginData, setLoginData] = useState({ email: "", password: "" }); // state untuk menyimpan data login
  const [registeredUser, setRegisteredUser] = useState(null); // state untuk menyimpan data user yang telah terdaftar

  const handleShowLoginModal = () => setShowLoginModal(true); // callback ketika tombol Login diklik

  const handleShowRegisterModal = () => setShowRegisterModal(true); // callback ketika tombol Register diklik

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true); // set autentikasi menjadi true
    localStorage.setItem("setIsLoggedIn", true); // simpan status autentikasi di local storage
    setLoginData({ email: "", password: "" }); // reset data login
    setShowLoginModal(false); // sembunyikan modal Login setelah berhasil login
  };

  const handleLogout = () => {
    localStorage.removeItem("setIsLoggedIn"); // hapus status autentikasi dari local storage
    setIsLoggedIn(false); // set autentikasi menjadi false
    setShowDropdown(false); // sembunyikan dropdown menu
    window.location.replace("/"); // arahkan halaman ke URL utama
  };

  const handleSuccessfulRegister = (userData) => {
    setRegisteredUser(userData); // simpan data user yang telah terdaftar
    setShowRegisterModal(false); // sembunyikan modal Register setelah registrasi berhasil
  };

  return (
    <>
      <div className="nav">
        <div className="navbaritem">
          <div className="butNav">
             {/* navigasi untuk pengguna yang belum login */}
            {isLoggedIn ? (
              <>
                {/* navigasi untuk pengguna yang sudah login */}
                <Link to="/" className="on">
                  Home
                </Link>
                <Link to="/TVshow" className="on">
                  TV Shows
                </Link>
                <Link to="/Movies" className="on">
                  Movies
                </Link>
              </>
            ) : (
              <>
                {/* button untuk login dan registrasi jika pengguna belum login */}
                <div className="clicks">
                  <Button onClick={handleShowLoginModal}>Home</Button>
                  <Button onClick={handleShowLoginModal}>TV Shows</Button>
                  <Button onClick={handleShowLoginModal}>Movies</Button>
                </div>
              </>
            )}
          </div>

          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="regLog">
            {/* tampilan ketika pengguna sudah login */}
            {isLoggedIn ? (
              <div
                className="userss"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img src={Agan} alt="user" />
              </div>
            ) : (
              <>
                {/* tampilan ketika pengguna belum login */}
                <Button className="reg" onClick={handleShowRegisterModal}>
                  Register
                </Button>
                <Button className="log" onClick={handleShowLoginModal}>
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* tampilan dropdown menu ketika pengguna sudah login */}
      {showDropdown && (
        <div className="dropdown-container">
          <div className="poly">
            <img src={PolygonIcon} alt="poly" />
          </div>
          <div className="dropdown">
            <Link to="/Profile" className="profiles">
              <img className="userx" src={ProfileIcon} alt="Profile" />
            </Link>
            <Link to="/Payment" className="profiles">
              <img className="pay" src={PayIcon} alt="Pay" />
            </Link>
            <Link className="profiles" onClick={handleLogout}>
              <img className="logx" src={LogoutIcon} alt="Logout" />
            </Link>
          </div>
        </div>
      )}

      {/* modal untuk login */}
      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          handleCloseLoginModal={() => setShowLoginModal(false)}
          registeredUser={registeredUser}
          loginData={loginData}
          setLoginData={setLoginData}
          handleSuccessfulLogin={handleSuccessfulLogin}
          handleShowRegisterModal={()=>{
            setShowRegisterModal(true)
            setShowLoginModal(false)}} 
        />
      )}

    {/* modal untuk registrasi */}
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
    </>
  );
}

export default Navbar;

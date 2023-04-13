import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("setUserData")) || []
  );

  useEffect(() => {
    const loggedInUser = localStorage.getItem("setIsLoggedIn"); //Menyimpan nilai dari key "setIsLoggedIn" di dalam localStorage ke dalam variabel loggedInUser
    if (loggedInUser) {
      //Jika nilai dari loggedInUser truthy
      setIsLoggedIn(true); //Maka setIsLoggedIn akan di-set menjadi true
    }
  }, []);
  const handleRegister = (userData) => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.fullName === "" ||
      userData.gender === "" ||
      userData.phone === "" ||
      userData.address === ""
    ) {
      alert("Registration Failed. Please fill all input fields!");
    } else {
      const newRegisteredUser = [...registeredUsers, userData];
      localStorage.setItem("setUserData", JSON.stringify(newRegisteredUser));
      setRegisteredUsers(newRegisteredUser);
      alert("Registration Successfully");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, registeredUsers, handleRegister }}
    >
      {" "}
      {/* Membuat konteks baru dengan value isLoggedIn dan setIsLoggedIn */}
      {children}{" "}
      {/* Menampilkan children atau komponen yang ada di dalam AuthContextProvider */}
    </AuthContext.Provider>
  );
}

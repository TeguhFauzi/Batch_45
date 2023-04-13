import { useState } from "react";
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { Button, Modal, Alert } from "react-bootstrap";

function RegisterModal({ handleCloseRegisterModal, handleShowLoginModal }) {
  const [message, setMessage] = useState(null);
  // const [show, setShow] = useState(false);

  // Deklarasi state untuk menyimpan data input pengguna
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
  });

  // Fungsi untuk memperbarui state userData saat ada perubahan input dari pengguna
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = useMutation(async () => {
    try {
      const response = await API.post("/register", userData);

      console.log("register success : ", response);

      const alert = (
        <Alert variant="success" className="py-1">
          Register Success!
        </Alert>
      );
      setMessage(alert);
      setUserData({
        email: "",
        password: "",
        fullName: "",
        gender: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Register Failed!
        </Alert>
      );
      setMessage(alert);
      console.log("register failed : ", err);
    }
  });

  return (
    <Modal show={true} onHide={handleCloseRegisterModal} keyboard={false}>
      {/* Bagian Header */}
      <Modal.Header>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>

      {/* Bagian Body */}
      <Modal.Body>
        <form>
          <div className="mb-1">
            <label htmlFor="email-user" className="col-form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email-user"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="password-user" className="col-form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password-user"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="fullname-user" className="col-form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullname-user"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="gender-user" className="col-form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              id="gender-user"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="phone-user" className="col-form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone-user"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="address-user" className="col-form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address-user"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Button untuk mengarahkan user ke form login jika sudah memiliki akun */}
          <Button
            className="login-link"
            variant="link"
            onClick={handleShowLoginModal}
          >
            Already have an account? Login here!
          </Button>
        </form>
      </Modal.Body>

      {/* Bagian Footer */}
      <Modal.Footer>
        {/* Button untuk mengeksekusi fungsi handleRegister saat ditekan */}
        <Button className="regist" onClick={() => handleRegister.mutate()}>
          Register
        </Button>
        {message && message}
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;


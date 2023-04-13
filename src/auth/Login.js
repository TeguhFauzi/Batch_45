
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

function LoginModal({
  handleCloseLoginModal,
  handleShowRegisterModal,
  registeredUser,
  handleSuccessfulLogin,
  onHide 
}) {
  const [_, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post('/login', form);

      console.log("login success : ", response);

      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      // Status check
      if (response.data.data.role === 'admin') {
        navigate('/complain-admin');
      } else {
        navigate('/');
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log("login failed : ", error);
    }
  });

  return (
    <Modal show={true} onHide={handleCloseLoginModal} keyboard={false}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

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
          <Button
            className="registerlink"
            variant="link"
            onClick={handleShowRegisterModal}
          >
            Don't have an account yet? Register here!
          </Button>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="login" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom' ;
import "./StaffLogin.css"

function StaffLogin() {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // renamed constant

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/stafflogin', loginDetails)
      .then((response) => {
        if (response.data.success) {
          navigate('/staff'); // use renamed constant
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Something went wrong. Please try again later.');
      });
  };

  const handleInputChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <center>
        <h1>Staff Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <h3>
            Email
            <input type="email" name="email" value={loginDetails.email} onChange={handleInputChange} required />
          </h3>
          <h3>
            Password
            <input type="password" name="password" value={loginDetails.password} onChange={handleInputChange} required />
          </h3>
          <button type="submit">Login</button>
        </form>
      </center>
    </div>
  );
}

export default StaffLogin;

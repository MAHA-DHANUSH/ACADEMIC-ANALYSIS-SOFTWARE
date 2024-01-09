import React, { useState } from 'react';
import axios from 'axios';
import "./StaffRegister.css"
function StaffRegister() {
  const [staffDetails, setStaffDetails] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to the backend to save the staff details
    axios.post('http://localhost:5000/staffregister', staffDetails)
      .then((response) => {
        console.log(response.data);
        // You can add additional logic here, like showing a success message to the user
      })
      .catch((error) => {
        console.error(error);
        // You can add additional logic here, like showing an error message to the user
      });
  };

  const handleInputChange = (event) => {
    setStaffDetails({
      ...staffDetails,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className='container'>
      <center>
        <h1>Staff Register</h1>
        <form onSubmit={handleSubmit}>
          <h3>
            Staff Name
            <input type="name" name="name" value={staffDetails.name} onChange={handleInputChange} required />
          </h3>
          <h3>
            Mobile
            <input type="mobile" name="mobile" value={staffDetails.mobile} onChange={handleInputChange} required />
          </h3>
          <h3>
            Email
            <input type="email" name="email" value={staffDetails.email} onChange={handleInputChange} required />
          </h3>
          <h3>
            Password
            <input type="password" name="password" value={staffDetails.password} onChange={handleInputChange} required />
          </h3>
          <h3>
            Confirm Password
            <input type="password" name="confirmPassword" value={staffDetails.confirmPassword} onChange={handleInputChange} required />
          </h3>
          <button type="submit">Register</button>
        </form>
      </center>
    </div>
  );
}

export default StaffRegister;

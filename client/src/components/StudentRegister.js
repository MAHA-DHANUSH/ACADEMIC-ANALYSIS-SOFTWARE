import React from 'react'
import "./StaffRegister.css"
function StudentRegister() {
  return (
    <div>
        <center>
        <h1> Student Register</h1>
        <h3>Name<input type="text"></input></h3>
        <h3>Age<input type="text"></input></h3>
        <h3>Gender <input type="text"></input></h3>
        <h3>Date of birth <input type="text"></input></h3>
        <h3>Email <input type="text"></input></h3>
        <h3>Phone Number <input type="text"></input></h3>
        <h3>Address <input type="text"></input></h3>
        <h3>Father’s Name <input type="text"></input></h3>
        <h3>Mother’s Name <input type="text"></input></h3>
        <h3>Password<input type="text"></input></h3>
      <h3>Confirm Password<input type="text"></input></h3>
      <button>Register</button>
        </center>
      
    </div>
  )
}

export default StudentRegister

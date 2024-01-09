import React from 'react';
import { BrowserRouter as Router,Route, Link, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Student from './components/Student';
import StudentRegister from './components/StudentRegister';
import StaffRegister from './components/StaffRegister';
import StaffLogin from './components/StaffLogin';
import Staff from './components/Staff';
import "./App.css"
// import StaffLogin from './components/StaffLogin';

function App() {
  return ( 
    <Router>
      <div className='container'>
        <nav className='navbar'>
        <center>
      <div>
        <h1>ACADEMIC ANALYSIS SOFTWARE</h1>
        <div style={{ textAlign: 'center' }}>
  <Link to="/" style={{ display: 'inline-block', marginRight: '25px' }}>Homepage</Link>
  <Link to="/student" style={{ display: 'inline-block', marginRight: '25px' }}>Student</Link>
  <Link to="/studentregister" style={{ display: 'inline-block', marginRight: '25px' }}>StudentRegister</Link>
  <Link to="/staffregister" style={{ display: 'inline-block', marginRight: '25px' }}>StaffRegister</Link>
  <Link to="/stafflogin" style={{ display: 'inline-block', marginRight: '25px' }}>Staff Login</Link>
  
</div>

</div>

    </center>
    </nav>
    <div className='container'>
        <Routes>
          <Route path='/' element={<Homepage/>}>
          </Route>
          <Route path='/stafflogin' element={<StaffLogin/>}>
          </Route>
          <Route path='/student' element={<Student/>}>
          </Route>
          <Route path='/studentregister' element={<StudentRegister/>}>
          </Route>
          <Route path='/staffregister' element={<StaffRegister/>}>
          </Route>
          <Route path='/staff' element={<Staff/>}>
          </Route>
        </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;

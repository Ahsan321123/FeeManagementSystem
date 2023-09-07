import React from 'react'
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';
import Allstudents from './allstudents';
import CreateStudent from './createStudent';
import CreateClass from './createClass';
import Voucher from './voucher';
import FeeReport from './feeReport';
import StaffLogin from './StaffLogin';

export default function Sidebar() {
  return (
    
   <Router>

    <div className="sidebar">
        <nav>
            <Link className='link' to='/'>Create Student</Link>
            <Link className='link' to='/allstudents'>All Students</Link>
            <Link className='link' to='/createclass'>Create Class</Link>
            <Link className='link' to='/feeReport'>Fee Report</Link>
            <Link className='link' to='/stafflogin'>Staff Login</Link>

        </nav>
    </div>
    <Routes>
        <Route path='/' element={<CreateStudent/>} ></Route>
        <Route path='/allstudents' element={<Allstudents/>} ></Route>
        <Route path='/createclass' element={<CreateClass/>} ></Route>
        <Route path='/voucher' element={<Voucher/>} ></Route>
        <Route path='/feeReport' element={<FeeReport/>} ></Route>
        <Route path='/stafflogin' element={<StaffLogin/>} ></Route>

        {/* CreateClass */}
    </Routes>
   </Router>

  )
}

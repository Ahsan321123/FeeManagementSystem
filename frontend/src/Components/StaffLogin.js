import React, { useState } from 'react'
import axios from 'axios'

export default function StaffLogin() {

  const [userName,setUserName]= useState('')
  const [password,setPassword] = useState('')
  const [campus,setCampus] = useState('')

  const handleLogin = (e)=>{
    e.preventDefault();
    const data = {userName,password,campus}
    axios.post('http://localhost:5000/api/v1/staff/login',data)
    .then((res)=>{
      console.log(res.data)
      localStorage.setItem('token',res.data.token);
    })
  }

  const signOut = ()=>{
    localStorage.clear()
  }

  return (
    <div className="container mb-4">
      {/* {loading && <Loader/>} */}
      
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Staff Login</h4>

              <form onSubmit={handleLogin}>
                
                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Username</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Username" 
                  autoComplete='off'
                  onChange={e=>{setUserName(e.target.value)}}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Password</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Enter password" 
                  autoComplete='off'
                  onChange={e=>{setPassword(e.target.value)}}

                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Campus</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Enter Campus" 
                  autoComplete='off'
                  onChange={e=>{setCampus(e.target.value)}}

                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
                
                <button onClick={signOut}>Sign out</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

import React from 'react'

export default function StaffLogin() {
  return (
    <div className="container mb-4">
      {/* {loading && <Loader/>} */}
      
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Staff Login</h4>

              <form>
                
                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Username</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Username" 
                  autoComplete='off'/>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Password</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Enter password" 
                  autoComplete='off'/>
                </div>
                
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

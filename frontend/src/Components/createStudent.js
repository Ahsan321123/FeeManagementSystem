import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import Loader from './Loader'

export default function CreateStudent() {

    const [name,setName]=useState('')
    const [studentClass,setStudentClass]=useState('')
    const [fee,setFees]=useState('');
    const [DOB,setDOB]=useState()
    const [fatherName,setFatherName]=useState('')
    const [dateOfAdmission,setDateOfAdmission]=useState()
    const [gender,setGender]=useState('')
    const [phoneNo,setPhoneNo]=useState('')
    const [address,setAddress]=useState('')
    const [CNIC,setCNIC]=useState('')
    const [GRNo,setGRNo]=useState('')
    const [classes,setClasses ]=useState()
    const [loading,setLoading] = useState(false)
    const [ grError,setGrError]=useState(null)
    const [ phoneError ,setPhoneError]=useState(null )
    const [ cnicError ,setCnicError]=useState(null )

    useEffect(()=>{
      axios.get('http://localhost:5000/api/v1/classes')
      .then(res=>{
            setClasses(res.data.classData)
         
        
})
},[])



const token = document.cookie.split('=')[1];

console.log(token)
    const handleSubmit = (e)=>{
   
      setLoading(true)
        e.preventDefault();
        const data={name,class:studentClass,fee,DOB,fatherName,dateOfAdmission,gender,
                        phoneNo,address,CNIC,GRNo}
        axios.post('http://localhost:5000/api/v1/students',data,{
          headers:{
            'x-auth-token': token
          }
        },).then(res=>{
            console.log(res.data);
            console.log(res.headers)
            setLoading(false)
            setGrError(null)
            toast.success("Student created",{
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000 
            })
        }).catch(e => {
          if (e.response) {
              if (e.response.data.message.includes("CNIC Number should be 13 digits")) {
                  setCnicError(e.response.data.message.split(': phoneNo: Phone Number incorrect ')[1]);
              } else if (e.response.data.message.includes("some other error")) {
                  setPhoneError(e.response.data.message);
              } else if (e.response.data.message === "student with this GrNo# already exist") {
                  setGrError(e.response.data.message );
              }
              toast.error(e.response.data.message, {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 2000
              });
          }
      });
    }

  return (
    <div className="container mb-4">
      {loading && <Loader/>}
      
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Create Student</h4>
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Student Name</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Enter student name" 
                  onChange={e=>{setName(e.target.value)}}
                  autoComplete='off'/>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Father Name</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Enter Father name" 
                  onChange={e=>{ 
                  
                    setFatherName(e.target.value)}}
                  autoComplete='off'/>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">GRNo.</label>
                  <input type="number" 
                  className={`form-control ${grError ? "is-invalid" : ""}`}
                  id="inputName" 
                  placeholder="Enter GRNo" 
                  onChange={e=>{
                    setGrError(null)
                    setGRNo(e.target.value)}}
                  autoComplete='off'/>
                       {grError && <div className="text-danger">{grError}</div>}
                </div>
           
                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Date of Admission</label>
                  <input type="date" className="form-control" id="inputName" 
                  placeholder="Date of Admission" 
                  onChange={e=>{setDateOfAdmission(e.target.value)}}
                  autoComplete='off'/>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" id="inputName" 
                  placeholder="Date of Birth" 
                  onChange={e=>{setDOB(e.target.value)}}
                  autoComplete='off'/>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Gender</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Gender" 
                  onChange={e=>{setGender(e.target.value)}}
                  autoComplete='off'/>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Phone No.</label>
                  <input type="number" className="form-control" id="inputName" 
                  placeholder="Phone No." 
                  onChange={e=>{setPhoneNo(e.target.value)}}
                  autoComplete='off'/>
                      {phoneError && <div className="text-danger">{phoneError}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">CNIC</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="CNIC" 
                  onChange={e=>{setCNIC(e.target.value)}}
                  autoComplete='off'/>
                  {cnicError && <div className="text-danger">{cnicError}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">Address</label>
                  <input type="text" className="form-control" id="inputName" 
                  placeholder="Address" 
                  onChange={e=>{setAddress(e.target.value)}}
                  autoComplete='off'/>
                </div>

                <div className="mb-3">
   <label htmlFor="inputClass" className="form-label">Class</label>
   <select 
      id="inputClass" 
      className="form-control" 
      onChange={e => setStudentClass(e.target.value)}
   >
      <option value="">Select Class </option>
      {classes && classes.map((classList, index) => (
         <option key={index} value={classList.className}>
         {classList.className}
         </option>
      ))}
   </select>
</div>

                <div className="mb-3">
                  <label htmlFor="inputFees" className="form-label">Fees</label>
                  <input type="number" className="form-control" id="inputFees" 
                  placeholder="Enter fees" 
                  onChange={e=>{setFees(e.target.value)}}
                  autoComplete='off'/>
                </div>
                
                <div className="d-grid gap-2">
                  <button  style={{   backgroundColor:'#2c3e50'}} type="submit" className="btn btn-primary">Save Student</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
)
}

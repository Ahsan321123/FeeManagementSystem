import { useState } from "react"
import React from 'react'
import axios from 'axios'
const FeeReport = () => {
   const[startDate,setStartDate]=useState("")
   const[endDate,setEndDate]=useState("")
    const [students,setStudents]=useState([])
   const [ grNum,setGrNum]=useState()
   const [filterByGr,setFilterByGr]=useState([])
   const [displayStudents,setDisplayStudents]=useState([])
console.log(displayStudents)
   const handleDate= async(e)=>{
    e.preventDefault()
    if(startDate,endDate){
        await axios.get(`http://localhost:5000/api/v1/student/feeReport?startDate=${startDate}&endDate=${endDate}`).then((res)=>{
            setStudents(res.data.data)
             setDisplayStudents(res.data.data)}  )   }else{
            console.log( "undefined start and end Date")
        }
     
    
    }
    const handleGrNum=(e)=>{
        e.preventDefault()
     if(students){const student= students.filter((s)=>s.GRNo  == grNum )
        setFilterByGr(student)
        setDisplayStudents(student)
} 

    }

    const handleReset=()=>{
        setStartDate("")
        setEndDate("") 
    }



  return (
    <>
        
    <div className="row justify-content-end mx-5 my-4">
    <div className="col-md-3">
    {students.length>0 && <div className="col-md-4">
            <label htmlFor="grNum" className="d-block mb-1">
              Filter by Gr:
            </label>
            <form onSubmit={handleGrNum} className="d-flex align-items-center">
              <input
              required
                id="grNum"
                className="form-control mx-2"
                style={{ flex: "1 0 60%" }}
                type="number"
                value={grNum}
                onChange={(e) => setGrNum(e.target.value)}
              />
               <button className="btn btn-primary" type="submit">
                Search
              </button>
              </form>

              </div> }
   
    <form onSubmit={(e)=>handleDate(e)} >
    <div className="mb-3">
 
    <label htmlFor="inputName" className="form-label">
      Date
    </label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="form-control"
      id="inputName"
      autoComplete="off"
    />
  </div>
  <div className="mb-3">
    <label htmlFor="inputName" className="form-label">
      Date
    </label>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="form-control"
      id="inputName"
      autoComplete="off"
    />
         <button className="btn btn-primary" type="submit">
                Generate Report
              </button>

              <button className="btn btn-primary" onClick={handleReset }>
                Reset
              </button>
  </div>
  </form>
  </div>
  </div>



 {
 
 displayStudents.map((s)=>(
    <div className="card w-50 mx-auto my-3" >
    <h5 className="card-header d-flex justify-content-between">
      Name: {s.studentName}
      <span> Date:{new Date(s.date).toISOString().split('T')[0]} </span>
    </h5>
    <div className="card-body">
     
  </div>
  <div className="card-body">
  <h5 className="card-title">Bank {s.bankName}</h5> 
  
      
          </div>
  </div>
))

}  


 </>
  )
}

export default FeeReport
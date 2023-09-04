import { useState } from "react"
import React from 'react'
import axios from 'axios'
import {CSVLink} from 'react-csv'

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

    if(startDate,endDate)
    {
        await axios.get(`http://localhost:5000/api/v1/student/feeReport?startDate=${startDate}&endDate=${endDate}`)
        .then((res)=>{
          setStudents(res.data.data)
          setDisplayStudents(res.data.data)}  )   
    }
    else{
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

    const headers = ['Name','GRNO','Fee Status','Date']

  return (
    <>
        
    <div className="row justify-content-end mx-5 my-4">
    <div className="col-md-3">
  
    { students.length>2 && 
    
    <div className="col-md-4">
            
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
  displayStudents.length > 0 ? (
  <> 
    <table className="table-container">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th scope="col" key={index}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {displayStudents.map(student=>(
          <tr key={student._id}>
            <th scope="row">{student.studentName}</th>
            <th scope="row">{student.GRNo}</th>
            <th scope="row">{student.status}</th>
            <th scope="row">{student.date}</th>

          </tr>
        ))}
      </tbody>

  </table>
  
  
  <CSVLink data={displayStudents}filename="paid_student.csv" className="csv-btn btn-primary">
            Download
 </CSVLink>


  </>)
  
  : 

(  <div className="text-center">no data</div>
)  
}  

 </>
  )
}

export default FeeReport
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
          setDisplayStudents(res.data.data)
          setStartDate("")
          setEndDate("")   
        }  )   
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

    const headers = ['Name','GRNO','Fee Status','Date']

  return (
  <>
  {students.length > 2 && (
    <div className="w-50 mx-auto my-3">
      
      <label htmlFor="grNum" className="ms-2 mb-2">
                  Filter by Gr:
      </label>
        
      <form onSubmit={handleGrNum} className="form-inline d-flex justify-content-between">
          
          <input
          required
            id="grNum"
            className="form-control mx-2"
            type="number"
            value={grNum}
            onChange={(e) => setGrNum(e.target.value)}
          />

            <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
    </div>
  )}
    
        
    <div className="row my-4">
    
    <div className="col">
  
   
    <form onSubmit={(e)=>handleDate(e)}  className="w-50 mx-auto d-flex align-items-end">
    
      <div className="col">
  
      <label htmlFor="inputName" className="form-label">
        Start Date
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="form-control"
        id="inputName"
        autoComplete="off"
        required
      />
    </div>

    <div className="col ms-2">
      <label htmlFor="inputName" className="form-label">
        End Date
      </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="form-control"
        id="inputName"
        autoComplete="off"
        required
      /> 
    </div>

    <div>
      <div class="col ms-2">
        <button class="btn btn-primary">Generate Report</button>
      </div>
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

(  
  <div className="msg-container">
    <div className="no-data-message">Select start and end date to display data</div>
  </div>

)  
}  

 </>
  )
}

export default FeeReport
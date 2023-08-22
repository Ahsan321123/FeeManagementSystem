import React, { useState, useEffect } from 'react';
import axios from "axios";
import Voucher from '../Components/voucher'
import { useNavigate } from 'react-router-dom';

export default function Allstudents() {  
    
    const [allStudent, setAllStudent] = useState([]);
    const [classFilter, setClassFilter] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [grNum, setGrNum] = useState();
    const [filterByGr, setFilterByGr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [studentId, setStudentID] = useState();
    const [bankName, setBankName] = useState("");
    const [date, setDate] = useState();
    const [status, setStatus] = useState();
    const [ batchVouchers,setBatchVouchers]=useState([])
    const [batchStudents,setBatchStudents]=useState([])

    const fetchStudents = async () => {
        const { data } = await axios.get('http://localhost:5000/api/v1/students');
        setAllStudent(data.allStudents);
    }

    const fetchFilteredStudentsByClass = async (className) => {
        const { data } = await axios.get(`http://localhost:5000/api/v1/students?className=${className}`);
        setFilterData(data.student);
    }

    useEffect(() => {
        fetchStudents();

        if (classFilter && classFilter !== "All Classes") {
            fetchFilteredStudentsByClass(classFilter);
        } else {
            setFilterData([]);
        }

        if (grNum) {
            axios.get(`http://localhost:5000/api/v1/students?GRNo=${grNum}`)
                .then(res => setFilterByGr(res.data.student));
        }
    }, [classFilter, grNum]);

    const handleUpdate = (id) => {
        setStudentID(id);
        setShowModal(true);
    }

    //**** Generate Voucher for specific Student  */ 
const navigate=useNavigate()
    const handleVoucher = async  (id,student) => {
   await axios.get(`http://localhost:5000/api/v1/student/${id}/voucher`).then(res => {
            // passing student data and navigating
            console.log(res.data)
            navigate( '/voucher', {state: {studentData:student ,voucherData:res.data,from:"generateSingle"}})
        });
        
        setStudentID(id)
           

   }
// **********
    const handleClassFilterChange = (event) => {
        setClassFilter(event.target.value);
    }

    const handleGrNum = (e) => {
        e.preventDefault();
        let url = `http://localhost:5000/api/v1/students?GRNo=${grNum}`;
        axios.get(url).then(res => setFilterByGr(res.data.student));
    }

    const handleModalSubmit = (e) => {
      e.preventDefault();
      const id = studentId;
      const data = { bankName, date, status };
      let url = `http://localhost:5000/api/v1/student/${id}/updateStatus`;
      axios.post(url, data).then(response => {
          const updatedStudent = response.data.student;
          const updateList = (list) => list.map(student => {
              if (student._id === updatedStudent._id) {
                  return updatedStudent;
              }
              return student;
          });
  
          setAllStudent(prevStudents => updateList(prevStudents));
          setFilterData(prevFilterData => updateList(prevFilterData));
          setFilterByGr(prevFilterByGr => updateList(prevFilterByGr));
  
          setShowModal(false);
      }).catch(error => {
          console.error("Error updating status:", error);
      });
  }
   

    const renderStudents = (studentsList) => (
        studentsList.map(student => (
            <div className="card w-50 mx-auto my-3" key={student._id}>
                <h5 className="card-header d-flex justify-content-between">
                    {student.name}
                    <span>Fee Status : {student.status}</span>
                </h5>

                <div className="card-body">
                    <h5 className="card-title">Class {student.className}</h5>
                    <button className="btn btn-primary" onClick={() => handleUpdate(student._id)}>Update fee status</button>
                    <button className="btn btn-primary mx-2" onClick={() => handleVoucher(student._id,student   )}>Generate Voucher</button>
                </div>
            </div>
        ))
    );

    const uniqueClasses = [...new Set(allStudent.map(student => student.className))];


// Generate All Vouchers 


const  handleVouchersAll=(data)=>{

const stundetIds=data.map((student)=>{
return student._id  
}) 
generateAllVouchers(stundetIds)
}

const generateAllVouchers=async(StudentIds)=>{
 await axios.post('http://localhost:5000/api/v1/student/generateBatchVouchers',{StudentIds} ).then(res=>{


// console.log(res.data.students)
// console.log(res.data.vouchers)
  navigate('/voucher',{state:{ studentsData:res.data.students,vouchersData:res.data.vouchers,from:"generateAll" }}  )


})

}

// ***********



  
    return (
        <>
            <div>
                <div className='row justify-content-end mx-5 my-4'>
                    <div className="col-md-3">
                        <label htmlFor="classFilter" className='d-block mb-1'>Filter by Class:</label>
                        <select className='form-select' id="classFilter" value={classFilter} onChange={handleClassFilterChange}>
                            <option value="">All Classes</option>
                            {uniqueClasses.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="grNum" className='d-block mb-1'>Filter by Gr:</label>
                        <form onSubmit={handleGrNum} className="d-flex align-items-center">
                            <input id="grNum" className="form-control mx-2" style={{ flex: "1 0 60%" }} type='number' value={grNum} onChange={e => setGrNum(e.target.value)} />
                            <button className="btn btn-primary" type='submit'>Search</button>
                        </form>
                    </div>
                </div>

                {filterByGr.length > 0 ? renderStudents(filterByGr) : filterData.length > 0 ? renderStudents(filterData) : renderStudents(allStudent)}
       

                {showModal && (
                    <div className="modal show d-block blurred-background" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Update Fee Status</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleModalSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="inputName" className="form-label">Bank Name</label>
                                            <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="form-control" id="inputName" placeholder="Enter bank name" autoComplete='off' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputName" className="form-label">Date</label>
                                            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className="form-control" id="inputName" autoComplete='off' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputName" className="form-label">Status</label>
                                            <select className='form-select' id="inputName" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <option value="Pending">Pending</option>
                                                <option value="Paid">Paid</option>
                                         
                                            </select>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            { filterData.length>0 && <div className="d-flex justify-content-end mt-1" >
    { filterData.length > 0 && 
        <button className="btn btn-primary mx-2 " onClick={() => handleVouchersAll(filterData)}>
            Generate All Vouchers
        </button> 
    }
</div>   }
            {/* { batchVouchers.length >0 && <Voucher vouchers={batchVouchers}   students={batchStudents} />  } */}
        </>
    );
}

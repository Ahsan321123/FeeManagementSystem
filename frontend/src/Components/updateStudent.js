import React, { useState } from "react";
import axios from 'axios'
const UpdateStudent = ({ student,setUpdateModal,updatedStudent,classes }) => {
  const [studentId, setStudentId] = useState(student.Id);
  const [studentData,setStudentData]=useState( {
name:student.name,
className:student.className
}  )
console.log(classes)
const handleModalSubmit= async(e)=>{
// Api call 
e.preventDefault()
await axios.post(`http://localhost:5000/api/v1/studentnew/${student._id}/updateStudent`, studentData)
  .then(res => {
    console.log("Received from backend:", res.data);
    updatedStudent(res.data);
  })
  .catch(err => {
    console.error("Error updating student:", err);
  });
setUpdateModal(false)


}


  console.log(student);
  return (
    <div>
      <div className="modal show d-block blurred-background" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Student Name</h5>

            </div>
            <div className="modal-body">
              <form onSubmit={(e)=> handleModalSubmit(e) }>
              <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={studentData.name}
                    onChange={(e) => setStudentData( prevData=>({ ...prevData,name:e.target.value }) )}
                    className="form-control"
                    id="inputName"
                    placeholder="Enter bank name"
                    autoComplete="off"
                  />
                </div>
                
               
   { <div className="mb-3"  >
   <label htmlFor="inputClass" className="form-label">Class</label>
   <select 
      id="inputClass" 
      className="form-control" 
      onChange={e => setStudentData(prevClass=> ({ ...prevClass,className:e.target.value }) )}
   >
      <option>{studentData.className}</option>
     
      {
      classes && classes.map((classList, index) => (
         /* condition to check kay class wala drop down me already jo class select hai wo to nhi arhi agr alag hain to drop down show hoga  */
        studentData.className !== classList.className &&(
         <option key={index} value={classList.className} >
         {classList.className}
         </option>
        )
      ))}
   </select>
</div> }
                   <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setUpdateModal(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;

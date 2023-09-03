import React, { useState } from "react";
import axios from "axios";
const UpdateStudent = ({
  student,
  setUpdateModal,
  updatedStudent,
  classes,
}) => {
  const [studentId, setStudentId] = useState(student.Id);
  const [studentData, setStudentData] = useState({
    name: student.name,
    className: student.className,
    GRNo: student.GRNo,
    address: student.address,
    dateOfAdmission: student.dateOfAdmission,
    fatherName: student.fatherName,
    fee: student.fee,
    gender: student.gender,
    phoneNo: student.phoneNo,
    CNIC: student.CNIC,
    DOB:student.DOB,
    dateOfAdmission:student.dateOfAdmission
  
  });

  const handleModalSubmit = async (e) => {
    // Api call
    e.preventDefault();
    await axios
      .post(
        `http://localhost:5000/api/v1/studentnew/${student._id}/updateStudent`,
        studentData
      )
      .then((res) => {
        console.log("Received from backend:", res.data);
        updatedStudent(res.data);
      })
      .catch((err) => {
        console.error("Error updating student:", err);
      });
    setUpdateModal(false);
  };

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
              <form onSubmit={(e) => handleModalSubmit(e)}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="inputName" className="form-label">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={studentData.name}
                      onChange={(e) =>
                        setStudentData((prevData) => ({
                          ...prevData,
                          name: e.target.value,
                        }))
                      }
                      className="form-control"
                      id="inputName"
                      placeholder="Enter student name"
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="inputClass" className="form-label">
                      Class
                    </label>
                    <select
                      id="inputClass"
                      className="form-control"
                      onChange={(e) =>
                        setStudentData((prevClass) => ({
                          ...prevClass,
                          className: e.target.value,
                        }))
                      }
                    >
                      <option>{studentData.className}</option>
                      {classes &&
                        classes.map(
                          (classList, index) =>
                            studentData.className !== classList.className && (
                              <option key={index} value={classList.className}>
                                {classList.className}
                              </option>
                            )
                        )}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    GRNo.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputName"
                    value={studentData.GRNo}
                    placeholder="Enter GRNo"
                    onChange={(e) => {
                      setStudentData((prev) => ({
                        ...prev,
                        GRNo: e.target.value,
                      }));
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Date of Admission
                  </label>
                  <input
                  value={new Date(studentData.dateOfAdmission).toISOString().split("T")[0] }
                    type="date"
                    className="form-control"
                    id="inputName"
                    placeholder="Date of Admission"
             
                     onChange={ e=>{ setStudentData(prev=>({
                      ...prev,
                      dateOfAdmission:e.target.value
                     })) } }
                    autoComplete="off"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Date of Birth
                  </label>
                  <input
                  
                    value={ new Date(studentData.DOB).toISOString().split("T")[0]  }
                    type="date"
                    className="form-control"
                    id="inputName"
                    placeholder="Date of Birth"
                     onChange={ e=>{ setStudentData(prev=>({
                      ...prev,
                      DOB:e.target.value
                     })) } }
                    autoComplete="off"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={studentData.gender}
                    placeholder="Gender"
                    onChange={(e) => {
                      setStudentData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }));
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Phone No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputName"
                    value={studentData.phoneNo}
                    placeholder="Phone No."
                    onChange={(e) => {
                      setStudentData((prev) => ({
                        ...prev,
                        phoneNo: e.target.value,
                      }));
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    CNIC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="CNIC"
                    value={studentData.CNIC}
                    onChange={(e) => {
                      setStudentData((prev) => ({
                        ...prev,
                        phoneNo: e.target.value,
                      }));
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Address"
                    value={studentData.address}
                    onChange={(e) => {
                      setStudentData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }));
                    }}
                    autoComplete="off"
                  />
                </div>

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

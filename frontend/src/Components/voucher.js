import React, { useState } from 'react';



const Voucher = ({ student, closeModal }) => {
  

  console.log(student);

  const handleModalSubmit = (e) => {
    e.preventDefault();
 
  };




  return (
    <div className="modal show d-block blurred-background" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Generate Voucher</h5>
 
          </div>
          <div className="modal-body">
            <form onSubmit={handleModalSubmit}>
              <div className="mb-3">
                <label htmlFor="inputBankName" className="form-label">Student Name</label>
                <input type="text" className="form-control" id="inputBankName" value={student.name} autoComplete='off'   disabled/>
              </div>
           
              <div className="mb-3">
                <label htmlFor="inputStatus" className="form-label">Class</label>
                <input type="text" className="form-control" id="inputBankName" value={student.className} autoComplete='off'   disabled/>
              </div>

              <div className="mb-3">
                <label htmlFor="inputDate" className="form-label">Date</label>
                <input type='date' className="form-control" id="inputDate" autoComplete='off' />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Save changes</button>
                <button onClick={closeModal}  type="submit" className="btn btn-primary">close</button>
        
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voucher;

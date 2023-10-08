import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Loader from "./Loader";
import FeeReportPDF from "./FeeReportPDF";
import { PDFViewer } from "@react-pdf/renderer";

const FeeReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [students, setStudents] = useState([]);
  const [grNum, setGrNum] = useState("");
  const [filterByGr, setFilterByGr] = useState([]);
  const [displayStudents, setDisplayStudents] = useState([]);
  const [feeStatus, setFeeStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [showPDF, setShowPDF] = useState(false);


  const token = document.cookie.split("=")[1];

  const handleDate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if ((startDate, endDate)) {
        await axios
          .get(
            `http://localhost:5000/api/v1/student/feeReport?startDate=${startDate}&endDate=${endDate}`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          )
          .then((res) => {
            const allFeeStatus = res.data.data.map(
              (student) => student.feeStatus
            );
            setFeeStatus(allFeeStatus);

            setStudents(res.data.data);
            setDisplayStudents(res.data.data);
            setLoading(false);
            if (res.data.data.length === 0) {
              toast.error("No Students Found", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
              });
            }
          });
      } else {
        console.log("undefined start and end Date");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGrNum = (e) => {
    e.preventDefault();
    if (grNum === "") {
      setDisplayStudents(students);
    }

    if (students) {
      const student = students.filter((s) => s.GRNo == grNum);
      setFilterByGr(student);
      setDisplayStudents(student);
    }
  };

  // convert Date Format

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }

  const formattedStartDate = convertDate(startDate);
  const formattedEndDate = convertDate(endDate);

  const headers = [
    "Name",
    "GRNO",
    "Month",
    "Fee Status",
    "Date",
    "Month",
    "Fee Status",
    "Date",
    "Month",
    "Fee Status",
    "Date",
  ];

  return (
    <>
      {loading && <Loader />}
      {students.length > 0 && (
        <div className="w-50 mx-auto my-3">
          <label htmlFor="grNum" className="ms-2 mb-2">
            Filter by Gr:
          </label>

          <form
            onSubmit={handleGrNum}
            className="form-inline d-flex justify-content-between"
          >
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
          <form
            onSubmit={(e) => handleDate(e)}
            className="w-50 mx-auto d-flex align-items-end"
          >
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
                <button
                  style={{ backgroundColor: "#2c3e50" }}
                  class="btn btn-primary"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {displayStudents.length > 0 ? (
        <>
          <table className="table-container">
            <thead>
              <tr>
                <th>Name</th>
                <th>GRNO</th>
                <th>Fee Details</th>
              </tr>
            </thead>
            <tbody>
              {displayStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentName}</td>
                  <td>{student.GRNo}</td>

                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Fee Status</th>
                          <th>Date</th>
                          <th>Fee Received</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.feeStatus
                          .filter((status) => {
                            const paymentDate =
                              status.date &&
                              new Date(status.date.split("T")[0]);
                            return (
                              paymentDate >= new Date(formattedStartDate) &&
                              paymentDate <= new Date(formattedEndDate)
                            );
                          })
                          .map((status) => (
                            <tr key={status._id}>
                              <td>{status.month}</td>
                              <td>{status.status}</td>
                              <td> {status.date.split("T")[0]}</td>
                              <td>{status.feeReceived}</td>
                              {console.log(status)}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

         
        </>
      ) : (
        <div className="msg-container">
          <div className="no-data-message">
            Select start and end date to display data
          </div>
        </div>
      )}
{ displayStudents.length>0 && 
<button  className="csv-btn btn-primary mx-4" onClick={()=>setShowPDF(true)} > Show pdf  </button>
}
{showPDF && 

<PDFViewer width="100%" height="600">
<FeeReportPDF  students={displayStudents} /> 

</PDFViewer>
}


    </>
  );
};

export default FeeReport;

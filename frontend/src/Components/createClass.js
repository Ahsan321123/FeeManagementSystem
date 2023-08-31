import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify'
import Loader from './Loader';

const CreateClass = () => {
  const [classes, setClasses] = useState('');
  const [loading,setLoading]= useState(false);

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    const url = 'http://localhost:5000/api/v1/create/class';
    axios.post(url, { className: classes })
    .then(()=>{
      setLoading(false)
      toast.success('Class created',{
        position:toast.POSITION.TOP_CENTER,
        autoClose:2000
      })
    }).catch(()=>{
      toast.error('Class not created',{
        position:toast.POSITION.TOP_CENTER,
        autoClose:2000
      })
    });  // Assuming you want to send data as an object
  };

  return (
    <div className="container mt-5">
         {loading && (<Loader/>)}
          {!loading && (
            <div className="row justify-content-center">
            <div className="col-md-6">  {/* This ensures the form takes up only half of the viewport on medium and above screens. */}
              <form onSubmit={handleSubmit} >
                <div className="mb-3">
                  <label htmlFor="className" className="form-label">Class Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="className" 
                    value={classes} 
                    onChange={(e) => setClasses(e.target.value)} 
                  />
                </div>
                <button type="submit" className="btn btn-primary">ADD</button>
              </form>
            </div>
            </div>
          )}
       

    </div>
       
       )
}

export default CreateClass;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation,Navigate } from 'react-router-dom';
import Sidebar from './Components/sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allstudents from './Components/allstudents';
import CreateStudent from './Components/createStudent';
import CreateClass from './Components/createClass';
import Voucher from './Components/voucher';
import FeeReport from './Components/feeReport';
import StaffLogin from './Components/StaffLogin';
import {useSelector} from 'react-redux'
import { ProtactedRoutes } from './Components/redux/protactedRoutes';
import { useEffect } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import AdminLogin from './Components/admin/AdminLogin';
import CreateStaff from './Components/admin/CreateStaff';


function App() {
 
      

const {isAuthenticated}= useSelector(state=>state.root)
const {role}= useSelector(state=>state.root)



    return (
        <Router>
            <Routes>
              <Route path='/adminLogin' element={<AdminLogin/>}  />

              </Routes>
            <AppContent  role={role}  isAuthenticated={isAuthenticated} />
        </Router>
    );
}


function AppContent({ role, isAuthenticated }) {
    const [loading,setLoading]=useState(false)
    const location = useLocation();


    const dispatch=useDispatch()
    useEffect(() => {
        async function verifyToken(){
            try {
                const token = document.cookie.split("=")[1];
                if (token) {
                    setLoading(true);
                    let savedRole= localStorage.getItem("role") 
                    const endpoint= savedRole === "admin" ?  'http://localhost:5000/api/v1/auth/verifyAdmin' : 'http://localhost:5000/api/v1/auth/verify'
               const response=  await axios.get(endpoint, {
                        headers: {
                            'x-auth-token': token
                        }
                    })
                        if (response.data.success == true) {
                            if(response.data.message=="Admin Token is valid"){
                                dispatch({
                                    type:"setRole",
                                    payload:{
                                        userName:"admin"
                                    }
                                })
                                
                            }
                        dispatch({
                                type: "login",
                                payload: {
                                    userName: response.data.userName,
                                    campus: response.data.campus
                                }
                                
                            });
                      
                        } else {
                            dispatch({ type: "logout" });
                        }
                        setLoading(false);
                    
                } else {
                    setLoading(false); // Set loading to false if there's no token.
                }
            } catch (err) {
                dispatch({ type: "logout" });
                setLoading(false); // Set loading to false if there's an error.
            }
    
        }
        verifyToken()
            }, []);
    


    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (role === "admin" ) {
        return (
            <div className="App">
                <Sidebar className="sidebar" />
                <ToastContainer />
            
            </div>
        );
    }
    if (!isAuthenticated) {
        return (
            <div className="App">
                <ToastContainer />
                <Routes>
              
                    <Route path='/' element={<StaffLogin />} />
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Routes>
            </div>
        );
    }

    return (
        <div className="App">
          


            { isAuthenticated && location.pathname !== '/stafflogin' && <Sidebar className="sidebar" />}
            <ToastContainer />
            <Routes>
      
                <Route element={<ProtactedRoutes isAuthenticated={isAuthenticated} />}>
             {/* agr protected route me hain to access na krpain staff login  */}
                <Route path='/' element={<Navigate to="/createStudent" replace />} />
                    <Route path='/createStudent' element={<CreateStudent />} />
                    <Route path='/allstudents' element={<Allstudents />} />
                    <Route path='/createclass' element={<CreateClass />} />
                    <Route path='/voucher' element={<Voucher />} />
                    <Route path='/feeReport' element={<FeeReport />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

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


function App() {
 
    


     
  
        

const {isAuthenticated}= useSelector(state=>state.root)

    return (
        <Router>
            <AppContent  isAuthenticated={isAuthenticated} />
        </Router>
    );
}



function AppContent({ isAuthenticated }) {
    const [loading,setLoading]=useState(false)
    const location = useLocation();


    const dispatch=useDispatch()
    useEffect(() => {
        async function verifyToken(){
            try {
                const token = document.cookie.split("=")[1];
                if (token) {
                    setLoading(true);
               const response=  await axios.get('http://localhost:5000/api/v1/auth/verify', {
                        headers: {
                            'x-auth-token': token
                        }
                    })
                        if (response.data.success == true) {
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
    
    if (!isAuthenticated) {
        return (
            <div className="App">
                <ToastContainer />
                <Routes>
                    <Route path='/' element={<StaffLogin />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
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

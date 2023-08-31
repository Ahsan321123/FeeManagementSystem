import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Components/sidebar';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Components/Loader'

function App() {

  return (
    <div className="App">
      <Sidebar/>
      <ToastContainer/>
      {/* <Loader/> */}
    </div>
  );
}

export default App;

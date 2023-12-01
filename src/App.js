import {Route,Routes} from 'react-router-dom';
import Login from "./Login";
import Headers from "./Headers";
import Welcome from "./Welcome";

function App() {
 
  return (
 
      <>
        <Headers/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
        </Routes>
        
      </>
   
  );
}

export default App;

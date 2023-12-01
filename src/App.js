import {Route,Routes} from 'react-router-dom';
import Login from "./Login";
import Headers from "./Headers";
import Welcome from "./Welcome";
import Profile from './Profile';

function App() {
 
  return (
 
      <>
        <Headers/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        
      </>
   
  );
}

export default App;

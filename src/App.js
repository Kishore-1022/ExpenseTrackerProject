import {Route,Routes} from 'react-router-dom';
import Login from "./Login";
import Headers from "./Headers";
import Welcome from "./Welcome";
import Profile from './Profile';
import { useContext } from 'react';
import api from './Contextapi';

function App() {
  const ctx = useContext(api);
  console.log(ctx.token)
 
  return (
 
      <>
        {ctx.token && <Headers/>}
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        
      </>
   
  );
}

export default App;

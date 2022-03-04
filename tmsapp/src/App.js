import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/registration/Register';
import Userlist from './components/userdetails/Userlist';
import User from './components/user/User';
import Approved from './components/approved/Approved';
import Allocation from './components/allocation/Allocation';
import Calender from './components/calender/Calender';
import CustomizedDialogs from './components/dialogubox/Dialogu';
import Scheduled from './components/Scheduled/Scheduled';
import PrimarySearchAppBar from './components/homeheader/Homeheader';
import MediaCard from './components/card/Cardview';
import BasicModal from './components/card/Cardview';


function App() {
  return (
   <div>
        <Header/>
        {/* <PrimarySearchAppBar/>  */}
      <BrowserRouter>
      
<Routes>
   <Route path="/" element={<Register/>}></Route>
  <Route path="/register" element={<Register/>}></Route>
  <Route path="/userlist" element={<Userlist/>}></Route>
  <Route path="/userlist/:id" element={<User/>}></Route>
  <Route path="/approvedlist" element={<Approved/>}></Route>
  <Route path="/allocate/:_id" element={<Allocation/>}></Route>
  <Route path="/calenderview" element={<Calender/>}></Route>
  <Route path="/scheduledlist" element={<Scheduled/>}></Route>

  <Route path="/viewcard" element={<BasicModal/>}></Route>
</Routes>

      
      
      
      </BrowserRouter>

   </div>
  );
}

export default App;

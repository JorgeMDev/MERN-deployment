
import './App.css';
import {Routes, Route} from 'react-router-dom'
import CreateCustomer from './components/CreateCustomer';
import CreateRep from './components/CreateRep'
import Main from './components/Main'
import CustomerDetails from './components/CustomerDetails';
import RepTable from './components/RepTable';
import RepDetails from './components/RepDetails';
import LoginPage from './components/LoginPage';
import ModalComment from './components/ModalComment'
import VerificationTable from './components/VerificationTable';



function App() {
  return (
    
      
      <div>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/customer/new' element={<CreateCustomer/>}/>
        <Route path='/customer/:id' element={<CustomerDetails/>}/>
        <Route path='/all/reps' element={<RepTable/>}/>
        <Route path='/rep/new' element={<CreateRep/>}/>
        <Route path='/all/reps/rep/:id' element={<RepDetails/>}/>
        <Route path='/comment/new/:customerid' element={<ModalComment/>}/>
        <Route path='/verification' element={<VerificationTable/>}/>
      </Routes>
      </div>
      
   
  );
}

export default App;

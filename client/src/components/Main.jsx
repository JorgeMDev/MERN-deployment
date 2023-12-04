import axios from 'axios'
import React, {useState, useEffect} from 'react'
import AdminTable from './AdminTable'
import Histogram from './Histogram'
import { useNavigate } from 'react-router-dom'
import NavBarMui from './NavBarMui'
import Statuses from './Statuses'


const Main = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [repsWithCustomer, setRepWithCustomer] = useState([])
  const [userRole, setUserRole] = useState('')
  const [thisMonth, setThisMonth] = useState('')

  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL+'/api/customers/all', {withCredentials: true})
      .then(response=>{
        
        setCustomers(response.data)

         // Create a new Date object
      const currentDate = new Date();

      // Get the month (0-indexed, so we add 1 to get the correct month)
      const month = currentDate.getMonth() + 1;

      // Set the current month in the state
      setThisMonth(month.toString());


      })
      .catch(err=>navigate("/login"))


      //retrieve customers with reps

      axios.get(process.env.REACT_APP_API_URL+'/api/user/all/customers', {withCredentials: true})
      .then(response=>{
  
        setRepWithCustomer(response.data)
      })
      .catch(err=>console.log(err))

      axios.get(process.env.REACT_APP_API_URL+'/api/getUser', {withCredentials: true})
      .then(response=>{
        // console.log('Informacion de usuario')
        // console.log(response.data)
  
        setUserRole(response.data.role)
      })
      .catch(err=>console.log(err))

  },[])


  //update list after delete
  const filterList = (deleteId) =>{
    const updatedList = customers.filter((eachCust)=>deleteId!==eachCust._id)
    setCustomers(updatedList)
  }

  const filterByMonth = (customers) => {
    const filteredBymonth = customers.filter(item => {
     
      const itemMonth = new Date(item.dos).getMonth() + 1; // month of sale of each customer (1-12)
     
      return itemMonth == thisMonth
    });
    setCustomers(filteredBymonth);


  }

//Calculations

//Calculate all de statuses  
  let arrOfStatus = customers.map((eachRCust)=> eachRCust.status)
  let sold = 0
  let installed = 0
  let contractSigned = 0
  let paid = 0

  for (let i = 0; i < arrOfStatus.length; i++){
    if (arrOfStatus[i] === 'Sold'){
      sold++
    }
    if (arrOfStatus[i] === 'Installed'){
      installed++
    }
    if (arrOfStatus[i] === 'Contract signed'){
      contractSigned++
    }
    if (arrOfStatus[i] === 'Paid'){
      paid++
    }
  }


  return (
    <div>
      <NavBarMui/>
      <h1>Admin Dashboard Role: {userRole}</h1>
      <div>
      <Statuses sold={sold} installed={installed} contractSigned={contractSigned} paid={paid}/>
      <AdminTable customers={customers} thisMonth={thisMonth} onDelete={filterList} onFilterByMonth={filterByMonth}/>
      <Histogram repsWithCustomer={repsWithCustomer} customers={customers}/>
      </div>
    </div>
  )
}

export default Main
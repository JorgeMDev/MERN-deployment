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

  useEffect(()=>{
    axios.get('http://localhost:8000/api/customers/all', {withCredentials: true})
      .then(response=>{
        
        setCustomers(response.data)
      })
      .catch(err=>navigate("/login"))

      axios.get('http://localhost:8000/api/rep/all/customers', {withCredentials: true})
      .then(response=>{
  
        setRepWithCustomer(response.data)
      })
      .catch(err=>console.log(err))

  },[])


  //update list after delete
  const filterList = (deleteId) =>{
    const updatedList = customers.filter((eachCust)=>deleteId!==eachCust._id)
    setCustomers(updatedList)
  }




  return (
    <div>
      <NavBarMui/>
      <h1>Admin Dashboard</h1>
      <div>
      <Statuses/>
      <AdminTable customers={customers} onDelete={filterList}/>
      <Histogram repsWithCustomer={repsWithCustomer} customers={customers}/>
      </div>
    </div>
  )
}

export default Main
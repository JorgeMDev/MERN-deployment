import axios from 'axios'
import React, {useState, useEffect} from 'react'
import AdminTable from './AdminTable'
import Histogram from './Histogram'
import NavBar from './NavBar'
import { useNavigate} from 'react-router-dom'
import NavBarMui from './NavBarMui'


const Main = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState(null)
  const [customers, setCustomers] = useState([])
  const [repsWithCustomer, setRepWithCustomer] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/api/customers/all', {withCredentials: true})
      .then(response=>{
        console.log(response.data)
        setCustomers(response.data)
      })
      .catch(err=>navigate("/login"))

      axios.get('http://localhost:8000/api/rep/all/customers', {withCredentials: true})
      .then(response=>{
        console.log(response.data)
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
      <div style={{marginLeft: 150, marginRight: 150}}>
      <AdminTable customers={customers} onDelete={filterList}/>
      <Histogram repsWithCustomer={repsWithCustomer} customers={customers}/>
      </div>
    </div>
  )
}

export default Main
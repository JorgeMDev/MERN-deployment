import React from 'react'
import { Bar } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'

const Histogram = (props) => {

  //Calculate amount of total sales
    let arrOfSales = props.repsWithCustomer.map((eachRep)=> eachRep.totalCustomers.length)
    let totalSales = 0
    for (let i = 0; i < arrOfSales.length; i++){
        totalSales += arrOfSales[i]
    }

  //Calculate all de statuses  
    let arrOfStatus = props.customers.map((eachRCust)=> eachRCust.status)
    let sold = 0
    let installed = 0
    let contractSigned = 0
    let paid = 0

    for (let i = 0; i < arrOfStatus.length; i++){
      if (arrOfStatus[i] == 'Sold'){
        sold++
      }
      if (arrOfStatus[i] == 'Installed'){
        installed++
      }
      if (arrOfStatus[i] == 'Contract signed'){
        contractSigned++
      }
      if (arrOfStatus[i] == 'Paid'){
        paid++
      }
    }

    

  return (
    <div style={{display: 'flex', flexFlow: 'column wrap', maxWidth: 1000, justifyContent: 'center', alignItems: 'center'}}>
    <Bar data={{
        labels: props.repsWithCustomer.map((eachRep)=> eachRep.firstName),
        datasets: [{
            label: '# sales per rep',
            data: props.repsWithCustomer.map((eachRep)=> eachRep.totalCustomers.length),
            backgroundColor: 'blue',
            borderColor: 'black',
            borderWidth: 2,
        },],
    }}/>

    <Bar data={{
        labels: ['Sold', 'Installed', 'Contract Signed', 'Paid', 'Total Sales'],
        datasets: [{
            label: '# statuses',
            data: [sold,installed,contractSigned,paid, totalSales],
            backgroundColor: ['green','#0072BB','#F9A603', '#783201', '#355E3B'],
            borderColor: 'black',
            borderWidth: 2,
        },],
    }}/>
    </div>
  )
}

export default Histogram
import React from 'react'

const Test = () => {


    const newCookie = (event) => {
        event.preventDefault();
        axios.get(process.env.REACT_APP_API_URL + "/api/cookie")
        .then(res=> {
          console.log(res)
          })
        .catch(err => {
          console.log(err.response.data)
         
        },[])}
    
    



  return (
    <div>Prueba de componente

        <button onClick={newCookie}>Add new cookie</button>


        
    </div>
  )
}

export default Test
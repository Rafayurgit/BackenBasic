import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products, setProducts]=useState([]);
  const[error, setError]= useState(false);
  const [loading, setLoading]= useState(false);
  

  useEffect(()=>{
    ;(async()=>{
      try{
        const response = await axios.get('/api/search');
        const result=await response.json();
      }catch(error){
  
      }
    })()
  },[])

  return (
    <>
      <h1>Api Handeling</h1>


      <h2>Number of Products are {products.length}</h2>
    </>
  )
}

export default App

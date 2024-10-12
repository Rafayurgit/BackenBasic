import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [products, setProducts]=useState([]);
  const[error, setError]= useState(false);
  const [loading, setLoading]= useState(false);
  const [search, setSearch]= useState('')



  useEffect(()=>{
    const controller = new AbortController();
    
    ;(async()=>{
      try{
        setLoading(true);
        setError(false);

        const response = await axios.get('/api/get?search=' + search, {signal:controller.signal});
        setProducts(response.data)
        
        console.log(response.data);
        setLoading(false)
      }catch(error){
        if(axios.isCancel(error)){
          console.log('Request cancel', error.message)
          return
          
        }
        console.log(error.message);
        setError(true)
        setLoading(false)
        
      }
      

    })()
    return () => controller.abort();
  },[search])

  return (
    <>
      <h1>Api Handeling</h1>
      <input type="text" placeholder='search' 
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />

      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong </h1>}

      <h2>Number of Products are {products.length}</h2>
    </>
  )
}

export default App

import express from 'express';

const fetProducts=async ()=>{
    try{
        const response= await fetch('https://api.freeapi.app/api/v1/public/randomproducts');
        const result=await response.json();
        const products= result.data;
        console.log(products);
        // const response = await fetch('https://api.freeapi.app/api/v1/public/randomproducts');
        // const result = await response.json(); // Await for JSON conversion
        // const products = result.data.data;
        return products;
        
    }catch(err){
        console.log(err.message);
        return[];
        
    }
}



const app= express();
const port=process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API is running');
});



app.get('/api/get', async(req, res)=>{

    const products= await fetProducts()

    if(req.query.search){
        const filterProd= products.filter(product => product.title.toLowerCase().includes(req.query.search.toLowerCase()))
        res.send(filterProd);
        return;
    }

    setTimeout(()=>{
        res.send(products)
    },3000)
    
})

app.listen(port, ()=>{
    console.log(`Port is running on ${port}` );
    
})


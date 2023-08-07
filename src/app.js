const fs = require('fs');
const express = require('express');
const app = express();


// Importing products from products.json file
const products = JSON.parse(
    fs.readFileSync(`${__dirname}/data/product.json`)
);

app.get("PATCH/api/v1/products/:id",(req,res)=>{
    const _id=req.params.id;
    const index=products.findIndex(({id})=>id===_id);
    if(index===-1){
        res.status(404).json({msg:"product id not found"});
    }
    if(products[index].quantity===0){
        res.status(404).json({msg:"product quantity is 0"});
    }
    products[index].quantity-=1;
    fs.writeFileSync(`${__dirname}/data/product.json`,JSON.stringify(products));
    res.status(200).json({
        message: `Thank you for purchasing Product ${_id}`,
        product:products[index],
    });
});
// Middlewares
app.use(express.json());

// Write PATCH endpoint to buy a product for the client here
// Endpoint /api/v1/products/:id




module.exports = app;

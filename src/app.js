import express from 'express';
import {router as productsRouters} from "./routes/product.routers.js"
import {router as cartsRouters} from "./routes/carts.routers.js"

const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use ("/api/products", productsRouters)
app.use ("/api/carts", cartsRouters)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

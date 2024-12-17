import {Router} from "express"
import { ProductsManager } from "../dao/ProductsManager.js";
import { procesadorErrores } from "../utils.js";

export const router = Router();

ProductsManager.setPath ("./src/data/productos.json")

router.get ("/", async(req, res)=>{

    try {
        let productos= await ProductsManager.getProducts()
        
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({productos});
        
    } catch (error) {
        procesadorErrores(res, error)
    }

})

router.get ("/:id", async(req, res)=>{

    let {id}= req.params
    id=Number(id)
    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El id debe ser numerico`})
    }

    try {

        let producto= await ProductsManager.getProductsById(id)
        if (!producto){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existe el producto con id ${id}`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({producto});
        
    } catch (error) {
        procesadorErrores(res, error)
    }
    
})


router.post ("/", async (req, res)=>{

    let {
        Title,
        Description,
        Code,
        Price,
        Status=true,
        Stock,
        Category,
    }=req.body

    if(!Title || !Description || !Code || !Price || !Status || !Stock || !Category){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:"producto invalido"});

    }

    try {
        let existe = await ProductsManager.getProductsByCode(Code)
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`el producto con el codigo ${Code} ya existe`})
        }
        let newProduct =await ProductsManager.addProducts({Title,Description,Code,Price,Status,Stock,Category})

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"El producto se agrego correctamente", newProduct});
    } catch (error) {
        procesadorErrores(res, error)
    }
})




router.put ("/:id", async(req, res)=>{
    let {id}= req.params
    id=Number(id)
    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El id debe ser numerico`})
    }

    let modificar= req.body

    if (modificar.id){
       res.setHeader('Content-Type','application/json');
       return res.status(400).json({error:`No se puede modificar el id del producto`})
        
    }

    try {

        let productoModificado= await ProductsManager.modificarProducto(id,modificar)
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Producto modificado con id ${id} `,productoModificado});
        
    } catch (error) {
        procesadorErrores(res, error)
    }

})

router.delete("/:id", (req, res)=>{

    let {id} = req.params
    id= Number(id)
    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Debe indicar un valor numerico`})
    }

    try {
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Se elimino el producto con id ${req.params.id}`});
    } catch (error) {
        procesadorErrores(res,error)
    }

})



   
   
    

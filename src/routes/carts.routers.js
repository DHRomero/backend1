import {Router} from "express"
import { CartsManager } from "../dao/CartsManager.js";
import { procesadorErrores } from "../utils.js";

export const router = Router();

CartsManager.setPath ("./src/data/carrito.json")

router.get ("/", async(req, res)=>{

    try {
        let productos= await CartsManager.GetCarts()
        
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

        let producto= await CartsManager.getCartsById(id)
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

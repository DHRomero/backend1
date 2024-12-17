import {Router} from "express"
import { ProductsManager } from "../dao/ProductsManager.js";

export const router = Router();

ProductsManager.setPath ("./src/data/productos.json")
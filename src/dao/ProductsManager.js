import fs from "fs"

export class ProductsManager{
    static #path=""

    static setPath(rutaArchivo=""){
        this.#path=rutaArchivo
    }

    static async getProducts(){
        if(fs.existsSync(this.#path)){
            return JSON.parse(await fs.promises.readFile(this.#path, {encoding:"utf-8"}))
        }else{
            return[]
        }
    }

    static async getProductsById(id){
        let productos = await this.getProducts()
        let producto= productos.find (p=>p.id === id)
        return producto
    }

    static async getProductsByCode(Code){
        let productos = await this.getProducts()
        let producto= productos.find (p=>p.Code === Code)
        return producto
    }

    static async addProducts(){
       const producto = await this.getProducts();
       const nuevoProducto=
       {
        id: producto.length ? producto[producto.lengh -1].id +1:1,
        products:[]
       };

       producto.push(nuevoProducto);

       await this.#grabarArchivo(JSON.stringify(producto,null,4));
       return nuevoProducto
    }

    static async modificarProducto (id, modificaciones= {}){
        let productos = await this.getProducts()
        let indiceProductos = productos.findIndex(p=>p.id===id)
        if(indiceProductos=== -1){
            throw new Error(`producto ya existente con el id ${id}`)
        }

        productos[indiceProductos]={
            ...productos[indiceProductos],
            ...modificaciones,
            id
        }

        await this.#grabarArchivo(JSON.stringify(productos, null,5))
        return productos [indiceProductos]
    }

    static async deleteProduct(id){
        let products= await this.getProducts()
        let productIndex = ProductsManager.findIndex(p=>p.id===id)
        if (productIndex=== -1){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`Producto no encontrado`})
        }
        products.splice(productIndex,1);

        await this.#grabarArchivo(JSON.stringify(products, null, 5))
        return productIndex
    }

 
    static async #grabarArchivo (datos=""){
        if(typeof datos!= "string"){
            throw new Error ("error metodo grabarArchivo - argumento con formato invalido")
        }
        await fs.promises.writeFile(this.#path,datos)
    }
}
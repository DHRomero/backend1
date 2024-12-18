import fs from "fs"

export class CartsManager{

    static #path = "";

    static setPath (path = ""){
        this.#path = path;
    }

    static async GetCarts(){
        if (!fs.existsSync(this.#path)){
            handleError(404, "file not found");
            return [];
        }

        const data = await fs.promises.readFile(this.#path, "utf-8");
        return JSON.parse(data);
    }

    static async getCartsById(id){
        let productos = await this.GetCarts()
        let producto= productos.find (p=>p.id === id)
        return producto
    }

    static async #SaveFile (datos=""){
        if(typeof datos!= "string"){
            throw new Error ("error metodo grabarArchivo - argumento con formato invalido")
        }
        await fs.promises.writeFile(this.#path,datos)
    }
}

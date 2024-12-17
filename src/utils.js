export const procesadorErrores=(res,error)=>{
    console.log(error);
    
    res.setHeader('Content-Type','application/json');
    return res.status(500).json({error:`error en el servidor`})
}
const miexpress= require('express')
const miServidor= miexpress()

miServidor.use(miexpress.urlencoded({extended:true}))
 miServidor.use(miexpress.static('public'))


miServidor.post("/enviar-datos",(req,res)=>{
    const losdatos= "el nombre es "+req.body.txNombre +" y su email es "+req.body.txEmail
    console.log(losdatos)
})

miServidor.listen(3000, function(){
    console.log('servidor escuchando en el puerto 3000')
    })
const express=require('express')
const app=express()
const BodyParser=require('body-parser')
const cors=require('cors')
const bearerToken=require('express-bearer-token')
const {userrouter} = require('./routers')

const PORT= process.env.PORT || 1234

app.use(cors())
app.use(bearerToken())
app.use(BodyParser.json())
// app.use(BodyParser.urlencoded({extended:false}))//buat upload gambar
// app.use('/public',express.static('./public'))//buat upload gambar nanti

app.get('/',(req,res)=>{
    res.status(200).send('welcome to "Sight." api')
})

app.use('/user',userrouter)

app.listen(PORT,()=>console.log('Sight. aktif di '+PORT))

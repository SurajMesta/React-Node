const express= require('express')
const app= express()
const PORT = Number(process.env.PORT || 5000)
const cors= require('cors')
const router= require('./router/router')
const expressLayouts= require('express-ejs-layouts')
const mongoose= require('mongoose')
const config= require('./config/db')
const session= require('express-session')
const flash= require('connect-flash')

mongoose.Promise= global.Promise
mongoose.connect(config.DB,{useNewUrlParser:true}).then(myRes=>{
    console.log('Mongoose Connection Success')
},err=>{
    console.log(err)
})




app.set('views','./views')
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
//flash
app.use(flash())

//session
app.use(session({
    secret: 'secre keyword',
    resave: true,
    saveUninitialized: true
  }))

  //global variables
app.use((req,res,next)=>{
    res.locals.success_msg= req.flash('success_msg')
    res.locals.error_msg= req.flash('error_msg')
    next()
})


app.use(cors())
app.use('/',router)
app.use(expressLayouts)



app.listen(PORT,()=>{
    console.log(`Server is up and Running at PORT ${PORT}`)
})
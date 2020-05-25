const mongoose= require('mongoose')
const Schema= mongoose.Schema


let Product=new Schema({
    name:{type:String,required:true,max:20,min:3},
    email:{type:String,required:true,max:30,min:10},
    password:{type:String,required:true,max:15,min:10},
    date:{type:Date,default:Date.now},


},{
    "collection":"apcrudcoll"
})


module.exports= mongoose.model('Product',Product)
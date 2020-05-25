const joi= require('@hapi/joi')
const Product= require('../model/model')
const bcrypt= require('bcryptjs')
const url= require('url')

const schema={
    registerValidation:joi.object({
        name:joi.string().max(20).min(3).required(),
        email:joi.string().max(30).min(10).required(),
        password:joi.string().max(15).min(10),
        password2:joi.string().max(15).min(10)
    })
}




module.exports={
    home:(req,res)=>{
        res.render('welcome')
    },


    login:(req,res)=>{
        res.render('login')
    },



    layout:(req,res)=>{
        res.render('layout')
    },



    register:(req,res)=>{
        res.render('register')
    },



    registerHandle:  (req,res)=>{

        const {name,email,password,password2}=req.body
        console.log(req.body)
        let errors=[]

        const registerValid= schema.registerValidation.validate(req.body)
        if(registerValid.error){
          const errorDetail=  registerValid.error.details[0].message
     
          errors.push({msg:errorDetail})
          console.log(errors)

        }

        if(password!==password2){
            console.log('Password do not match')
            const passerr='Password do not match'
            errors.push({msg:passerr})
            console.log(errors)
        }

        if(errors.length>0){
            res.render('register',{errors,name,email,password,password2})
        }

        else{
            //validation pass

            //check if user exists

            Product.findOne({email:email}).then( (user)=>{
                if(user){
                    errors.push({msg:'Email Already Exists Please use a different one'})
                    res.render('register',{errors,name,email,password,password2})
                }

                else{
                // creating an instance of the model
                const user= new Product({name,email,password})
                console.log(user)

                bcrypt.genSalt(10,(err,salt)=> {
                    bcrypt.hash(user.password,salt,(err,hash)=>{
                        if(err) throw err

                        //setting the password to hashed password in the model
                        console.log(hash)
                        user.password=hash

                        user.save().then(user=>{
                            console.log('Data Save to Database success')
                            setTimeout(()=>{
                                req.flash('success_msg','You are successfully registered You may Login Now')
                                res.redirect('/login')
                            },10000)
                        }).catch(err=>{
                            console.log('Data Save to database failed')
                        })


                    })
                })
                
               

             }


            } )

        }




    },

    loginHandle: (req,res)=>{
    const {email,password}=req.body
    let error=[]
    
    let user=  Product.findOne({email:email}).then(user=>{
        
        if(!user){
           
            error.push({msg:'Email Does not Exist'})
            res.render('login',{error,email,password})
        }

        else{
            //password validation

            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err

                console.log(isMatch)

                if(isMatch){
                    setTimeout(()=>{
                        // req.flash('success_msg','Congratulations You are now Successfully logged In')
                        // res.redirect('dashboard',{name:user.name})
                        // res.redirect('dashboard')
                        res.redirect(url.format({
                            pathname:'/dashboard',
                           
                        }))
                    },5000)
                }

                else{
                    error.push({msg:"Password Does not match"})
                    res.render('login',{error,email,password})
                }
            })
        }
    })

    },

        
     



    welcome:(req,res)=>{
        res.render('welcome')
    },


    dashboard:(req,res)=>{
        res.render('dashboard')
    },

    logout:(req,res)=>{
        setTimeout(()=>{
            
           
            
            req.flash('success_msg','You Are Successfully Logged Out')
            res.redirect('/')
        },10000)
    }

}
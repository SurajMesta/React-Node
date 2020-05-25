const express= require('express')
const appRouter= express.Router()
const controller= require('../controller/controller')
const {authcheck}= require('../config/auth')

appRouter.route('/').get(controller.home)
appRouter.route('/login').get(controller.login)
appRouter.route('/login').post(controller.loginHandle)
appRouter.route('/layout').get(controller.layout)
appRouter.route('/register').get(controller.register)
appRouter.route('/register').post(controller.registerHandle)
appRouter.route('/welcome').get(controller.welcome)
appRouter.route('/dashboard').get(authcheck,controller.dashboard)
appRouter.route('/logout').get(controller.logout)



module.exports=appRouter
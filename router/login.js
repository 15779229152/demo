/*
 * 登录子路由
 */
 const express = require('express')
 const User = require('../model/user')
//  const login = require('../middleware/login') 使用中间件的话 若要添加新功能的可以解开注释 连接到中间件 在中间件中进行添加
//以下方法仅有匹配数据库用户数据无其他功能                                    //
//登录子应用                                                               //
 const loginApp = express()                                              //
//加载登录页面                                                           //
loginApp.get('/',(req,res)=>{                                          //
    res.render('login',{msg:''})                                      //
})                                                                   //
/***                                                                //
 * 实现登录操作
 * 该方法在中间件中也配置了 但由于功能较少暂不连接中间件直接在路由中完成//
 */
loginApp.post('/',(req,res,next)=>{
    let {username,password} = req.body
    User.login(username,password).then(results=>{
        if(results){
            //session存储（key=value）//key就是user results就是用户对象
            req.session.user = results
            res.redirect('/')
        }else{
            res.render('login',{msg:'登录失败！用户名或密码错误'})
        }
    
 }).catch(err => {
     next(err)
 })

})

 
 module.exports= loginApp
 
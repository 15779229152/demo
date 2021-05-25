/**
 * 后台首页子应用
 */
const express = require('express')
const indexApp = express()
const user = require('../../middleware/user')

indexApp.get('/',user.lastLoginTime,(req,res)=>{
    // let {user,lsatLoginTime}= req
    // res.redirect('admin/index',{user:user,lsatLoginTime:lsatLoginTime})
    //使用上方的方法可以便于后期维护修改
    res.render('admin/index',{user:req.user,lastLoginTime:req.lastLoginTime})
})








module.exports = indexApp
/**
 * 后台日志
 *管理
 */
 const express = require('express')



 const logApp =express()
 
 logApp.get('/',(req,res)=>{
     res.render('admin/log/index',{user:req.user})
 })
 
 
 
 
 
 module.exports=logApp
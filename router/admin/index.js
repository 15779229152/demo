/**
 * 后台首页子应用
 */
const express = require('express')
const indexApp = express()
const user = require('../../middleware/user')
const hit = require('../../middleware/hit')
const category = require('../../middleware/category')
const article =require('../../middleware/article')

indexApp.get('/',[user.lastLoginTime,hit.gitHit,category.gitCount,article.gitCount],(req,res)=>{
    // let {user,lsatLoginTime,hitTotal,categoryTotal,articleTotal}= req
    // res.redirect('admin/index',{user:user,lsatLoginTime:lsatLoginTime,hitTotal:hitTotal,categoryTotal:categoryTotal,articleTotal:articleTotal})
    //使用上方的方法可以便于后期维护修改
    res.render('admin/index',{user:req.user,lastLoginTime:req.lastLoginTime,hitTotal:req.hitTotal,categoryTotal:req.categoryTotal,articleTotal:req.articleTotal})
})








module.exports = indexApp
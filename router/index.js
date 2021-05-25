const express =require('express')
const article =require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth')

//首页子应用
const indexApp = express()

indexApp.use(auth.getUser)


//加载首页
indexApp.get('/',[article.getHot,article.getList,category.getList],(req,res)=>{
        let {hots,articles,categories,user} = req
        res.render('index',{hots1:hots,articles1:articles,category1:categories,user:user})
    // res.render('index',{hots1:req.hots,articles1:req.articles,category1:req.categories,user:req.user})
})

module.exports = indexApp

/***
 * 搜索模块的路由
 */

const express =require('express')
const article =require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth')

//首页子应用
const searchApp = express()
searchApp.use(auth.getUser)//第二种方法：直接在下面get方法中的[]中添加auth.getUser



//加载搜索页面
searchApp.get('/',[article.getListByKeyword,category.getList],(req,res)=>{
    // let {articles,catagories,user} = req 
    // res.render('search',{article:articles,categiries:categories,keyword:req.query.keyword,user:user})
    res.render('search',{articles:req.articles,category1:req.categories,keyword:req.query.keyword,user:req.user})//articles是中间件getListByKeyword方法中的对象
})


module.exports = searchApp

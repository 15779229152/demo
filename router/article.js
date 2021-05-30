/**
 * 文章子路由
 */
const express = require('express')
const article= require('../middleware/article')
const category =require('../middleware/category')
const auth = require('../middleware/auth')
const User = require('../model/user')


//文章子应用
const articleApp = express()

articleApp.use(category.getList,auth.getUser)


//文章首页展示列表功能
articleApp.get('/list/:id',[article.getListByCategoryId,category.getList,category.getCategoryById],(req,res)=>{
    // let{articles,categories,category,user} = req
    // res.render('list',{articles2:articles,category1:categories,category:Category,user:user})
    res.render('list',{category1:req.categories,articles2:req.articles,category0:req.Category,user:req.user})//Catagory拿到的是中间件中的getCategoryById方法中Category请求
//articles是中间件getByKeyword方法中的对象，categories是中间件中getlist方法中的对象
})                                                                                                                                      //
                                                                                                                                       //对着看看吧
//点击进入文章详情页面                                                                                                                //差不多
articleApp.get('/:id',[article.getArticleById,article.getTabs,article.getLast,article.getNext],(req,res)=>{                        //注释
    let{categories,article,tabs,Last,Next,user} = req                                                                             //面
    res.render('article',{category1:categories,article:article,tabs:tabs,Last:Last,Next:Next,user:user})                        //上
//     res.render('article'{category1:req.catagories,article:req.article,tabs:req.tabs,Last:req.Last,Next:req.Naxt,user:req.user}) //和
})


module.exports= articleApp

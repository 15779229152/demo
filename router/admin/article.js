/**
 * 后台文章管理
 */
const express = require('express')
const article = require('../../middleware/article')
const category = require('../../middleware/category')


const articleApp =express()
//article.gitCount 为之前获取文章总量所用方法 用于在分页功能上显示总文章数
articleApp.get('/',article.gitCount, (req,res,next)=>{
    let {articleTotal}= req
    let size = 3 //每页显示五条
    req.page = {}
    req.page.count = articleTotal
    req.page.total = Math.ceil( req.page.count / size)//页数
    req.page.p = req.query.p ? req.query.p : 1//如果存在参数则为req.query.p若无参数则为默认值1
    req.page.p =  req.page.p >  req.page.total ?  req.page.tolal :  req.page.p//如果大于总页码是则等于总页码数否则为req.query.p
    req.page.p= req.page.p < 1 ? 1 :  req.page.p//若小于1的话则显示1

    res.start = (req.page.p - 1) * size
    res.size = size


    next()
    
},[article.getPage,category.getList],(req,res)=>{
    let { user, pageList, page, categories } = req
    let {category_id,hot} = req.query

    page.list = pageList
    res.render('admin/article/index',{user: user, page: page, categories: categories, category_id: category_id, hot: hot})
})





module.exports=articleApp
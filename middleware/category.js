const Category = require('../model/category')

/***
     * 获取最新栏目文章中间件
     */
  module.exports ={

    /**
     * 获取文章类目列表 
     */
    getList: (req,res,next)=>{
        Category.getList().then(results=>{
        req.categories = results
        next()
    }).catch(err => {
        next(err)
    })
   },

   /**
     * 获取指定文章栏目详情
     */
    getCategoryById : (req,res,next)=>{
        let id =req.params.id
        Category.getCategoryById(id).then(results=>{
        req.Category = results
        next()
    }).catch(err => {
        next(err)
    })
   }
}
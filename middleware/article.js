const { getListByCategoryId } = require('../model/article')
const Article = require('../model/article')
const Tab = require('../model/tab')
/**
 * 文章中间件
 */
module.exports={
    //获取热门文章,then为调用方法
    // 方法中Article为引用的model（数据模型）中的article.js文件，以下其他方法也是类似
    getHot : (req,res,next)=>{
        Article.getHot(3).then(results=>{
            req.hots = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /***
     * 获取最新文章
     */
     getList : (req,res,next)=>{
        Article.getList().then(results=>{
            req.articles = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /***
     * 获取指定栏目下的文章
     */
     getListByCategoryId: (req,res,next)=>{
        let id = req.params.id
        Article.getListByCategoryId(id).then(results=>{
            req.articles = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /***
     * 获取指定关键词的文章列表
     */
     getListByKeyword: (req,res,next)=>{
        let keyword = req.query.keyword
        Article.getListByKeyword(keyword).then(results=>{
            req.articles = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /***
     * 获取指定文章功能
     */
     getArticleById: (req,res,next)=>{
        // let {id} = req.params
        let id =req.params.id
        Article.getArticleById(id).then(results=>{
            req.article = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定文章列表的中间件
     *
     */
    getTabs:(req,res,next)=>{
        // let {id} = req.params
        let id =req.params.id
        Tab.getListByArticleId(id).then(results=>{
            req.tabs = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /***
     * 上一篇文章
     */
    getLast:(req,res,next)=>{
         // let {id} = req.params
         let id =req.params.id
         Article.getLastChangeId(id).then(results=>{
             req.Last = results
             next()
         }).catch(err => {
             next(err)
         })
    },
    /***
     * 下一篇文章
     */
    getNext:(req,res,next)=>{
        // let {id} = req.params
        let id =req.params.id
        Article.getNextChangeId(id).then(results=>{
            req.Next = results
            next()
        }).catch(err => {
            next(err)
        })
   },
    /***
     * 获取总文章量
     */
   gitCount:(req,res,next)=>{
       Article.getCount(req.query.category_id,req.query.hot).then(results=>{
           req.articleTotal = results
           next()
       }).catch(err=>{
           next(err)
       })
   },
   /***
     * 获取指定页文章列表
     */
    getPage : (req,res,next)=>{
        Article.getPage(res.start,res.size,req.query.category_id,req.query.hot).then(results=>{
            req.pageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
}
 
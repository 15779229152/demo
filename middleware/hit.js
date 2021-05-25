/***
 * 访问量功能中间件
 */
const Hit = require('../model/hit')

 module.exports ={
     /***
      * 获取总访问量
      */
    gitHit:(req,res,next)=>{
        Hit.getHit().then(results=>{
            req.hitTotal = results
            next()
        }).catch(err=>{
            next(err)
        })
    }
}
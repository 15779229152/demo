/***
 * 用户中间件
 */
const UserTime= require('../model/user')

module.exports = {
    /***
     * 最后一次登录时间的获取
     * 
     */
    lastLoginTime:(req,res,next)=>{
        UserTime.lastLoginTime().then(results=>{
            req.lastLoginTime = results
            next()
        }).catch(err=>{
            next(err)
        })
    }
}
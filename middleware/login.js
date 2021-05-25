const User = require('../model/user')

/***
     * 登录界面中间件
     */
  module.exports ={
      /***
       * 匹配数据局内用户数据进行登录
       */
    login : (req,res,next)=>{
        let {username,password} =req.body
       User.login(username,password).then(results=>{
        req.redirect('/')
    }).catch(err => {
        next(err)
    })
   }
   
}
//由于登录功能比较单一 暂时未连接中间件执行 该文件未被使用 登录功能直接在路由中实现

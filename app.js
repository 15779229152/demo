const express=require('express')
const session = require('cookie-session')
const multer = require('multer')
const path = require('path')
const fs   = require('fs')

const app = express()

//上传配置
const upload = multer({
    dest: './static/upload', //上传文件的存储目录
    limits: {
        fileSize:1024 * 1024 *2 //单个文件大小限制在2M内
    }
})

app.set('view engine','html')
app.set('view',`${__dirname}/views`)
app.engine('html',require('ejs').renderFile)


//静态资源配置
app.use(express.static('static'))

//post请求处理
app.use(express.urlencoded({extended:true}))
//session配置
app.use(session({
    keys:['secret'],
    maxAge:1000 * 60 * 30
}))


//调用index.js
// app.use('/',require('./router/index'))
// app.use('/index',require('./router/index'))
app.use(/\/(index)?/,require('./router/index'))
//调用文章子应用
app.use('/article',require('./router/article'))
//调用搜索子应用
app.use('/search',require('./router/search'))
//调用登录子应用
app.use('/login',require('./router/login'))
//调用注册子应用
app.use('/register',require('./router/register'))
//进入后台的权限验证
app.use('/admin/?*',require('./middleware/auth').allowToAdmin)


//上传图片操作
app.post('/admin/*',upload.single('upload'),(req,res,next)=>{
    //对象file为上传成功后的文件对象
    let {file} = req
    if (file) {
        //file.originalname ==> 文件原名称(文件上传之前的原名称带后缀)
        let extname = path.extname(file.originalname)
        //file.path ==>上传后的文件路径(包含目录以及文件)
        fs.renameSync(file.path,file.path + extname)
        //file.filename ==>上传后的文件名(不带后缀)
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})

//调用后台首页
app.use(/\/admin\/(index)?/,require('./router/admin/index'))
//调用后台文章管理
app.use('/admin/article',require('./router/admin/article'))
//调用后台栏目管理
app.use('/admin/category',require('./router/admin/category'))
//调用后台日志管理
app.use('/admin/log',require('./router/admin/log'))
//调用后台账户管理
app.use('/admin/account',require('./router/admin/account'))

//退出操作
app.get('/user/logout',(req,res)=>{
    req.session.user = null
    return res.redirect('/index');

})

//监听服务器
app.listen(3000)
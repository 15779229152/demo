
const connection = require('../model/model')
const express = require('express');
registerApp =express()
   

registerApp.get('/',(req,res)=>{                                          //
    res.render('register',{msg:''})                                      //
})                                   
registerApp.post('/registers',(req,res)=>{
    
    var name = req.body.name;
    console.log(name)
    var password = req.body.password;
    console.log(password)
    var data = [name,password];
    console.log(data);
    // var _res = res;
    var sql_add = 'INSERT INTO user(username,password) VALUES(?,?)';//添加数据
    var sql_select = 'SELECT * FROM user WHERE username = username AND password = password';//查询数据

    var ta = true;
    var p = connection.query(sql_select);
    p.then(result => {
            result.forEach(item => {
                if(item.password == password && item.username == name){
                    res.render('register',{msg:'注册失败！用户名或密码已存在'})
                    ta = false;
                    return;
                }
            });
            if(ta){
                var t = connection.query(sql_add,data);
                t.then(data => {
                    res.redirect('/index');
                })
            }
    })

    

})


module.exports = registerApp

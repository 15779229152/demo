/***
 * 用户数据模型
 */
module.exports =class User extends require('./model'){
    /**
     * 登录功能
     * @param {string} username 用户账号
     * @param {string} password 用户密码
     * @returns 
     */
    static login(username,password){
        return new Promise((resolve,reject)=>{
            let sql = `SELECT id,username FROM user WHERE username = ? AND password = ?`
            this.query(sql,[username,password]).then(results=>{
                resolve(results[0])
            }) .catch(err=>{
                console.log(`登录失败:${err.message}`)
                // console.log('登录失败'+err.message)
                reject(err)
            })

        })
    }
    /***
     * 最后一次登录时间
     */
    static lastLoginTime(){
        return new Promise((resolve,reject)=>{
            let sql = `SELECT time FROM log WHERE handle = '登录' ORDER BY time DESC LIMIT 1`
            this.query(sql).then(results=>{
                resolve(results[0].time)
            }) .catch(err=>{
                reject(err)
            })

        })
    }
    
}
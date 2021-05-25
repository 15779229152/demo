/***
 * 文章栏目数据模型
 */
 module.exports= class Category extends require ('./model') {

    
    /**
     * 
     * 获取文章栏目列表
     */
     
     static getList() {
        return new Promise((resolve,reject)=>{
            let sql ='SELECT id,`name` FROM category ORDER BY `index` DESC'
            this.query(sql).then(results=>{
                resolve(results)

            }).catch(err=>{
                console.log(`获取文章栏目列表失败：${err.message}`)
                reject(err)
            })
        })

    }
    /**
     * 获取指定编号的栏目详情
     * @param {integer} id 类目编号
     * 
     */
     static getCategoryById(id) {
        return new Promise((resolve,reject)=>{
            let sql ='SELECT id,`name`,`index` FROM category WHERE id = ?'
            this.query(sql,id).then(results=>{
                resolve(results[0])

            }).catch(err=>{
                console.log(`获取指定编号栏目详情失败：${err.message}`)
                reject(err)
            })
        })

    }
    
}
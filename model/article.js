/***
 * 文章数据模型
 */
module.exports= class Article extends require ('./model'){

    /**
     * 获取热门文章
     * @param {integer} num  条目数
     * @returns 
     */
    static getHot(num){
        return new Promise((resolve,reject) => {
            let sql ='SELECT id,title,content,`time`FROM article WHERE hot =1 LIMIT ?'
            this.query(sql,num).then(results=>{
                resolve(results)

            }).catch(err=>{
                console.log(`获取热门推荐文章是失败：${err.message}`)
                reject(err)
            })
        })

    }
    /**
     * 获取文章列表
     * 
     */
     static getList() {
        return new Promise((resolve,reject) => {
            let sql ='SELECT id,title,content,`time` FROM article ORDER BY TIME DESC'
            this.query(sql).then(results=>{
                resolve(results)

            }).catch(err=>{
                console.log(`获取文章列表失败：${err.message}`)
                reject(err)
            })
        })

    }
    /**
     * 获取指定栏目下的文章列表
     * @param {integer}} id 栏目编号
     * 
     */
     static getListByCategoryId(id) {
        return new Promise((resolve,reject) => {
            let sql ='SELECT id,title,content,`time` FROM article WHERE category_id = ? ORDER BY TIME DESC'
            this.query(sql,id).then(results=>{
                resolve(results)

            }).catch(err=>{
                console.log(`获取指定栏目下的文章列表失败：${err.message}`)
                reject(err)
            })
        })

    }

    /**
     * 获取指定关键词的文章列表(搜索功能)
     * @param {integer} keyword 关键词
     * @returns 
     */
    static getListByKeyword(keyword) {
        return new Promise((resolve,reject) => {
            let sql ='SELECT id,title,content,`time` FROM article WHERE title LIKE ? ORDER BY TIME DESC'
            this.query(sql,`%${keyword}%`).then(results=>{
                resolve(results)

            }).catch(err=>{
                console.log(`获取指定指定关键词的文章列表失败：${err.message}`)
                reject(err)
            })
        })

    }

    /**
     * 获取文章指定详情
     * @param {integer} id 文章编号
     */
    static getArticleById(id){
        return new Promise((resolve,reject) => {
            let sql =`SELECT a.id,a.title,a.content,a.time,a.hits,a.category_id,c.name FROM article a,category c WHERE a.id = ? AND a.category_id =c.id`
            this.query(sql,id).then(results=>{
             resolve(results[0])
            }).catch(err=>{
                console.log(`获取指定指定文章失败：${err.message}`)
                reject(err)
            })

        })

    }
    /**
     * 上一篇文章功能
     * @param {inegter} id 当前文章id 
     * @returns 
     */
    static getLastChangeId(id){
        return new Promise((resolve,reject) => {
            let sql =`SELECT id,title FROM article WHERE id < ? ORDER BY id DESC LIMIT 1`
            this.query(sql,id).then(results=>{
             resolve(results[0])//因为只获取一篇文章所以取0
            }).catch(err=>{
                console.log(`获取上一页文章失败：${err.message}`)
                reject(err)
            })

        })
    }

    /**
     * 下一篇文章功能
     * @param {inegter} id 当前文章id 
     * @returns 
     */
     static getNextChangeId(id){
        return new Promise((resolve,reject) => {
            let sql =`SELECT id,title FROM article WHERE id > ? ORDER BY id ASC LIMIT 1`
            this.query(sql,id).then(results=>{
             resolve(results[0])//因为只获取一篇文章所以取0
            }).catch(err=>{
                console.log(`获取下一页文章失败：${err.message}`)
                reject(err)
            })

        })
    }
    /**
     * 
     * 获取文章总量
     */
     
     static getCount(category_id,hot) {
        return new Promise((resolve,reject)=>{
            let sql ='SELECT COUNT(1) AS count  FROM article WHERE 1=1'


            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : '' //若id 不等于-1 且有值 则 id为传的值 否则为空
            sql += hot != -1 && hot ? `AND hot=${hot}` : ''  //若hot 不等于-1 且有值 则 hot为传的值 否则为空

            this.query(sql).then(results=>{
                resolve(results[0].count)

            }).catch(err=>{
                console.log(`获取文章总量失败：${err.message}`)
                reject(err)
            })
        })

    }
    /**
     * 
     * @param {integer} start 起始索引
     * @param {integer} size 查询条目数
     * @returns 
     */
     static getPage(start,size,category_id,hot) {
        return new Promise((resolve,reject) => {
            let sql ='SELECT id,title,thumbnail,hot FROM article WHERE 1=1'// ORDER BY time DESC LIMIT ?,?

            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : '' //若id 不等于-1 且有值 则 id为传的值 否则为空
            sql += hot != -1 && hot ? ` AND hot=${hot}` : ''  //若hot 不等于-1 且有值 则 hot为传的值 否则为空

            sql += ' ORDER BY time DESC LIMIT ?,?'
            this.query(sql,[start,size]).then(results=>{
                resolve(results)

            }).catch(err=>{
                console.log(`获取指定页文章列表失败：${err.message}`) 
                reject(err)
            })
        })

    }
    /**
     * 更改热门设置
     * @param {integer} id 文章编号
     * @param {integer} hot 文章是否属于热门
     * @returns 
     */
     static setHot(id,hot) {
        return new Promise((resolve,reject) => {
            let sql ='UPDATE article SET hot=? WHERE id=?'
            this.query(sql,[hot,id]).then(results=>{
                resolve(results.affectedRows)//affectedRows为受影响的行列

            }).catch(err=>{
                console.log(`更改热门失败：${err.message}`) 
                reject(err)
            })
        })
        
    }
    /**
     * 上传文章
     * @param {object} article 文章对象
     * @returns 
     */
    static getadd(article) {
        return new Promise((resolve,reject) => {
            let sql ='INSERT INTO article SET ?'
            this.query(sql,[article]).then(results=>{
                resolve(results.insertId)//insertId为添加文章后自动生成的id

            }).catch(err=>{
                console.log(`添加失败：${err.message}`) 
                reject(err)
            })
        })

    }
    }

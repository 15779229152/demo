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
    }

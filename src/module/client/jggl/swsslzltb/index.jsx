/*事务所设立资料填报*/
module.exports = {
    path: 'client/jggl/swsslzltb',
    breadcrumbName:'机构管理 / 事务所设立资料填报',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
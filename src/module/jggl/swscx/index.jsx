module.exports = {
    path: '/jggl/swscx(/)',
    ignoreScrollBehavior:true,
    breadcrumbName:'机构管理/ 事务所查询',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
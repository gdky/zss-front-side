module.exports = {
    path: 'jgsjfx/zyzshsjfx(/)',
    breadcrumbName:'机构数据分析/执业证书号数据分析',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
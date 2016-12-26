module.exports = {
    path:'zshynbb/hyjygmqktjb(/)',
    breadcrumbName:'注税行业年报表（自动）/行业经营规模情况统计表5',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
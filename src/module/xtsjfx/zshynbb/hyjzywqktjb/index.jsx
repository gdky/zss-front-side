module.exports = {
    path:'zshynbb/hyjzywqktjb(/)',
    breadcrumbName:'注税行业年报表（自动）/行业鉴证业务情况统计表6',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
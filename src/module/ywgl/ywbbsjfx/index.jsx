module.exports = {
    path:'ywgl/ywbbsjfx(/)',
    breadcrumbName:'业务管理/业务报备数据分析',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
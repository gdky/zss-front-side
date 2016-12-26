module.exports = {
    path:'ywgl/ywbbsjhz(/)',
    breadcrumbName:'业务管理/业务报备数据汇总',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
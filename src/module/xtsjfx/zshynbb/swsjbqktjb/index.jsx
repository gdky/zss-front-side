module.exports = {
    path:'zshynbb/swsjbqktj(/)',
    breadcrumbName:'注税行业年报表（自动）/事务所基本情况统计表1',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
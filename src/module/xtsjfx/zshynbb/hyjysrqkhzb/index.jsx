module.exports = {
    path:'zshynbb/hyjysrqkhzb(/)',
    breadcrumbName:'注税行业年报表（自动）/行业经营收入情况汇总表4',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
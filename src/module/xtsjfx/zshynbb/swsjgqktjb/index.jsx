module.exports = {
    path:'zshynbb/swsjgqktjb(/)',
    breadcrumbName:'注税行业年报表（自动）/事务所机构情况统计表3',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
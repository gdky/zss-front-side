module.exports = {
    path:'zshynbb/hyryqktjb(/)',
    breadcrumbName:'注税行业年报表（自动）/行业人员情况统计表2',	
    ignoreScrollBehavior:true,
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
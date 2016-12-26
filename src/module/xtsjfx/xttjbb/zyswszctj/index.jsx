/*执业税务师转出统计*/
module.exports = {
    path: 'xttjbb/zyswszctj(/)',
    breadcrumbName:'报表管理/系统统计报表/执业税务师转出统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
            
        })
    }
}
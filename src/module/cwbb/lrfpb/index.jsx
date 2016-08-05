/*模块设置功能*/
module.exports = {
    path: 'cwbb/lrfpb(/)',
    breadcrumbName:'利润分配表',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
/*业务委托方预警管理*/
module.exports = {
    path: 'ywgl/ywwtfyjgl(/)',
    breadcrumbName:'业务委托方预警管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
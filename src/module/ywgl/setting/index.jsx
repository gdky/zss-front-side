/*业务参数设定*/
module.exports = {
    path: 'ywgl/setting(/)',
    breadcrumbName:'业务参数设定',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
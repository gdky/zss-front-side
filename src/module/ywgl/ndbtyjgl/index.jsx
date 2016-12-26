/*年度不同预警管理*/
module.exports = {
    path: 'ywgl/ndbtyjgl(/)',
    breadcrumbName:'年度不同预警管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
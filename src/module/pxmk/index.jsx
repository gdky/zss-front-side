/*培训信息发布管理*/
module.exports = {
    path: '/pxxxfbgl(/)',
    breadcrumbName:'培训信息发布管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
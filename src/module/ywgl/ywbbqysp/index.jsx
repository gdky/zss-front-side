/*业务报备启用审批*/
module.exports = {
    path: 'ywgl/ywbbqysp(/)',
    breadcrumbName:'报备启用审批',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
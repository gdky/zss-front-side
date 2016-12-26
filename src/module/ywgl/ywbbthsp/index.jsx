/*业务报备退回审批*/
module.exports = {
    path: 'ywgl/ywbbthsp(/)',
    breadcrumbName:'报备退回审批',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
/*业务报备撤销审批*/
module.exports = {
    path: 'ywgl/ywbbcxsp(/)',
    breadcrumbName:'报备撤销审批',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
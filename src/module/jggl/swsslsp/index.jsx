/*机构设立审批*/
module.exports = {
    path: 'jggl/swsslsp(/)',
    breadcrumbName:'机构管理/ 机构设立审批',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
/*非执业注册税务师信息变更审批*/
module.exports = {
    path: 'spsh/module/18',
    breadcrumbName:'逐级审核 / 待审批事项 / 非执业注册税务师信息变更审批',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
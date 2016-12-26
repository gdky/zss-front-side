/*执业注册税务师转非执业审批*/
module.exports = {
    path: 'spsh/module/39',
    breadcrumbName:'逐级审核 / 待审批事项 / 执业注册税务师转出审批',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
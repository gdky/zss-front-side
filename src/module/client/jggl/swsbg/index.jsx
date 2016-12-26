/*变更备案申请*/
module.exports = {
    path: 'client/jggl/swsbg(/)',
    breadcrumbName:'机构管理 / 变更备案申请',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
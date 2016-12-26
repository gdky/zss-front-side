/*注销备案申请*/
module.exports = {
    path: 'client/jggl/swszx',
    breadcrumbName:'机构管理 / 注销备案申请',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
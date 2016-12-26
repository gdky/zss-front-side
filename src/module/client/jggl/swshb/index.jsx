/*注销备案申请*/
module.exports = {
    path: 'client/jggl/swshb',
    breadcrumbName:'机构管理 / 合并备案申请',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
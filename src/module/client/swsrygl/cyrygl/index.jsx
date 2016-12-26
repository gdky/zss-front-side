/*从业人员管理*/
module.exports = {
    path: 'client/swsrygl/cyrygl(/)',
    breadcrumbName:'人员管理 / 从业人员管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
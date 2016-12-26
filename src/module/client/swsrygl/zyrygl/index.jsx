/*执业税务师人员管理*/
module.exports = {
    path: 'client/swsrygl/zyrygl(/)',
    breadcrumbName:'人员管理 / 执业税务师人员管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    },

}
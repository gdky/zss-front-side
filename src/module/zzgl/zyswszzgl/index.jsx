/*执业注册税务师资质管理*/
module.exports = {
    path: 'zzgl/zyswszzgl(/)',
    breadcrumbName:'执业注册税务师资质管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
/*事务所业务资质管理*/
module.exports = {
    path: 'zzgl/jgzzgl(/)',
    breadcrumbName:'事务所业务资质管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
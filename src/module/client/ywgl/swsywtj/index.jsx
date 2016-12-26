/*事务所业务统计*/
module.exports = {
    path: '/ywgl/swsywtj',
    breadcrumbName:'事务所业务统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
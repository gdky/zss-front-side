/*事务所基本情况表1填报*/
module.exports = {
    path: '/client/jysrqkb(/)',
    breadcrumbName:'经营收入情况统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
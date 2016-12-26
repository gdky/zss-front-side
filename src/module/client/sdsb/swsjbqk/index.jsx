/*事务所基本情况表1填报*/
module.exports = {
    path: '/client/swsjbqk',
    breadcrumbName:'事务所基本情况表1',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
/*事务所年检表*/
module.exports = {
    path: 'client/swsnj(/)',
    breadcrumbName:'事务所年检表',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
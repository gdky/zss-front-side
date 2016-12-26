/*事务所内部审批*/
module.exports = {
    path: 'client/swswspcx',
    breadcrumbName:'事务所内部审批',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
/*审批历史记录*/
module.exports = {
    path: '/spshlsjl(/)',
    breadcrumbName:'审批历史记录',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
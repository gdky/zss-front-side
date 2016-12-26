/*执业注师年检表*/
module.exports = {
    path: 'client/zyswsnj(/)',
    breadcrumbName:'执业注师年检表',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
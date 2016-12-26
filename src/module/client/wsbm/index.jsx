/*网上报名*/
module.exports = {
    path: '/client/wsbm',
    breadcrumbName:'网上报名',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
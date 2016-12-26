/*鉴证业务情况统计表6填报*/
module.exports = {
    path: '/client/jzywqktjb',
    breadcrumbName:'鉴证业务情况统计表6',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
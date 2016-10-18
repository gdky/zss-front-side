/*利润表*/
module.exports = {
    path: 'client_1/jzywqktjb(/)',
    breadcrumbName:'鉴证业务情况统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
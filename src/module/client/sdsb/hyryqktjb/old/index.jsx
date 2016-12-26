/*利润表*/
module.exports = {
    path: 'client_1/hyryqktjb(/)',
    breadcrumbName:'行业人员统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
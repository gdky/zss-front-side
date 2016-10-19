/*利润表*/
module.exports = {
    path: 'add/jygmtjb(/)',
    breadcrumbName:'经营规模情况统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
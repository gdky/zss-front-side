/*利润表*/
module.exports = {
    path: 'add/xjllb(/)',
    breadcrumbName:'现金流量表',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
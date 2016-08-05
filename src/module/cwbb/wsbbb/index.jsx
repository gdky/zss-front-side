/*未上报报表查询*/
module.exports = {
    path: 'cwbb/wsbbb(/)',
    breadcrumbName:'财务报表-未上报报表查询',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
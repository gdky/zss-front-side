/*经营规模情况统计表5填报*/
module.exports = {
    path: '/client/jygmtjb',
    breadcrumbName:'经营规模情况统计5',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
/*业务汇总统计表*/
module.exports = {
    path: '/client/ywhztj',
    breadcrumbName:'业务汇总统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
/*事务所基本情况表1填报*/
module.exports = {
    path: '/client/hyryqktjb',
    breadcrumbName:'行业人员情况统计表2',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
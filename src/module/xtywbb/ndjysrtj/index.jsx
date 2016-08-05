/*年度经营收入统计*/
const test =  {
    path: '/xtywbb/ndjysrtj',
    breadcrumbName:'年度经营收入统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};

module.exports = test;
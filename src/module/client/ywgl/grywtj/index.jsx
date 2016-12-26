/*个人业务统计*/
module.exports = {
    path: '/ywgl/grywtj',
    breadcrumbName:'个人业务统计',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
};
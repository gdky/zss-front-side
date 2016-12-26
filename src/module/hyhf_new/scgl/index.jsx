/*上传管理*/
module.exports = {
    path: '/hyhf/scgl(/)',
    breadcrumbName:'会员会费缴纳情况  / 上传管理',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
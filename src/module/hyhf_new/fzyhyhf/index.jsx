/*上传管理*/
module.exports = {
    path: '/hyhf/fzyhyhf(/)',
    breadcrumbName:'非执业会员会费缴纳',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
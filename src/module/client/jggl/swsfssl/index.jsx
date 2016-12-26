/*分所设立*/
module.exports = {
    path: 'client/jggl/swsfssl',
    breadcrumbName:'机构管理 / 分所设立',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    }
}
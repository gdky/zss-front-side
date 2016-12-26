/*人员调入*/
module.exports = {
    path: 'client/swsrygl/rydr(/)',
    breadcrumbName:'人员管理 / 人员调入',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
        })
    },

}
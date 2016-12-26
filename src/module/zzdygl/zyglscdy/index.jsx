/*执业管理手册打印*/
module.exports = {
    path: 'zzdygl/zyglscdy(/)',
    breadcrumbName:'证照打印管理/执业管理手册打印',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component'))
            
        })
    }
}
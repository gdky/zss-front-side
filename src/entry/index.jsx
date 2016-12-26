import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory, createHashHistory } from 'history'
import App from '../component/App';
import Signin from 'module/signin';
import Dyfp from 'module/useforprint/fpdy/dy.jsx';
import Dydj from 'module/useforprint/glsc_jgdj/dy.jsx';
import Dyry from 'module/useforprint/glsc_ry/dy.jsx';
import Dyzb from 'module/useforprint/glsc_zb/dy.jsx';
import Dyfb from 'module/useforprint/glsc_fb/dy.jsx';
import YwbbCover from 'module/useforprint/ywbb_fm/dy.jsx';
import { home } from '../module/home';
import Zyjbxx from 'module/rygl/rycx/zyryjbxx.jsx';
import Cyjbxx from 'module/rygl/rycx/cyryjbxx.jsx';
import NotFound from 'module/404notfound'
import auth from 'common/auth'

//使用browserHistory需要预设basename
const history = useRouterHistory(createHashHistory)({
    basename: '/'
});

const Index = React.createClass({

    /*登录校验*/
    requireAuth(nextState, replace) {
        /*if (!auth.verifyPermission(nextState.location.pathname)) {
         replace({
         pathname: '/404',
         state: {nextPathname: nextState.location.pathname}
         })
         }*/
        if (!auth.verifyAuth()) {
            replace({
                pathname: '/signin',
                state: { nextPathname: nextState.location.pathname }
            })
        }
    },

    render() {
        /*路由配置*/
        const routes = [{
            path: '/',
            component: App,
            indexRoute: { component: home },
            ignoreScrollBehavior: true,
            breadcrumbName: '首页',
            onEnter: this.requireAuth,
            childRoutes: [
                /* 模块预加载方式
                 { path: '/gn1(/)', component: gn1 },
                 */

                /* 中心端 */
                //机构管理
                require('../module/jggl/swscx'),
                require('../module/jggl/swsslsp'),

                //人员管理
                require('../module/rygl/rycx'),

                //系统功能设置
                require('../module/xtgnsz/mkgl'),
                require('../module/xtgnsz/qxgl'),
                require('../module/xtgnsz/yhgl'),
                require('../module/xtgnsz/yhdljlb'),

                //资质管理
                require('../module/zzgl/jgzzgl'), //事务所资质管理
                require('../module/zzgl/zyswszzgl'), //执业注师资质管理

                //业务管理
                require('../module/ywgl/ywbbgl'),
                require('../module/ywgl/ywbbthsp'), //业务报备退回审批
                require('../module/ywgl/ywbbcxsp'), //业务报备退回审批
                require('../module/ywgl/ywbbqysp'), //业务报备退回审批
                require('../module/ywgl/sfjeyjgl'), //收费金额预警管理
                require('../module/ywgl/ndbtyjgl'), //年度不同预警管理
                require('../module/ywgl/ywwtfyjgl'), //业务委托方预警管理
                require('../module/ywgl/setting'), //业务参数设置
                require('../module/ywgl/ywbbsjfx'),//业务报备数据分析
                require('../module/ywgl/ywbbsjhz'),//业务报备数据汇总

                //财务报表
                require('../module/cwbb/lrfpb'),
                require('../module/cwbb/xjllb'),
                require('../module/cwbb/zcmxb'),
                require('../module/cwbb/lrb'),
                require('../module/cwbb/zcfzb'),
                require('../module/cwbb/wsbbb'),

                //手动上报报表
                require('../module/sdsbbb/jzywtjb'),
                require('../module/sdsbbb/jygmtjb'),
                require('../module/sdsbbb/swsjbqkb'),
                require('../module/sdsbbb/hyryqktj'),
                require('../module/sdsbbb/jysrqktj'),
                require('../module/sdsbbb/wsbbbcx'),

                //历史记录查询
                require('../module/lsjlcx/swslsjl/bglsjl'),
                require('../module/lsjlcx/swslsjl/yhbsws'),
                require('../module/lsjlcx/swslsjl/yzxsws'),
                require('../module/lsjlcx/zyswslsjl/snbgjl'),
                require('../module/lsjlcx/zyswslsjl/snzsjl'),
                require('../module/lsjlcx/zyswslsjl/snzzfjl'),
                require('../module/lsjlcx/zyswslsjl/snzjjl'),
                require('../module/lsjlcx/zyswslsjl/snzxjl'),
                require('../module/lsjlcx/zyswslsjl/snbdjl'),
                require('../module/lsjlcx/fzyzjjl'),
                require('../module/lsjlcx/fzyzxjl'),
                require('../module/lsjlcx/fzyzzyjl'),

                //监督检查
                require('../module/jdjc/zyswsnjb'),
                require('../module/jdjc/swsnj'),

                //逐级审核
                require('../module/spsh'),
                require('../module/spshlsjl'),
                require('../module/spsh/module/1'),
                require('../module/spsh/module/2'),
                require('../module/spsh/module/3'),
                require('../module/spsh/module/4'),
                require('../module/spsh/module/5'),
                require('../module/spsh/module/6'),
                require('../module/spsh/module/7'),
                require('../module/spsh/module/8'),
                require('../module/spsh/module/9'),
                require('../module/spsh/module/10'),
                require('../module/spsh/module/11'),
                require('../module/spsh/module/12'),
                require('../module/spsh/module/13'),
                require('../module/spsh/module/14'),
                require('../module/spsh/module/15'),
                require('../module/spsh/module/18'),
                require('../module/spsh/module/20'),
                require('../module/spsh/module/38'),
                require('../module/spsh/module/39'),
                require('../module/spsh/module/43'),
                require('../module/spsh/module/44'),
                require('../module/spsh/module/46'),

                // 数据统计分析 - 年检数据分析
                require('../module/xtsjfx/njsjfx/rynjsjfx'),//人员年检数据分析
                require('../module/xtsjfx/njsjfx/jgnjsjfxb'),//机构年检数据分析

                //数据统计分析 - 注税行业年报表
                require('../module/xtsjfx/zshynbb/hyjygmqktj'),//行业经营规模情况统计
                require('../module/xtsjfx/zshynbb/swsjbqktjb'),//事务所基本情况统计表1
                require('../module/xtsjfx/zshynbb/hyryqktjb'),//行业人员情况统计表2
                require('../module/xtsjfx/zshynbb/swsjgqktjb'),//事务所机构情况统计表3
                require('../module/xtsjfx/zshynbb/hyjysrqkhzb'),//行业经营收入情况汇总表4
                require('../module/xtsjfx/zshynbb/hyjygmqktjb'),//行业经营规模情况统计表5
                require('../module/xtsjfx/zshynbb/hyjzywqktjb'),//行业鉴证业务情况统计表6

                //数据统计分析 - 系统统计报表
                require('../module/xtsjfx/xttjbb/swsqktjA'), //事务所情况统计A
                require('../module/xtsjfx/xttjbb/hyryqktj'), //行业人员情况统计
                require('../module/xtsjfx/xttjbb/swsqktj_b'),//事务所情况统计B
                require('../module/xtsjfx/xttjbb/swszttj'),  //税务师状况统计
                require('../module/xtsjfx/xttjbb/zyswszjtj'),//税务师转籍统计
                require('../module/xtsjfx/xttjbb/zyswszctj'),//税务师转出统计

                //数据统计分析 - 系统业务报表
                require('../module/xtsjfx/xtywbb/ndjysrtj'), //年度经营收入统计
                require('../module/xtsjfx/xtywbb/ndjzqktj'), //年度鉴证情况统计

                //数据统计分析 - 数据分析
                require('../module/xtsjfx/sjfx/zyzzsjfx'),//执业资质数据分析
                require('../module/xtsjfx/sjfx/hyxlsjfx'),//行业学历数据分析
                require('../module/xtsjfx/sjfx/zjgmsjfx'),//资金规模数据分析
                require('../module/xtsjfx/sjfx/hynlsjfx'),//行业年龄数据分析
                require('../module/xtsjfx/sjfx/ryztsjfx'),
                require('../module/xtsjfx/sjfx/zyzshsjfx'),

                //会员会费缴纳
                require('../module/hyhf_new/hyhfjnqk'),
                require('../module/hyhf_new/fpdy'),
                require('../module/hyhf_new/fzyhyhf'),
                require('../module/hyhf_new/scgl'),

                //证照打印管理
                require('../module/zzdygl/zyglscdy'),

                //培训模块
                require('../module/pxmk'),


                //客户端
                //机构管理
               require('../module/client/jggl/swsbg'),
                require('../module/client/jggl/swszx'),
                require('../module/client/jggl/swshb'),
                require('../module/client/jggl/swsfssl'),
                require('../module/client/jggl/swsslzltb'), //新所设立资料填报

                //事务所内部审批
                require('../module/client/swswspcx'),

                //人员管理
                require('../module/client/swsrygl/zyrygl'),
                require('../module/client/swsrygl/cyrygl'),
                require('../module/client/swsrygl/rydr'),

                //财务报表上传
                require('../module/client/cwbb/lrb'),
                require('../module/client/cwbb/lrfpb'),
                require('../module/client/cwbb/xjllb'),
                require('../module/client/cwbb/zcfzb'),
                require('../module/client/cwbb/zcmxb'),

                //手动上报报表
                require('../module/client/sdsb/swsjbqk'),
                require('../module/client/sdsb/jygmtjb'),
                require('../module/client/sdsb/jzywqktjb'),
                require('../module/client/sdsb/hyryqktjb'),
                require('../module/client/sdsb/jysrqkb'),

                //年度检查
                require('../module/client/swsnj'),//事务所年检
                require('../module/client/zyswsnj'),//执业税务师年检

                //业务管理
                require('../module/client/ywgl/khxxgl'), //客户信息管理
                require('../module/client/ywgl/ywbb'), //事务所业务报备
                require('../module/client/ywgl/grywtj'), //个人业务统计
                require('../module/client/ywgl/swsywtj'), //事务所业务统计
                require('../module/client/ywgl/ywhztj'), //业务汇总统计
                //站内短信
                require('../module/zndx'),

                //培训报名
                require('../module/client/wsbm'),

                //公用功能
                //修改密码
                require('../module/updatepass')
            ]
        }, {
            path: '/signin',
            component: Signin
        }, {
            path: '/print/hyhf/fpdy',
            component: Dyfp
        }, {
            path: '/print/zzdygl/glscdj',
            component: Dydj
        }, {
            path: '/print/zzdygl/glscry',
            component: Dyry
        }, {
            path: '/print/zzdygl/jgzyzzb',
            component: Dyzb
        }, {
            path: '/print/zzdygl/jgzyzfb',
            component: Dyfb
        }, {
            path: '/new_blank/sws/zyjbxx',
            component: Zyjbxx
        }, {
            path: '/new_blank/sws/cyjbxx',
            component: Cyjbxx
        }, {
            path: '/print/ywbbcover',
            component: YwbbCover
        },{
            path: '*',
            component: NotFound
        }];
        return <Router history={history} routes={routes} />
    }
});
ReactDOM.render(<Index />, document.getElementById('app'));




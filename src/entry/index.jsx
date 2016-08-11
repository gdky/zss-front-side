import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute,useRouterHistory} from 'react-router';
import { createHistory } from 'history'
import App from '../component/App';
import Signin from 'module/signin';
import {cenHome,clientHome } from '../module/home';
import NotFound from 'module/404notfound'
import auth from 'common/auth'

//使用browserHistory需要预设basename
const history = useRouterHistory(createHistory)({
    basename: '/'
});

const Index = React.createClass({

    /*登录校验*/
    requireAuth(nextState, replace){
        /*if (!auth.verifyPermission(nextState.location.pathname)) {
         replace({
         pathname: '/404',
         state: {nextPathname: nextState.location.pathname}
         })
         }*/
        if (!auth.verifyAuth()) {
            replace({
                pathname: '/signin',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    },

    render(){
        /*路由配置*/
        const routes = [{
            path: '/',
            component: App,
            indexRoute: {component: auth.isClient() ? clientHome : cenHome},
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

                //人员管理
                require('../module/rygl/rycx'),

                //系统功能设置
                require('../module/xtgnsz/mkgl'),
                require('../module/xtgnsz/qxgl'),
                require('../module/xtgnsz/yhgl'),

                //业务管理

                /*require('../module/ywgl/ywbbgl'),
                require('../module/ywgl/ywzlgl/sfjeyjgl'),
                require('../module/ywgl/ywzlgl/ndbtyjgl'),
                require('../module/ywgl/ywzlgl/ywwtyjgl'),
                require('../module/ywgl/ywzlgl/cxbgyjgl'),

               //会员会费管理
                require('../module/hyhfgl/hfjlqk'),
                require('../module/hyhfgl/grhyhfgl'),
                require('../module/hyhfgl/fzyhyhfgl'),

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
                require('../module/spsh/module/20'),
                require('../module/spsh/module/43'),
                require('../module/spsh/module/44'),
                require('../module/spsh/module/46'),*/

                //数据统计分析 - 年检数据分析
                require('../module/xtsjfx/njsjfx/rynjsjfx'),//人员年检数据分析
                require('../module/xtsjfx/njsjfx/jgnjsjfxb'),//机构年检数据分析

                //数据统计分析 - 注税行业年报表
                require('../module/xtsjfx/zshynbb/hyjygmqktj'),//行业经营规模情况统计

                //数据统计分析 - 系统统计报表
                require('../module/xtsjfx/xttjbb/swsqktjA'), //事务所情况统计A
                require('../module/xtsjfx/xttjbb/hyryqktj'), //行业人员情况统计
                require('../module/xtsjfx/xttjbb/swsqktj_b'),//事务所情况统计B
                require('../module/xtsjfx/xttjbb/swszttj'),//税务师

                //数据统计分析 - 系统业务报表
                require('../module/xtsjfx/xtywbb/ndjysrtj'), //年度经营收入统计 
                require('../module/xtsjfx/xtywbb/ndjzqktj'), //年度鉴证情况统计

                //数据统计分析 - 数据分析
                require('../module/xtsjfx/sjfx/zyzzsjfx'),//执业资质数据分析
                require('../module/xtsjfx/sjfx/hyxlsjfx'),//行业学历数据分析
                require('../module/xtsjfx/sjfx/zjgmsjfx'),//资金规模数据分析
                require('../module/xtsjfx/sjfx/hynlsjfx'),//行业年龄数据分析
                require('../module/xtsjfx/sjfx/ryztsjfx'),

                //会员会费缴纳
                require('../module/hyhf_new/hyhfjnqk'),
                require('../module/hyhf_new/fpdy'),


                //客户端
                //机构管理
                /*require('../module/client/jggl/swsbg'),
                require('../module/client/jggl/swszx'),
                require('../module/client/jggl/swshb'),

                //人员管理
                require('../module/client/swsrygl/zyrygl'),

                //财务报表上传
                require('../module/client/cwbb/lrb'),
                require('../module/client/cwbb/lrfpb'),
                require('../module/client/cwbb/xjllb'),
                require('../module/client/cwbb/zcfzb'),
                require('../module/client/cwbb/zcmxb'),

                //手动上报报表
                require('../module/client/sdsb/swsqkb'),
                require('../module/client/sdsb/jygmtjb'),
                require('../module/client/sdsb/jzywqktjb'),
                require('../module/client/sdsb/hyryqktjb'),
                require('../module/client/sdsb/jysrqkb'),
           
                //业务管理
                require('../module/client/ywgl/khxxgl'), //客户信息管理
                require('../module/client/ywgl/ywbb') //事务所业务报备*/
            ]
        }, {
            path: '/signin',
            component: Signin
        }, {
            path: '*',
            component: NotFound
        }];
        return <Router history={history} routes={routes}/>
    }
});
ReactDOM.render(<Index/>, document.getElementById('app'));




import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import dataInit from '../model';
import {Router,Route, browserHistory,hashHistory,IndexRoute} from 'react-router'
import App from '../component/App';

/*路由配置*/
const routes = {
    path: '/',
    component: App,
    dataSource:dataInit,
    childRoutes: [
        //模块预加载方式
        //{ path: '/gn1(/)', component: gn1 }, 
        //模块懒加载方式
        require('../module/gn1'),
        require('../module/gn2'),
        require('../module/gn3')
    ]
}

ReactDOM.render(<Router history={hashHistory} routes={routes} />, document.getElementById('app'));




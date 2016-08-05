<<<<<<< HEAD

/*
年度经营收入统计
*/
import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert,Select,Form} from 'antd'
import CompPageHead from 'component/CompPageHead'
import Panel from 'component/compPanel'
import {columns} from './model'
import req from 'reqwest';
import config from 'common/configuration'
import BaseTable from 'component/compBaseTable'
import {entityFormat} from 'common/utils'
import SelectorYear from './year'


const API_URL = config.HOST + config.URI_API_PROJECT + '/ndjysrtj';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const ndjysrtj = React.createClass({
    //初始化state
    getInitialState(){
        return {
            data: []
        }
    },

    
    
    //通过API获取数据
    fetchData(params = {nd:2014}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            contentType: 'application/json'
        }).then(resp=> {
            const p = this.state.pagination;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            this.setState({
                data: resp.data,
                pagination: p,
                loading: false
            })
        }).fail(err=> {
            this.setState({loading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>  )
            });
        })
    },

    componentDidMount(){
 
        this.fetchData(params);
    },
    

    render(){
      
   

        return <div className="xtyybb-ndjysrtj">
            <div className="wrap">
                {<Alert message="操作提示"
                                         description={helper}
                                             type="info"
                                             />}

                <Panel title="年度经营收入统计" toolbar={toolbar}> 
               
                    
                    <div className="h-scroll-table">
                        <Table columns={columns}
                               dataSource={this.state.data}
                               loading={this.state.loading}
                              
                               />
                    </div>
                </Panel>
               
            </div>
        </div>
    }
});

module.exports =ndjysrtj;
=======
import React from 'react'
import QueueAnim from 'rc-queue-anim'
import KhxxList from './list'
import './style.css'
>>>>>>> refs/remotes/origin/master


<<<<<<< HEAD
=======
module.exports = test;
>>>>>>> refs/remotes/origin/master

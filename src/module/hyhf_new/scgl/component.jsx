import React from 'react'
import {Table,Modal,Row,Col,Button,Icon,Alert} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import auth from 'common/auth'
import SearchForm from './searchForm'
import config from 'common/configuration'
import {Link} from 'react-router'


const API_URL = config.HOST + config.URI_API_PROJECT + '/hyhf/scglcx';
const API_URL_P = config.HOST + config.URI_API_PROJECT + '/hyhf/scglcx/put';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;


const lrb = React.createClass({
    //初始化state
    getInitialState(){
        return {
            data: [],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 5,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20','30','40']
                 },
            searchToggle: false,
            where: '',
        }
    },

    //改变页码
    handleChange(pagination, filters, sorter){
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({pagination: pager});
        this.fetchData({
            pagenum: pager.current,
            pagesize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(this.state.where))
        })
    },

    //查询按钮
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle});
    },


    //提交条件查询
    handleSearchSubmit(value){
        const pager = this.state.pagination;
        pager.current = 1;
        const params = {
            pagenum: 1,
            pagesize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(value))
        };
        this.setState({pagination: pager, where: value});
        this.fetchData(params)
    },


    //通过API获取数据
    fetchData(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params
        }).then(resp=> {
            const p = this.state.pagination;
            p.total = resp.page.pageTotal;
            p.showTotal = total => {
                return `共 ${resp.page.pageTotal} 条`
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
        this.fetchData();
    },
    restRow(jlid,lx,bj){
        const ms={};
        ms.jlid=jlid;
        ms.lx=lx;
        ms.bj=bj;
        req({
                    url: API_URL_P,
                    type: 'json',
                    method: 'put',
                    data: JSON.stringify(ms),
                    contentType: 'application/json',
                    headers:{'x-auth-token':auth.getToken()}
                }).then(resp=> {
                    this.fetchData();
                }).fail(err=> {
                    Modal.error({
                        title: '数据提交错误',
                        content: (
                            <div>
                                <p>无法向服务器提交数据，需检查应用服务工作情况</p>
                                <p>Status: {err.status}</p>
                            </div>  )
                    });
                })
    },

    ztRender(text, row, index) {
    var that=this;
    if (row.SUCESS==0) {
        return (
                    <span>
                      无成功记录
                    </span>
                  );
    };
    if (row.YXBZ==0||row.YXBZ==2) {
        return (
                    <span>
                      <a onClick={that.restRow.bind(this,row.ID,row.YXBZ+1,1)}>恢复记录</a>
                    </span>
                  );
    };
     return (
                    <span>
                      <a onClick={that.restRow.bind(this,row.ID,row.YXBZ-1,0)}>撤销记录</a>
                    </span>
                  );
  },
    render(){
        const re=this.props.location.search.substring(1,this.props.location.search.length);
        const columns = [{ //设定列
                  title: '序号', //设定该列名称
                  dataIndex: 'key', //设定该列对应后台字段名
                  key: 'key', //列key，必须设置，建议与字段名相同
                },  {
                  title: '上传类型',
                  dataIndex: 'lx',
                  key: 'lx',
                  render(text, row, index){
                    if (row.YXBZ==3||row.YXBZ==2) {
                        return (
                                    <span>
                                      非执业缴费上传
                                    </span>
                                  );
                    };
                     return (
                                    <span>
                                      机构缴费上传
                                    </span>
                                  );
                        }  
                },{
                  title: '上传日期',
                  dataIndex: 'scrq',
                  key: 'scrq',
                }, {
                  title: '成功数',
                  dataIndex: 'SUCESS',
                  key: 'SUCESS',
                }, {
                  title: '失败数',
                  dataIndex: 'FAIL',
                  key: 'FAIL',
                },{
                  title: '上传人',
                  dataIndex: 'SCR',
                  key: 'SCR',
                },  {
                  title: '状态',
                  dataIndex: 'jlzt',
                  key: 'jlzt',
                  render(text, row, index){
                    if (row.SUCESS==0) {
                        return (
                                    <span>
                                      无效上传
                                    </span>
                                  );
                    };
                     return (
                                    <span>
                                      {text}
                                    </span>
                                  );
                        }  
                }, 
                {
                  title: '操作',
                  dataIndex: 'dy',
                  key: 'dy',
                  render:this.ztRender
                },
            ];
        let toolbar = <ToolBar><div>
            <Button type="ghost" onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                    <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>
            <span className="ant-divider"></span>
            {re=="fzy"?<Link to="hyhf/fzyhyhf"><Button type="ghost"  >返回缴纳情况</Button></Link>:
            <Link to="hyhf/hyhfjnqk"><Button type="ghost"  >返回缴纳情况</Button></Link>}
            </div>
        </ToolBar>;

        return <div className="hyhf-scgl">
            <div className="wrap">
                <Panel title="缴费记录上传管理" toolbar={toolbar}>
                    {this.state.searchToggle && <SearchForm
                        onSubmit={this.handleSearchSubmit}/>}
                    <div className="h-scroll-table">
                        <Table columns={columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleChange}
                               />
                    </div>
                </Panel>
                
            </div>
        </div>
    }
});

module.exports = lrb;
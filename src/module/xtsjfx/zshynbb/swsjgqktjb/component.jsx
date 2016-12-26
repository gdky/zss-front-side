import React from 'react'
import CompBaseTable from 'component/compBaseTable';
import config from 'common/configuration'
import Panel from 'component/compPanel'
import Table from 'component/compTable'
import req from 'reqwest'
import Model from './model.js' 
import SearchForm from './searchForm' 
import {  DatePicker,Modal,Form, Input, Select,Icon,Tabs,Button,Row,Col,message }from 'antd'

const API_URL = config.HOST+config.URI_API_PROJECT + '/zshynbb/swsjgqktjb';
const TabPane = Tabs.TabPane;
const PanelBar = Panel.ToolBar;

const component = React.createClass({
  getInitialState() { //初始化State状态，使用传入参数
    const year = new Date().getFullYear()-1;
    return {
            searchToggle:false,
            data: [], 
            where:{ND:year},  
      };
    },
    
  fetch_data(params = {where:encodeURIComponent(JSON.stringify(this.state.where)),}) {
     this.setState({loading:true,});//主查询加载状态
      req({
            url: API_URL,//默认数据查询后台返回JSON
            method: 'get',
            type: 'json',
            data: params,
            success: (result) => {
                      if (result.data.length!=0) {
                              this.setState({
                                      data: result.data,//传入后台获取数据，table组件要求每条查询记录必须拥有字段'key'
                                      loading:false,//关闭加载状态
                               }); 
                    }else{//空数据处理
                         this.setState({data: [],loading:false});
                    };
            },
            error: (err) =>{alert('api错误');}
          });
        },

    componentDidMount() { //REACT提供懒加载方法，懒加载时使用，且方法名必须为componentDidMount
      this.fetch_data(); //异步调用后台服务器方法fetch_rycx
    },

    //打开关闭查询框
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle})
    },


    handleSearchSubmit(value){
      this.setState({where:value}); 
       this.fetch_data({ 
        where:encodeURIComponent(JSON.stringify(value)),
      })
    },

    render(){
      const panelBar = <PanelBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                    <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>
        </PanelBar>;

      return <div className="swsjgqktjb">
<div className="wrap">
    <div className="dataGird">
     <Panel title="事务所机构情况统计表3"   toolbar={panelBar}>
      {this.state.searchToggle && <SearchForm onSubmit={this.handleSearchSubmit}/>}
              <Table columns={Model.columns} 
              header={Model.header}
              dataSource={this.state.data}  
              loading={this.state.loading}  bordered   />
        </Panel>
    </div>
          </div>  
      </div>
    }
});

module.exports=component;

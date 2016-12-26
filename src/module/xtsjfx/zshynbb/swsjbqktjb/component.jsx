import React from 'react'
import CompBaseTable from 'component/compBaseTable';
import config from 'common/configuration'
import Panel from 'component/compPanel'
import req from 'reqwest'
import Model from './model.js' 
import SearchForm from './searchForm' 
import {  DatePicker,Modal,Form, Input, Select,Table, Icon,Tabs,Button,Row,Col,message }from 'antd'

const API_URL = config.HOST+config.URI_API_PROJECT + '/zshynbb/swsjbqktj';
const TabPane = Tabs.TabPane;
const PanelBar = Panel.ToolBar;

const swsjbqktjb = React.createClass({
  getInitialState() { //初始化State状态，使用传入参数
    const year = new Date().getFullYear();
    return {
            searchToggle:false,
        //这些都是dataset  
            data: [],//用于主查询
            pagination: Model.pageSetting,//从model加载常量
            where:{ND:year}, 
            activeKey:"",
      };
    },
    
  fetch_data(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize,where:encodeURIComponent(JSON.stringify(this.state.where)),}) {
     this.setState({loading:true,});//主查询加载状态
      req({
            url: API_URL,//默认数据查询后台返回JSON
            method: 'get',
            type: 'json',
            data: params,
            success: (result) => {
                      if (result.data.length!=0) {
                          const pagination = this.state.pagination;
                          pagination.total = result.page.pageTotal;//要求后台返回json写法有属性page，该属性包含pageTotal（总条数值）
                              this.setState({
                                      data: result.data,//传入后台获取数据，table组件要求每条查询记录必须拥有字段'key'
                                      loading:false,//关闭加载状态
                               }); 
                    }else{//空数据处理
                         const pagination = this.state.pagination;
                         pagination.total = 0;
                         this.setState({data: [],dataxx: {values: {}},datalist:[],loading:false});
                    };
            },
            error: (err) =>{alert('api错误');}
          });
        },
        
  

    handleTableChange(pagination, filters, sorter) {//onChange方法，分页、排序、筛选变化时触发，必须三个参数才能准确获取
          const tablewhere = this.state.where;
          tablewhere.sfield = sorter.field;
          tablewhere.sorder = sorter.order;
          const paper = this.state.pagination;     //把this.state.pagination指向paper，与setState异曲同工，目的是更改单一属性数据
          paper.pageSize = pagination.pageSize;
          paper.current = pagination.current;
          this.fetch_data({//调用主查询
                pagenum: pagination.current,
                pagesize: pagination.pageSize,
                where:encodeURIComponent(JSON.stringify(tablewhere)),
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
      const paper = this.state.pagination;     //把当前页重置为1
        paper.current = 1;
       this.fetch_data({//调用主查询
        pagenum: 1,
        pagesize: this.state.pagination.pageSize,
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

      return <div className="swsjbqktjb">
<div className="wrap">
    <div className="dataGird">
     <Panel title="事务所基本情况统计表1"  toolbar={panelBar}>
      {this.state.searchToggle && <SearchForm onSubmit={this.handleSearchSubmit}/>}
              <Table columns={Model.columns} 
              dataSource={this.state.data} 
              pagination={this.state.pagination}
              onChange={this.handleTableChange} 
              loading={this.state.loading}  bordered   />
        </Panel>
    </div>
          </div>  
      </div>
    }
});

module.exports=swsjbqktjb;

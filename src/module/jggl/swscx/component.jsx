import React from 'react'
import CompBaseTable from 'component/compBaseTable';
import Panel from 'component/compPanel'
import config from 'common/configuration'
import './style.css'
import req from 'reqwest'
import Model from './model.js'
import SearchForm from './searchForm'
import {  Input, Table, Icon, Tabs, Button, Row, Col, message }from 'antd'
// 标签定义
const TabPane = Tabs.TabPane;
const API_URL = config.HOST + config.URI_API_PROJECT + '/jgs';
const ToolBar = Panel.ToolBar;
const jgcx = React.createClass({

  getInitialState() { //初始化State状态，使用传入参数
    return {
      //这些都是dataset
      dataxx: { values: {} },//用于详细信息autoform数据格式
      datalist: [],//用于其他详细table数据格式
      data: [],//用于主查询
      pagination: Model.pageSetting,//从model加载常量
      showtotal: Model.pageSetting.showTotal,
      urls: {},//详细信息URL
      tabkey: 1,//默认tab状态
      visible: false,//条件查询框默认状态
      where: {},
      activeKey: "",
    };
  },

  handleTableChange(pagination, filters, sorter) {//onChange方法，分页、排序、筛选变化时触发，必须三个参数才能准确获取
    const tablewhere = this.state.where;
    tablewhere.sfield = sorter.field;
    tablewhere.sorder = sorter.order;
    const paper = this.state.pagination;     //把this.state.pagination指向paper，与setState异曲同工，目的是更改单一属性数据
    paper.pageSize = pagination.pageSize;
    paper.current = pagination.current;
    this.fetch_jgcx({//调用主查询
      pagenum: pagination.current,
      pagesize: pagination.pageSize,
      where: encodeURIComponent(JSON.stringify(tablewhere)),
    })
  },

  fetch_jgcx(params = { pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize }) {
    this.setState({ loading: true, });//主查询加载状态
    req({
      url: API_URL,//默认数据查询后台返回JSON
      method: 'get',
      type: 'json',
      data: params,
      success: (result) => {
        if (result.data.length != 0) {
          const pagination = this.state.pagination;
          pagination.total = result.page.pageTotal;//要求后台返回json写法有属性page，该属性包含pageTotal（总条数值）
          function showTotal() { return "共" + pagination.total + "条"; }
          pagination.showTotal = showTotal;//调用总条数返回方法
          this.setState({
            data: result.data,//传入后台获取数据，table组件要求每条查询记录必须拥有字段'key'
            urls: result.data[0]._links,
            loading: false,//关闭加载状态
          });
          this.onSelect(result.data[0]);
        } else {//空数据处理
          const pagination = this.state.pagination;
          pagination.total = 0;
          this.setState({ data: [], dataxx: { values: {} }, datalist: [], loading: false, });
        };
      },
      error: (err) => { alert('api错误'); }
    });
  },

  fetch_jgxx(tabkey) {//详细信息（tab）数据处理方法，不能使用switch，否则会发生未知错误
    if (tabkey == 1) {
      ;
      req({
        url: this.state.urls.herf_sws,//从主查询获取的后台dataProvider路径
        method: 'get',
        type: 'json',
        success: (result) => {
          this.setState({
            dataxx: result.data,
            datalist: result.data.nbjgsz
          })
        }, error: (err) => { alert('api错误'); }
      });
    } else if (tabkey == 2) {
      this.gettabdata(this.state.urls.herf_zyry);
    } else if (tabkey == 3) {
      this.gettabdata(this.state.urls.herf_cyry);
    } else if (tabkey == 4) {
      this.gettabdata(this.state.urls.herf_czrylb);
    } else if (tabkey == 5) {
      this.gettabdata(this.state.urls.herf_swsbgxx);
    } else if (tabkey == 6) {
      this.gettabdata(this.state.urls.herf_njjl);
    };
  },
  gettabdata(urls) {
    req({
      url: urls, method: 'get', type: 'json',
      success: (result) => {
        this.setState({ datalist: result.data })
      }, error: (err) => { alert('api错误'); }
    });
  },

  onSelect(record) {//主查询记录被选中方法
    this.state.urls = record._links
    if (this.state.tabkey) {
      this.fetch_jgxx(this.state.tabkey);
    } else {
      this.fetch_jgxx(1);
    };
    // this.setState({activeKey:1});

  },

  callback(key) {//tab标签变化返回值与方法
    this.state.tabkey = key;
    this.fetch_jgxx(key)
  },

  handleSearchToggle() {//点击查询按钮，显示查询form
    this.setState({ searchToggle: !this.state.searchToggle });
  },

  handleOk(value) {//点击搜索按钮触发事件
    this.setState({ where: value });
    const paper = this.state.pagination;     //把当前页重置为1
    paper.current = 1;
    this.fetch_jgcx({//调用主查询
      pagenum: 1,
      pagesize: this.state.pagination.pageSize,
      where: encodeURIComponent(JSON.stringify(value)),
    })
  },

  print(row,dylx){
    var mp={};
      mp.zsbh=row.zsbh;
      mp.ZJPZWH=row.ZJPZWH;
      mp.dwmc=row.dwmc;
      mp.DZHI=row.DZHI;
      mp.fddbr=row.fddbr;
      mp.zczj=row.zczj;
      mp.YYZZHM=row.YYZZHM;
      mp.JYFW=row.JYFW;
    if (dylx) {
      window.open("#/print/zzdygl/jgzyzzb?"+encodeURIComponent(JSON.stringify(mp)));
    }else{
      window.open("#/print/zzdygl/jgzyzfb?"+encodeURIComponent(JSON.stringify(mp)));
    };
  },

 ztRender(text, row, index) {
    var that=this;
     return (
                    <span>
                      <a onClick={that.print.bind(this,row,true)}>办证</a><span className="ant-divider" ></span>
                      <a onClick={that.print.bind(this,row,false)}>副本</a>
                    </span>
                  );
  },

  componentDidMount() { //REACT提供懒加载方法，懒加载时使用，且方法名必须为componentDidMount
    this.fetch_jgcx(); //异步调用后台服务器方法fetch_jgcx
  },

  render() {
    const columns = [{ //设定列
          title: '序号', //设定该列名称
          dataIndex: 'xh', //设定该列对应后台字段名
          key: 'xh', //列key，必须设置，建议与字段名相同
        }, {
          title: '机构名称',
          dataIndex: 'dwmc',
          key: 'dwmc',
          sorter: true, //是否可以排序，需后台写排序方法
        }, {
          title: '注册资金（万元）',
          dataIndex: 'zczj',
          key: 'zczj',
          sorter: true,
        }, {
          title: '法定代表人',
          dataIndex: 'fddbr',
          key: 'fddbr',
          sorter: true,
        }, {
          title: '证书编号',
          dataIndex: 'zsbh',
          key: 'zsbh',
        }, {
          title: '事务所性质',
          dataIndex: 'swsxz',
          key: 'swsxz',
        }, {
          title: '城市',
          dataIndex: 'cs',
          key: 'cs',
        }, {
          title: '总人数',
          dataIndex: 'zrs',
          key: 'zrs',
        }, {
          title: '执业注税师人数',
          dataIndex: 'zyrs',
          key: 'zyrs',
        }, {
          title: '成立时间',
          dataIndex: 'clsj',
          key: 'clsj',
          sorter: true,
        }, {
          title: '操作',
          key: 'operation',
          fixed:'right',
          render:this.ztRender
    }];
    let toolbar = <ToolBar>
      <Button onClick={this.handleSearchToggle}>
        <Icon type="search"/>查询
        { this.state.searchToggle ? <Icon className="toggle-tip" type="arrow-up"/> :
          <Icon className="toggle-tip" type="arrow-down"/>}
      </Button>
    </ToolBar>;
    return <div className="jgcx">
      <div className="wrap">
        <div className="h-scroll-table">
          <Panel toolbar={toolbar}>
            {this.state.searchToggle && <SearchForm
              onSubmit={this.handleOk}/>}
            <Table columns={columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              onRowClick={this.onSelect}
              loading={this.state.loading}  bordered   />
          </Panel>
        </div>

        <Panel ><Tabs type="line" onChange={this.callback}>
          <TabPane tab="事务所信息" key="1"><CompBaseTable data = {this.state.dataxx}  model ={Model.data} bordered striped /><p className="nbjgsz">内部机构设置：</p><Table columns={Model.nbjgsz} dataSource={this.state.datalist} bordered  size="small" pagination={false} /></TabPane>
          <TabPane tab="执业人员信息" key="2"><Table columns={Model.columnsZyry} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
          <TabPane tab="从业人员信息" key="3"><Table columns={Model.columnsCyry} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
          <TabPane tab="出资人列表" key="4"><Table columns={Model.columnsCzrlb} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
          <TabPane tab="事务所变更信息" key="5"><Table columns={Model.columnsSwsbgxx} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
          <TabPane tab="年检记录" key="6"><Table columns={Model.columnsNjjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
        </Tabs></Panel>
      </div>

    </div>

  }
})
module.exports = jgcx;



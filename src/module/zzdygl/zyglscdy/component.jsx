import React from 'react'
import CompBaseTable from 'component/compBaseTable';
import config from 'common/configuration'
import Panel from 'component/compPanel'
import './style.css'
import req from 'reqwest'
import Model from './model.js' 
import SearchForm from './searchForm'
import {  DatePicker,Modal,Form, Input, Select,Table, Icon,Tabs,Button,Row,Col,message }from 'antd'
// 标签定义
const TabPane = Tabs.TabPane;
const API_URL = config.HOST+config.URI_API_PROJECT + '/zzdygl/zyglscdy';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const rycx = React.createClass({
  getInitialState() { //初始化State状态，使用传入参数
      return {
        //这些都是dataset
            dataxx: {values: {}},//用于详细信息autoform数据格式
            datalist:[],//用于其他详细table数据格式
            data: [],//用于主查询
            pagination: Model.pageSetting,//从model加载常量
            urls:{},//详细信息URL
            searchToggle: false,
            where:{},
            spzt:"",
            activeKey:"",
      };
    },

  fetch_rycx(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize}) {
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
                                      urls:result.data[0]._links,
                                      loading:false,//关闭加载状态
                               });
                          this.onSelect(result.data[0]);//联动详细信息，重新调用方法
                    }else{//空数据处理
                         const pagination = this.state.pagination;
                         pagination.total = 0;
                         this.setState({data: [],dataxx: {values: {}},datalist:[],loading:false, });
                    };
            },
            error: (err) =>{
                                  alert('api错误');
                                  this.setState({data: [],dataxx: {values: {}},datalist:[],loading:false, });
                                }
    });
  },

    fetch_kzxx(tabkey) {//详细信息（tab）数据处理方法，不能使用switch，否则会发生未知错误
      // let tabkey =this.state.tabkey //获取当前tab标签的key
      if (tabkey==1||tabkey==8||tabkey==13) {
        req({
        url: this.state.urls.herf_xxzl,//从主查询获取的后台dataProvider路径
        method: 'get',
        type: 'json',
        success: (result) => {
          this.setState({
            dataxx: result.data,
            datalist: result.data.ryjl,//简历的data
          });
        },error:  (err) =>{alert('api错误');this.setState({datalist:[],dataxx: {values: {}}});}
      });
      }else if (tabkey==2||tabkey==9||tabkey==14) {
        this.gettabdata(this.state.urls.herf_bgjl);
      }else if (tabkey==3||tabkey==10) {
        this.gettabdata(this.state.urls.herf_zsjl);
      }else if (tabkey==4||tabkey==11) {
        this.gettabdata(this.state.urls.herf_zjjl);
      }else if (tabkey==5||tabkey==12) {
        this.gettabdata(this.state.urls.herf_zzjl);
      }else if (tabkey==6) {
         req({ url: this.state.urls.herf_spzt,method: 'get',type: 'json',
        success: (result) => {
            this.setState({ spzt: result.data})//状态是个字符串
        },error: (err) =>{alert('api错误');this.setState({spzt:'',});}});
      }else if (tabkey==7) {
        this.gettabdata(this.state.urls.herf_njjl);
      };
    },
    gettabdata(urls){
      req({url: urls,method: 'get',type: 'json',
          success: (result) => {
            if (result.data.length!=0) {
            this.setState({datalist: result.data})
            }else{
               this.setState({datalist:[],})
             }
          },error: (err) =>{alert('api错误');this.setState({datalist:[],});}
        });
    },

    handleTableChange(pagination, filters, sorter) {//onChange方法，分页、排序、筛选变化时触发，必须三个参数才能准确获取
          const tablewhere = this.state.where;
          tablewhere.sfield = sorter.field;
          tablewhere.sorder = sorter.order;
          const paper = this.state.pagination;     //把this.state.pagination指向paper，与setState异曲同工，目的是更改单一属性数据
          paper.pageSize = pagination.pageSize;
          paper.current = pagination.current;
          this.fetch_rycx({//调用主查询
                pagenum: pagination.current,
                pagesize: pagination.pageSize,
                where:encodeURIComponent(JSON.stringify(tablewhere)),
          });
  },

    onSelect(record){//主查询记录被选中方法
       this.state.urls=record._links;
     this.setState({activeKey:1});
       this.callback(1);
    },

    handleSearchToggle(){//点击查询按钮，显示查询form
        this.setState({searchToggle: !this.state.searchToggle});
    }, 

    handleOk(value) {//点击搜索按钮触发事件
      this.setState({where:value});
      const paper = this.state.pagination;     //把当前页重置为1
        paper.current = 1;
       this.fetch_rycx({//调用主查询
        pagenum: 1,
        pagesize: this.state.pagination.pageSize,
        where:encodeURIComponent(JSON.stringify(value)),
      })
  },

  callback(key) {//tab标签变化返回值与方法
    this.setState({activeKey:key});
      this.fetch_kzxx(key);
},

  print(row,dylx){
    
    if (dylx) {
       var mp={};
      mp.DWMC=row.DWMC;
      window.open("#/print/zzdygl/glscdj?"+encodeURIComponent(JSON.stringify(mp)));
    }else{
      var mp={};
      mp.ZYZGZSBH=row.ZYZGZSBH;
      mp.ZYZSBH=row.ZYZSBH;
      mp.GRHYBH=row.GRHYBH;
      mp.XMING=row.XMING;
      mp.xb=row.xb;
      mp.DWMC=row.DWMC;
      mp.SRI=row.SRI;
      window.open("#/print/zzdygl/glscry?"+encodeURIComponent(JSON.stringify(mp)));
    };
  },

  ztRender(text, row, index) {
    var that=this;
     return (
                    <span>
                      <a onClick={that.print.bind(this,row,false)}>打印</a><span className="ant-divider" ></span>
                      <a onClick={that.print.bind(this,row,true)}>打印执业机构</a>
                    </span>
                  );
  },

  componentDidMount() { //REACT提供懒加载方法，懒加载时使用，且方法名必须为componentDidMount
      this.fetch_rycx(); //异步调用后台服务器方法fetch_rycx
    },

    render() {
      const columns = [{ //设定列
                title: '序号', //设定该列名称
                dataIndex: 'key', //设定该列对应后台字段名
                key: 'key', //列key，必须设置，建议与字段名相同
              }, {
                title: '姓名',
                dataIndex: 'XMING',
                key: 'XMING',
                sorter: true,
              }, {
                title: '性别',
                dataIndex: 'xb',
                key: 'xb',
              },{
                title: '联系电话',
                dataIndex: 'DHHM',
                key: 'DHHM',
                
              },  {
                title: '身份证号',
                dataIndex: 'SFZH',
                key: 'SFZH',
              }, {
                title: '学历',
                dataIndex: 'xl',
                key: 'xl',
                sorter: true,
              }, {
                title: '资格证书编号',
                dataIndex: 'ZYZGZSBH',
                key: 'ZYZGZSBH',
              }, {
                title: '执业证书（备案）编号',
                dataIndex: 'ZYZSBH',
                key: 'ZYZSBH',
              },{
                title: '是否出资人',
                dataIndex: 'czr',
                key: 'czr',
              },{
                title: '是否发起人',
                dataIndex: 'fqr',
                key: 'fqr',
              }, {
                title: '所属机构',
                dataIndex: 'DWMC',
                key: 'DWMC',
              },{
                  title: '操作',
                  dataIndex: 'dy',
                  key: 'dy',
                  fixed:'right',
                  render:this.ztRender
                }, 
          ];
        let toolbar = <ToolBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="arrow-up"/> :
                  <Icon className="toggle-tip" type="arrow-down"/>}
            </Button>

        </ToolBar>;

      return <div className="zyglscdy">
<div className="wrap">
   <div className="dataGird">
     <Panel  title="执业管理手册打印" toolbar={toolbar}>

          {this.state.searchToggle && <SearchForm onSubmit={this.handleOk}/>}
          <div className="h-scroll-table">
              <Table columns={columns} 
              dataSource={this.state.data} 
              pagination={this.state.pagination}
              onChange={this.handleTableChange} 
              onRowClick={this.onSelect}
              loading={this.state.loading}  bordered   />
              </div>
        </Panel>
    </div>

      <Panel >
          <Tabs type="line" activeKey={this.state.activeKey} onChange={this.callback} key="A">
                <TabPane tab="详细信息" key="1"><CompBaseTable data = {this.state.dataxx}  model ={Model.autoform} bordered striped /><p className="nbjgsz">人员简历：</p><Table columns={Model.ryjl} dataSource={this.state.datalist} bordered  size="small" pagination={false} /></TabPane>
                <TabPane tab="变更记录" key="2"><Table columns={Model.columnsZyrybgjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
                <TabPane tab="转所记录" key="3"><Table columns={Model.columnsZyryzsjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
                <TabPane tab="转籍记录" key="4"><Table columns={Model.columnsZyryzjjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
                <TabPane tab="转执记录" key="5"><Table columns={Model.columnsZyryzzjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
                <TabPane tab="审批状态" key="6"><Row><Col  offspan="8"><p>审批状态：{this.state.spzt} </p></Col></Row></TabPane>
                <TabPane tab="年检记录" key="7"><Table columns={Model.columnsZyrynjjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
          </Tabs>
                </Panel>
          </div>  
      </div>
        
    }
})
module.exports = rycx;



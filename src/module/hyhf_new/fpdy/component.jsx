import React from 'react'
import Panel from 'component/compPanel'
import config from 'common/configuration'
import req from 'reqwest'
import auth from 'common/auth'
import {Link} from 'react-router'
import SearchForm from './searchForm'
import {  InputNumber, Table, Icon, Tabs, Button, Row, Col, message,Form,Modal }from 'antd'
// 标签定义
const API_URL = config.HOST + config.URI_API_PROJECT + '/fpdy';
const API_URL_FP = config.HOST + config.URI_API_PROJECT + '/fpdy/ttgrfyfp/';
const API_URL_XG = config.HOST + config.URI_API_PROJECT + '/fpdy/fpjexg/';
const ToolBar = Panel.ToolBar;
const createForm = Form.create;
let jgcx = React.createClass({

  getInitialState() { //初始化State状态，使用传入参数
    return {
      //这些都是dataset
      data: [],//用于主查询
      pagination:  { //分页设置
          page: true, //是否分页
          pageSize: 5, //初始化显示记录条数
          showSizeChanger: true, //是否可以改变每页记录条数
          showQuickJumper: true, //是否可以快速跳转至某页
          size: 'small', //分页样式，当为「small」时，是小尺寸分页
          pageSizeOptions: ['5', '10', '20', '30', '40'], //指定每页可以显示多少条，与showSizeChanger配合使用
          current:1,
        },
      visible: false,//条件查询框默认状态
      where: {},
      rowIndex:'a',
      xgIndex:'a',
      year:'',
      tjData:{},
    };
  },

  handleTableChange(pagination, filters, sorter) {//onChange方法，分页、排序、筛选变化时触发，必须三个参数才能准确获取
    const tablewhere = this.state.where;
    tablewhere.sfield = sorter.field;
    tablewhere.sorder = sorter.order;
    const paper = this.state.pagination;     //把this.state.pagination指向paper，与setState异曲同工，目的是更改单一属性数据
    paper.pageSize = pagination.pageSize;
    paper.current = pagination.current;
    this.setState({rowIndex:'a',xgIndex:'a',fpZT:false,xgZT:false});
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
          headers:{'x-auth-token':auth.getToken()},
          success: (result) => {
            if (result.data.length != 0) {
              const pagination = this.state.pagination;
              pagination.total = result.page.pageTotal;//要求后台返回json写法有属性page，该属性包含pageTotal（总条数值）
              function showTotal() { return "共" + pagination.total + "条"; }
              pagination.showTotal = showTotal;//调用总条数返回方法
              this.setState({
                data: result.data,//传入后台获取数据，table组件要求每条查询记录必须拥有字段'key'
                loading: false,//关闭加载状态
                year:result.data[0].ND,
                tjData:result.jftj,
              });
            } else {//空数据处理
              const pagination = this.state.pagination;
              pagination.total = 0;
              this.setState({ data: [],  loading: false,tjData:result.jftj, });
            };
          },
          error: (err) => { alert('api错误'); this.setState({ data: [],  loading: false, });}
        });
  },

tthf(zje) {//团体会费校验规则方法
     const form = this.props.form;
    if ((form.getFieldValue('YJGRHF')>=0)||(form.getFieldValue('YJTTHF')>=0)) {
          if (form.getFieldValue('YJGRHF')+form.getFieldValue('YJTTHF')!=zje) {
          form.setFieldsValue({YJGRHF:zje-form.getFieldValue('YJTTHF')});
          };
    };
  },
 grhf(zje) {//个人会费校验规则方法
     const form = this.props.form;
    if ((form.getFieldValue('YJGRHF')>=0)||(form.getFieldValue('YJTTHF')>=0)) {
          if (form.getFieldValue('YJGRHF')+form.getFieldValue('YJTTHF')!=zje) {
          form.setFieldsValue({YJTTHF:zje-form.getFieldValue('YJGRHF')});
          };
    };
  },
  xgtthf(zje) {//修改团体会费校验规则方法
     const form = this.props.form;
    if ((form.getFieldValue('XGYJGRHF')>=0)||(form.getFieldValue('XGYJTTHF')>=0)) {
          if (form.getFieldValue('XGYJGRHF')+form.getFieldValue('XGYJTTHF')!=form.getFieldValue('JFZE')) {
          form.setFieldsValue({XGYJGRHF:form.getFieldValue('JFZE')-form.getFieldValue('XGYJTTHF')});
          };
    };
  },
 xggrhf(zje) {//修改个人会费校验规则方法
     const form = this.props.form;
    if ((form.getFieldValue('XGYJGRHF')>=0)||(form.getFieldValue('XGYJTTHF')>=0)) {
          if (form.getFieldValue('XGYJGRHF')+form.getFieldValue('XGYJTTHF')!=form.getFieldValue('JFZE')) {
          form.setFieldsValue({XGYJTTHF:form.getFieldValue('JFZE')-form.getFieldValue('XGYJGRHF')});
          };
    };
  },
  xgzje(zje) {//修改总金额校验规则方法
     const form = this.props.form;
    if ((!!form.getFieldValue('XGYJGRHF'))||(!!form.getFieldValue('XGYJTTHF'))) {
          if (form.getFieldValue('XGYJGRHF')+form.getFieldValue('XGYJTTHF')!=form.getFieldValue('JFZE')) {
          form.resetFields(['XGYJGRHF','XGYJTTHF']);
          };
    };
  },
  rowSelect(index){
      this.setState({rowIndex:index,fpZT:true});
  },
  rowConcel(){
      this.setState({rowIndex:'a',fpZT:false});
  },
  xgSelect(index){
      this.setState({xgIndex:index,xgZT:true});
  },
  xgConcel(){
      this.setState({xgIndex:'a',xgZT:false});
  },
  rowOK(row){
      let value = this.props.form.getFieldsValue();
      this.setState({ loading: true, });
      const fptj=value;
      const nowy = new Date(row.ND)
      fptj.jgid=row.jgid;
      fptj.nd=nowy.getFullYear();
      fptj.scid=row.scid;
      fptj.jfje=row.JFZE;
      req({
                url: API_URL_FP+row.jlid,
                type: 'json',
                method: 'put',
                data: JSON.stringify(fptj),
                contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                  if (resp) {
                      this.fetch_jgcx({//调用主查询
                        pagenum: this.state.pagination.current,
                        pagesize: this.state.pagination.pageSize,
                        where: encodeURIComponent(JSON.stringify(this.state.where)),
                      })
                  }else{
                        Modal.error({
                        title: '请检查金额分配情况',
                        content: (
                            <div>
                                <p><b>金额分配必须满足：</b></p>
                                <p>总金额=团体金额+个人金额</p>
                            </div>  )
                            });
                  };
                    this.setState({rowIndex:'a',fpZT:false});
            }).fail(err=> {
              this.setState({loading:false});
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
  xgOK(row){
      let value = this.props.form.getFieldsValue();
      if (!(value.XGYJTTHF>=0)||!(value.XGYJGRHF>=0)) {
          Modal.info({ title: '提示', content: (<div><p><b>必须分配团体或个人金额</b></p> </div>)});
          this.props.form.resetFields(['XGYJGRHF','XGYJTTHF']);
          return; 
      };
      this.setState({ loading: true, });
      const fptj=value;
      const nowy = new Date(row.ND)
      fptj.jgid=row.jgid;
      fptj.nd=nowy.getFullYear();
      fptj.scid=row.scid;
      fptj.jfje=row.JFZE;
      if (row.YJE>0) {
          fptj.yje=row.YJE
      };
      req({
                url: API_URL_XG+row.jlid,
                type: 'json',
                method: 'put',
                data: JSON.stringify(fptj),
                contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                  if (resp) {
                      this.fetch_jgcx({//调用主查询
                        pagenum: this.state.pagination.current,
                        pagesize: this.state.pagination.pageSize,
                        where: encodeURIComponent(JSON.stringify(this.state.where)),
                      })
                  }else{
                        Modal.error({
                        title: '请检查金额填写情况',
                        content: (
                            <div>
                                <p><b>金额分配必须满足：</b></p>
                                <p>总金额=团体金额+个人金额</p>
                            </div>  )
                            });
                  };
                    this.setState({xgIndex:'a',xgZT:false});
            }).fail(err=> {
              this.setState({loading:false});
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
  print(row){
    window.open("#/print/hyhf/fpdy?"+encodeURIComponent(JSON.stringify(row)));
  },
ztRender(text, row, index) {
    var that=this;
    if (!!this.state.fpZT&&index==this.state.rowIndex) {
          return (
                                <span>
                                  <a onClick={that.rowOK.bind(this,row)}>确定</a><span className="ant-divider" ></span>
                                  <a onClick={that.rowConcel}>取消</a>
                                </span>
                              );
    }else if (!!this.state.xgZT&&index==this.state.xgIndex) {
          return (
                                <span>
                                  <a onClick={that.xgOK.bind(this,row)}>确定</a><span className="ant-divider" ></span>
                                  <a onClick={that.xgConcel}>取消</a>
                                </span>
                              );
    };
     return (
                    <span>
                      <a onClick={that.xgSelect.bind(this,index)}>修改</a><span className="ant-divider" ></span>
                      <a onClick={that.rowSelect.bind(this,index)}>分配</a><span className="ant-divider" ></span>
                      <a onClick={that.print.bind(this,row)}>打印</a>
                    </span>
                  );
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

  componentDidMount() { //REACT提供懒加载方法，懒加载时使用，且方法名必须为componentDidMount
    this.fetch_jgcx(); //异步调用后台服务器方法fetch_jgcx
  },

  render() {
    var that=this;
    let rowI = this.state.rowIndex;
    let rowx = this.state.xgIndex;
    const { getFieldProps } = this.props.form
    let columns = [{ //设定列
                  title: '序号', //设定该列名称
                  dataIndex: 'key', //设定该列对应后台字段名
                  key: 'key', //列key，必须设置，建议与字段名相同
                }, {
                  title: '所属年度',
                  dataIndex: 'ND',
                  key: 'ND',
                  render(text) {
                    const nowy = new Date(text);//年份格式化
                    return (
                      <span>
                        {nowy.getFullYear()}
                      </span>
                    );
                  }
                }, {
                  title: '单位名称',
                  dataIndex: 'DWMC',
                  key: 'DWMC',
                },{
                  title: '银行备注',
                  dataIndex: 'BZ',
                  key: 'BZ',
                }, {
                  title: '总金额',
                  dataIndex: 'JFZE',
                  key: 'JFZE',
                  render(text, row, index) {
                    if (index==rowx) {
                    return <InputNumber {...getFieldProps('JFZE',{ initialValue: text,rules:[{type:'number'},{validator:()=>that.xgzje(row.JFZE)}]})} min={1} max={text} step={0.01} />;
                    }
                    return text;
                  }
                },{
                  title: '团体金额',
                  dataIndex: 'YJTTHF',
                  key: 'YJTTHF',
                  render(text, row, index) {
                    if (index==rowx) {
                    return <InputNumber {...getFieldProps('XGYJTTHF',{ rules:[{type:'number'},{validator:()=>that.xgtthf(row.JFZE)}]})}  min={0} max={row.JFZE} step={0.01} />;
                    }else if (index==rowI) {
                    return <InputNumber {...getFieldProps('YJTTHF',{ initialValue: text,rules:[{type:'number'},{validator:()=>that.tthf(row.JFZE)}]})}  min={0} max={row.JFZE} step={0.01} />;
                    };
                    return text;
                  }
                },  {
                  title: '个人金额',
                  dataIndex: 'YJGRHF',
                  key: 'YJGRHF',
                  render(text, row, index) {
                   if (index==rowx) {
                    return <InputNumber {...getFieldProps('XGYJGRHF',{ rules:[{type:'number'},{validator:()=>that.xggrhf(row.JFZE)}]})}  min={0} max={row.JFZE} step={0.01} />;
                    }else  if (index==rowI) {
                    return <InputNumber {...getFieldProps('YJGRHF',{ initialValue: text,rules:[{type:'number'},{validator:()=>that.grhf(row.JFZE)}]})} min={0} max={row.JFZE} step={0.01} />;
                    }
                    return text;
                  }
                }, {
                  title: '交费日期',
                  dataIndex: 'JFRQ',
                  key: 'JFRQ',
                }, {
                  title: '打印次数',
                  dataIndex: 'DYCS',
                  key: 'DYCS',
                },{
                  title: '分配人',
                  dataIndex: 'GGR',
                  key: 'GGR',
                },{
                  title: '修改人',
                  dataIndex: 'XGR',
                  key: 'XGR',
                },{
                  title: '原金额',
                  dataIndex: 'YJE',
                  key: 'YJE',
                },{
                  title: '操作',
                  dataIndex: 'dy',
                  key: 'dy',
                  fixed:'right',
                  render:this.ztRender
                },
            ];
    let toolbar = <ToolBar><div>
      <Button type="ghost" onClick={this.handleSearchToggle}>
        <Icon type="search"/>查询
        { this.state.searchToggle ? <Icon className="toggle-tip" type="arrow-up"/> :
          <Icon className="toggle-tip" type="arrow-down"/>}
      </Button><span className="ant-divider"></span>
      <Link to="hyhf/hyhfjnqk"><Button type="ghost"  >返回会费缴纳</Button></Link>
    </div>
    </ToolBar>;
    return <div className="fpdy">
      <div className="wrap">
          <Panel title="发票打印" toolbar={toolbar}>
            {this.state.searchToggle && <SearchForm
              onSubmit={this.handleOk} year={this.state.year}/> }
              <div className="fix-table table-bordered table-striped">
              <table><tbody><tr>
                          <td style={{'width':'150px'}}><b>打印统计：</b></td>
                          <td><b>统计年份：</b><span style={{'color':'blue'}}>{this.state.tjData.dynd}</span></td>
                          <td><b>缴费记录数：</b><span style={{'color':'blue'}}>{this.state.tjData.ts}</span></td>
                          <td><b>打印次数：</b><span style={{'color':'blue'}}>{this.state.tjData.cs}</span></td>
                          <td><b>打印发票总金额：</b><span style={{'color':'blue'}}>{this.state.tjData.dyze}</span></td>
                </tr></tbody></table></div>
              <div className="h-scroll-table">
            <Table columns={columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              loading={this.state.loading}  bordered   /></div>
          </Panel>
        </div>

    </div>

  }
});
jgcx = createForm()(jgcx);
module.exports = jgcx;



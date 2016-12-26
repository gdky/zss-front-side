import React from 'react'
import CompBaseTable from 'component/compBaseTable';
import CompInputBaseTable from 'component/compInputBaseTable';
import config from 'common/configuration'
import Panel from 'component/compPanel'
import './style.css'
import req from 'reqwest'
import auth from 'common/auth'
import Model from './model.js' 
import SearchForm from './searchForm'
import { Link } from 'react-router'
import {  DatePicker,Modal,Form, Input, Select,Table, Icon,Tabs,Button,Row,Col,message,Dropdown,Menu,Spin,Radio,Upload,Popconfirm }from 'antd'
// 标签定义
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const API_URL = config.HOST+config.URI_API_PROJECT + '/swsrycx/cyry';
const API_URL_BG = config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/cyrybgsq';
const API_URL_ZFZY= config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/zyzfzysq';
const API_URL_ZX = config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/cyzxsq';
const API_URL_DC = config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/cydcsq';
const API_URL_FS = config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/cyzrfssq';
const API_URL_CYRFS = config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/cydrzssq';
const API_URL_ZC = config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/cyzcsq';
const API_URL_ZS = config.HOST+config.URI_API_PROJECT + '/spapi/spsq/zyzssq';
const API_URL_BA = config.HOST+config.URI_API_PROJECT + '/spapi/fspsq/cyrybasq';
const API_URL_GX = config.HOST + config.URI_API_PROJECT + '/rygl/ryxpgx/';
const API_URL_ISSFZH = config.HOST + config.URI_API_PROJECT + '/commont/checksfzh/';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

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
            czAll:0,
            activeKey:"",
            ryid:"",
            xpPath:"",
            letValues:{},
            fsRad:null,
            valueFS: '',

      };
    },

  fetch_rycx(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize}) {
     this.setState({loading:true,});//主查询加载状态
      req({
            url: API_URL,//默认数据查询后台返回JSON
            method: 'get',
            type: 'json',
            data: params,
            headers:{'x-auth-token':auth.getToken()},
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
            error: (err) =>{alert('api错误');}
    });
  },

    fetch_kzxx(tabkey) {//详细信息（tab）数据处理方法，不能使用switch，否则会发生未知错误
      this.setState({sloading: true, })
      if (tabkey==13) {
        req({
        url: this.state.urls.herf_xxzl,//从主查询获取的后台dataProvider路径
        method: 'get',
        type: 'json',
        headers:{'x-auth-token':auth.getToken()},
        success: (result) => {
          for(let j=0;j<Model.ryjl.rowNum;j++){
            for (let k = 0;k < Model.ryjl.rows.length; k++) {
                let prop = Model.ryjl.rows[k].dataIndex;
                result.data[prop+'_'+(j+1)+'_'+k] = (typeof result.data.ryjl[j] ==='undefined'?null:result.data.ryjl[j][prop]);
            }
          }
          this.setState({
            dataxx: result.data,
            datalist: result.data.ryjl,//简历的data
            sloading: false
          });
        },error:  (err) =>{alert('api错误');}
      });
      }else if (tabkey==14) {
        req({url: this.state.urls.herf_bgjl,method: 'get',type: 'json',
          headers:{'x-auth-token':auth.getToken()},
          success: (result) => {
            if (result.data.length!=0) {
            this.setState({datalist: result.data,sloading: false})
            }else{
               this.setState({datalist:[],sloading: false})
             }
          },error: (err) =>{alert('api错误');this.setState({datalist:[],sloading: false});}
        });
      };
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
      if (this.state.ryid!=record.ryid) {
       this.state.urls=record._links;
        this.setState({activeKey:13,ryid:record.ryid});
       this.callback(13);
     }
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
    handleCZ(lx,e){//操作入口
    e.preventDefault();
    this.setState({czAll:lx,letValues:{}});
    
    },
    handleReturn(){//返回按钮
    this.setState({czAll:0,valueFS: '',letValues:{}});
    this.callback(13);
},
  valueReset(){
    this.setState({letValues:this.state.data});
  },
    handleBGSubmit(value){
        this.setState({bgLoading:true});
            var ls = value;
            let squrls="";
            switch(this.state.czAll){
                case 1: squrls=API_URL_BG;ls.xppath=(!this.state.xpPath?this.state.dataxx.xpian:this.state.xpPath);break;
                case 2: squrls=API_URL_ZFZY;break;
                case 3: squrls=API_URL_ZX;break;
                case 4: squrls=API_URL_DC;break;
                case 6: squrls=API_URL_ZS;break;
                case 8: squrls=API_URL_BA;
                            if (!this.state.xpPath) {
                                Modal.info({ title: '提示', content: (<div><p><b>请上传照片</b></p> </div>)});
                                this.setState({bgLoading:false,letValues:this.refs.addValues.getFieldsValue()});
                                return
                            }
                            ls.xppath=this.state.xpPath;
                            req({url: API_URL_ISSFZH+ls.sfzh,method: 'get',type: 'json',
                              headers:{'x-auth-token':auth.getToken()},
                              success: (result) => {
                                if (result==false) {
                                    Modal.info({ title: '提示', content: (<div><p><b>身份证号码已在管理中心备案</b></p> </div>)});
                                    this.setState({bgLoading:false,letValues:this.refs.addValues.getFieldsValue()});
                                    return
                                 }
                              },error: (err) =>{alert('身份证校验错误');this.setState({bgLoading:false,letValues:this.refs.addValues.getFieldsValue()});return}
                              });
                            break;
            }
            ls.ryid=this.state.ryid;
             req({
                url: squrls,
                type: 'json',
                method: 'put',
                data: JSON.stringify(ls),
                contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()},
            }).then(resp=> {
              var that=this;
                Modal.success({
                    title: '提交成功',
                    content: (
                        <div>
                            <p>提交成功</p>
                        </div>  ),
                    onOk() {
                              that.fetch_rycx();
                            },
                });
                 this.setState({bgLoading:false,czAll:0,valueFS: '',letValues:{}});
            }).fail(err=> {
                Modal.error({
                    title: '数据获取错误',
                    content: (
                        <div>
                        {this.state.czAll==6?<p>请检查事务所名称和网络情况</p>:
                          <p>无法从服务器返回数据，需检查应用服务工作情况</p>}
                            <p>Status: {err.status}</p>
                        </div>  )
                });
                this.setState({bgLoading:false,letValues:this.refs.addValues.getFieldsValue()});
            })
        },
      showConfirm(e) {
            e.preventDefault();
            var that=this;
            let squrls="";
            let ls = {};
             ls.ryid=this.state.ryid;
            let con ="提交后该人员将从本事务所人员系统中除去，转出至人才库";
            let med="put";
            if(this.state.czAll==5){
               if (this.state.valueFS =='') {
                  Modal.error({
                            title: '请选择转入分所',
                        });
                  return;
                };
                squrls=API_URL_FS;
                ls.pid=this.state.valueFS;
                con="提交后该人员将调入到所选择分所中，由分所管理，并从本事务所人员系统中除去";
            }else if(this.state.czAll==10){
              squrls=API_URL_CYRFS;
              con="提交后该执业税务师将调入到所选择主所中，由主所管理，并从本事务所人员系统中除去";
            }else{
              squrls=API_URL_ZC;
            }
              Modal.confirm({
                title: '您是否确认提交以上信息？'  ,
                content: con,
                onOk() {
                  that.setState({bgLoading:true});
                  req({
                        url: squrls,
                        type: 'json',
                        method: med,
                        data: JSON.stringify(ls),
                        contentType: 'application/json',
                        headers:{'x-auth-token':auth.getToken()},
                    }).then(resp=> {
                        Modal.success({
                            title: '提交成功',
                            content: (
                                <div>
                                    <p>提交成功</p>
                                </div>  ),
                            onOk() {
                              that.fetch_rycx();
                            },
                        });
                         that.setState({bgLoading:false,czAll:0,valueFS: '',letValues:{}});
                    }).fail(err=> {
                        Modal.error({
                            title: '数据获取错误',
                            content: (
                                <div>
                                    <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                                    <p>Status: {err.status}</p>
                                </div>  )
                        });
                        that.setState({bgLoading:false});
                    })
                },
              });
            },

    onChangeFS(e) {
      this.setState({
        valueFS: e.target.value,
      });
    },

    handleReset(){
      this.setState({valueFS: ''});
    },

    columRender(text, row, index) {
          var that = this;
          if (row.ztdm==14) {
                return <span>
                          <a onClick={that.handleCZ.bind(this,9)}>重新申请备案</a>
                          <span className="ant-divider" ></span>
                          <Popconfirm title="撤销后需重新备案，是否撤销？" onConfirm={that.handleCX.bind(this,11)}>
                        <a >撤销备案</a></Popconfirm>
                        </span>
            };
            if (row.ztdm==3) {
                return <span>
                          该执业税务师审批中，无法进行操作
                        </span>
            };
          const menu = (
                    <Menu >
                      <Menu.Item key="0">
                        <a onClick={that.handleCZ.bind(this,4)}>调出</a>
                      </Menu.Item>
                      <Menu.Item key="1">
                        {that.state.fsRad==1?<a onClick={that.handleCZ.bind(this,10)}>转入主所</a>:
                                    <a onClick={that.handleCZ.bind(this,5)}>转入分所</a>}
                      </Menu.Item>
                      <Menu.Divider />
                      
                      <Menu.Item key="3">
                        <a onClick={that.handleCZ.bind(this,7)}>转出</a>
                      </Menu.Item>
                    </Menu>
                  );
          return  <span>
                        <a onClick={that.handleCZ.bind(this,1)}>信息变更</a>
                        <span className="ant-divider"></span>
                        <a onClick={that.handleCZ.bind(this,3)}>注销备案</a>
                        <span className="ant-divider"></span>
                        <Dropdown overlay={menu} trigger={['click']}>
                        <a  className="ant-dropdown-link">
                          人员调动 <Icon type="down" />
                        </a></Dropdown>
                      </span>
    },
    upLoadOnChange(info) {
                if (info.file.status == 'uploading') {
                    this.setState({letValues:this.refs.addValues.getFieldsValue()});
                }
                if (info.file.status == 'done') {
                    this.setState({xpPath:info.file.response.text});
                } else if (info.file.status == 'error') {
                    Modal.error({
                        title: '上传失败',
                        content: (<p>{info.file.name}相片上传失败</p>)
                    });
                }
            },
  componentDidMount() { //REACT提供懒加载方法，懒加载时使用，且方法名必须为componentDidMount
      this.fetch_rycx(); //异步调用后台服务器方法fetch_rycx
      req({
            url: config.HOST+config.URI_API_PROJECT + '/jg/jgchild',//判断是否分所
            method: 'get',
            type: 'json',
            contentType: 'application/json',
            headers:{'x-auth-token':auth.getToken()},
        }).then(resp=> {
          if (typeof resp ==='object' &&resp.length>0) {
          const fsmap=resp.map((fs,index)=>
            <Radio  style={radioStyle} key={index} value={fs.ID} >{fs.DWMC}</Radio>
            )
          this.setState({fsRad:fsmap});
          }else if(resp==1){
            this.setState({fsRad:1});
          }else{
            this.setState({fsRad:false});
          };
        })
    },

    render() {
      const columns = [{ //设定列
                  title: '序号', //设定该列名称
                  dataIndex: 'xh', //设定该列对应后台字段名
                  key: 'xh', //列key，必须设置，建议与字段名相同
                }, {
                  title: '人员名称',
                  dataIndex: 'xm',
                  key: 'xm',
                  sorter: true, //是否可以排序，需后台写排序方法
                }, {
                  title: '性别',
                  dataIndex: 'xb',
                  key: 'xb',
                },{
                  title: '身份证号码',
                  dataIndex: 'sfzh',
                  key: 'sfzh',
                },  {
                  title: '城市',
                  dataIndex: 'cs',
                  key: 'cs',
                }, {
                  title: '学历',
                  dataIndex: 'xl',
                  key: 'xl',
                  sorter: true,
                }, {
                  title: '职务（职称）',
                  dataIndex: 'zw',
                  key: 'zw',
                  sorter: true,
                }, {
              title: '操作',
              key: 'operation',
              render:this.columRender,
              width:260,
            }];
        var that =this;
        const props = {
            showUploadList: false,
            name: 'file',
            action: '/api/upload',
            headers: {'x-auth-token': auth.getToken()},
            onChange:this.upLoadOnChange,
            beforeUpload(file) {
                if (file.type.indexOf('image')<0) {
                    message.error('只能上传图片类型文件');
                    return false;
                }
                if (file.size>3145728) {
                    message.error('文件大小不能超过3M');
                    return false;
                }
                return true;
            }
        };
         let toolbar = <ToolBar>
                <Button type="ghost" onClick={this.handleCZ.bind(this,8)}>添加从业人员</Button>
                <Button onClick={this.handleSearchToggle} type="ghost">
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="arrow-up"/> :
                  <Icon className="toggle-tip" type="arrow-down"/>}
            </Button>
        </ToolBar>; 
        let toolbar2 = <ToolBar>
                <Button type="ghost" onClick={this.handleReturn}>返回</Button>
        </ToolBar>; 
      return <div className="rycx">
            <div className="wrap">
               <div className="dataGird">
                 {this.state.czAll!=8 &&<Panel title="从业人员管理" toolbar={toolbar} >
                      {this.state.searchToggle && <SearchForm onSubmit={this.handleOk}/>}
                          <Table columns={columns} 
                          dataSource={this.state.data} 
                          pagination={this.state.pagination}
                          onChange={this.handleTableChange} 
                          onRowClick={this.onSelect}
                          loading={this.state.loading}  bordered   />
                    </Panel>}
                </div>

                  <Panel >
                      {this.state.czAll==0 &&<Spin spinning={this.state.sloading}><Panel >
                               <Tabs type="line" activeKey={this.state.activeKey} onChange={this.callback} key="A">
                                    
                                    <TabPane tab="详细信息" key="13" >
                                    <div style={{float:"right",width:"143px",height:"175px",backgroundColor: "#fff",border: "1px solid #e9e9e9"}}>
                                            {!this.state.dataxx.xpian? <p>未上传相片</p> : <img src={this.state.dataxx.xpian} style={{padding:"5px",width:"138px",height:"170px"}}/>}
                                      </div>
                                      <CompBaseTable data = {this.state.dataxx}  model ={Model.autoformCy} bordered striped />
                                    <p className="nbjgsz">人员简历：</p>
                                    <Table columns={Model.ryjl.rows} dataSource={this.state.datalist} bordered  size="small" pagination={false} />
                                    </TabPane>
                                    <TabPane tab="变更记录" key="14"><Table columns={Model.columnsZyrybgjl} dataSource={this.state.datalist} bordered  size="small" /></TabPane>
                              </Tabs>
                                    </Panel></Spin>}
                    {this.state.czAll==1 &&<Panel title="信息变更" toolbar={toolbar2}>
                                    <Spin spinning={this.state.sloading}>
                                    <div style={{float:"right",}}>
                                    <div style={{width:"143px",height:"175px",backgroundColor: "#fff",border: "1px solid #e9e9e9"}}>
                                            {!this.state.xpPath?!this.state.dataxx.xpian? <p>未上传相片</p> :
                                             <img src={this.state.dataxx.xpian} style={{padding:"5px",width:"138px",height:"170px"}}/>:
                                             <img src={this.state.xpPath} style={{padding:"5px",width:"138px",height:"170px"}}/> }
                                      </div><Upload {...props}><Button >更改照片</Button></Upload><p>（文件大小不能超过3M）</p></div>
                                    <CompInputBaseTable data={typeof(this.state.letValues.xm)==='undefined'?this.state.dataxx:this.state.letValues}  model={Model.autoformCy2} bordered striped showConfirm bglx 
                                     onSubmit={this.handleBGSubmit}  disabled={this.state.onSubmitZT} nbsj={this.state.datalist} ref="addValues" valueReset={this.valueReset} 
                                      submitLoading={this.state.bgLoading} title='您是否确认要提交以上变更信息？'  nbjgsz={Model.ryjl} nbTitle="人员简历："
                                      content='变更后数据将更新' />
                                     </Spin></Panel>}
                    {this.state.czAll==8 &&<Panel title="添加从业人员" toolbar={toolbar2}>
                                    <Spin spinning={this.state.sloading}>
                                    <div style={{float:"right",}}>
                                    <div style={{width:"143px",height:"175px",backgroundColor: "#fff",border: "1px solid #e9e9e9"}}>
                                            {!this.state.xpPath? <p>未上传相片</p> : <img src={this.state.xpPath} style={{padding:"5px",width:"138px",height:"170px"}}/>}
                                      </div><Upload {...props}><span style={{'color':'red',fontSize:'large'}}>*</span><Button >上传照片</Button></Upload><p>（文件大小不能超过3M）</p></div>
                                    <CompInputBaseTable data={this.state.letValues}  model={Model.autoformCy2} bordered striped showConfirm  
                                     onSubmit={this.handleBGSubmit} nbjgsz={Model.ryjl} nbTitle="人员简历：" ref="addValues" 
                                      submitLoading={this.state.bgLoading} title='您是否确认要提交以上人员信息？'  
                                      content='提交后该人员将在管理中心备案' />  
                                     </Spin></Panel>}
                    {this.state.czAll==2 &&<Panel title="转执业" toolbar={toolbar2}>
                        <Spin spinning={this.state.sloading}>
                                    <div style={{float:"right",}}>
                                    <div style={{width:"143px",height:"175px",backgroundColor: "#fff",border: "1px solid #e9e9e9"}}>
                                            {!this.state.xpPath? <p>未上传相片</p> : <img src={this.state.xpPath} style={{padding:"5px",width:"138px",height:"170px"}}/>}
                                      </div><Upload {...props}><span style={{'color':'red',fontSize:'large'}}>*</span><Button >上传照片</Button></Upload><p>（文件大小不能超过3M）</p></div>
                                    <CompInputBaseTable data={typeof(this.state.letValues.xm)==='undefined'?this.state.dataxx:this.state.letValues}  model={Model.autoformba} bordered striped showConfirm  
                                     onSubmit={this.handleBGSubmit} nbjgsz={Model.ryjl} nbTitle="人员简历：" ref="addValues" valueReset={this.valueReset}
                                      submitLoading={this.state.bgLoading} title='您是否确认要提交以下人员信息？'  
                                      content='提交后将提交省管理中心审批，通过后该人员将以执业税务师身份在管理中心备案' />  
                                     </Spin></Panel>}
                        {this.state.czAll==3 &&<Panel title="注销备案" toolbar={toolbar2}>
                        <Spin spinning={this.state.sloading}><p className="nbjgsz"><b style={{'padding':'10px'}}>{this.state.dataxx.xm} 注销备案申请</b></p>
                        <CompInputBaseTable data={this.state.letValues}  model={Model.autoform3} bordered striped reset showConfirm
                        onSubmit={this.handleBGSubmit}  disabled={this.state.onSubmitZT} ref="addValues"
                        submitLoading={this.state.bgLoading} title='您是否确认提交以上信息？'  
                        content='提交后该人员将注销'  />
                        </Spin></Panel>}
                        {this.state.czAll==4 &&<Panel title="人员调出" toolbar={toolbar2}>
                        <Spin spinning={this.state.sloading}><p className="nbjgsz"><b style={{'padding':'10px'}}>{this.state.dataxx.xm} 调出申请</b></p>
                        <CompInputBaseTable data={this.state.letValues}  model={Model.autoform4} bordered striped reset showConfirm
                        onSubmit={this.handleBGSubmit}  disabled={this.state.onSubmitZT} ref="addValues"
                        submitLoading={this.state.bgLoading} title='您是否确认提交以上信息？'  
                        content='提交后该人员将不在系统备案'  />
                        </Spin></Panel>}
                        {this.state.czAll==5 &&<Panel title="转入分所" toolbar={toolbar2}>
                        {!this.state.fsRad?<div style={{'textAlign':'center'}}><p style={{'color':'red'}}><b>该事务所无分所</b></p></div>:
                        <Spin spinning={this.state.sloading}><p className="nbjgsz">
                        <b style={{'padding':'10px'}}>{this.state.dataxx.xm} 转入分所申请</b></p>
                          <div style={{'textAlign':'center'}}><div><p><b>选择转入分所：</b></p>
                          <RadioGroup onChange={this.onChangeFS} value={this.state.valueFS} size="large" >
                              {this.state.fsRad}
                            </RadioGroup></div></div>
                            <p style={{'textAlign':'center'}}><Button type="primary" disabled={this.state.onSubmitZT} onClick={this.showConfirm} loading={this.state.bgLoading}>提交</Button>
                            <span className="ant-divider"></span><Button type="ghost"  htmlType="submit" onClick={this.handleReset} >重置</Button></p>
                          </Spin>}</Panel>}
                        {this.state.czAll==6 &&<Panel title="转所" toolbar={toolbar2}>
                        <Spin spinning={this.state.sloading}><p className="nbjgsz"><b style={{'padding':'10px'}}>{this.state.dataxx.xm} 转所申请</b></p>
                        <CompInputBaseTable data={this.state.letValues}  model={Model.autoform6} bordered striped reset showConfirm
                        onSubmit={this.handleBGSubmit} disabled={this.state.onSubmitZT} ref="addValues"
                        submitLoading={this.state.bgLoading} title='您是否确认提交以上信息？'  
                        content='提交后该人员将转入该所'  />
                        </Spin></Panel>}
                        {this.state.czAll==7 &&<Panel title="转出" toolbar={toolbar2}>
                        <Spin spinning={this.state.sloading}><p className="nbjgsz"><b style={{'padding':'10px'}}>{this.state.dataxx.xm} 转出申请</b></p>
                        <div style={{'textAlign':'center',padding:'20px'}}><div><p><b>若该人员不在本事务所工作，可进行此操作，操作后该人员将进入储备库中，并从本事务所人员系统中除去。</b></p></div></div>
                            <p style={{'textAlign':'center'}}><Button type="primary" disabled={this.state.onSubmitZT} onClick={this.showConfirm} loading={this.state.bgLoading}>提交</Button>
                            <span className="ant-divider"></span><Button type="ghost"  htmlType="submit" onClick={this.handleReturn} >取消</Button></p>
                        </Spin></Panel>}
                         {this.state.czAll==10 &&<Panel title="转入主所" toolbar={toolbar2}>
                                    <Spin spinning={this.state.sloading}><p className="nbjgsz"><b style={{'padding':'10px'}}>{this.state.dataxx.xm} 转入主所申请</b></p>
                                    <div style={{'textAlign':'center',padding:'20px'}}><div><p><b>提交后将向主所发起调入申请，主所通过后该人员进入主所人员系统</b></p></div></div>
                                        <p style={{'textAlign':'center'}}><Button type="primary" disabled={this.state.onSubmitZT} onClick={this.showConfirm} loading={this.state.bgLoading}>提交</Button>
                                        <span className="ant-divider"></span><Button type="ghost"  htmlType="submit" onClick={this.handleReturn} >取消</Button></p>
                                    </Spin></Panel>}           
                            </Panel>
                      </div>  
                  </div>
        
    }
})
module.exports = rycx;



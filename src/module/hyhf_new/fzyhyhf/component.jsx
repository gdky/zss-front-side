import React from 'react'
import {DatePicker,Table,Modal,Row,Col,Button,Icon,Upload,Input,Select,InputNumber,Form,message,Spin,Popconfirm} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import SearchForm from './searchForm'
import config from 'common/configuration'
import auth from 'common/auth'
import {Link} from 'react-router'
import {SelectorYear} from 'component/compSelector'


const API_URL = config.HOST + config.URI_API_PROJECT + '/hyhf/fzyhfjn';
const API_URL_TJ = config.HOST + config.URI_API_PROJECT + '/hyhf/fzytj';
const API_URL_XG = config.HOST + config.URI_API_PROJECT + '/hyhf/fzyxg/';
const API_URL_Del = config.HOST + config.URI_API_PROJECT + '/hyhf/fzyDel/';
const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;
const createForm = Form.create;
const Option = Select.Option;

let lrb = React.createClass({
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
            modelvisible: false,
            where: {},
            sloading: false,
            rowIndex:'a',
        }
    },

    //改变页码
    handleChange(pagination, filters, sorter){
        const tablewhere = this.state.where;
        tablewhere.sfield = sorter.field;
        tablewhere.sorder = sorter.order;
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({rowIndex:'a',xgZT:false});
        this.fetchData({
            pagenum: pager.current,
            pagesize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(tablewhere))
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
        this.setState({pagination: pager, where: value});
        this.fetchData({
            pagenum: 1,
            pagesize: pager.pageSize,
            where: encodeURIComponent(JSON.stringify(value))
        })
    },
    showModal() {
        this.setState({
          modelvisible: true,
        });
        this.props.form.resetFields();
      },
   modelOk() {
        this.setState({
          mloading: true,
        });
        let value = this.props.form.getFieldsValue();
        req({
                url: API_URL_TJ,
                type: 'json',
                method: 'post',
                data: JSON.stringify(value),
                contentType: 'application/json',
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp=> {
                  if (resp) {
                      this.fetchData({//调用主查询
                        pagenum: this.state.pagination.current,
                        pagesize: this.state.pagination.pageSize,
                        where: encodeURIComponent(JSON.stringify(this.state.where)),
                      })
                      message.success('添加成功');
                  }else{
                        Modal.error({
                        title: '添加失败',
                        content: (
                            <div>
                                <p>请检查身份证号</p>
                                <p>请不要重复提交，修改金额请于修改操作中修改</p>
                            </div>  )
                            });
                  };
                  message.destroy();
                    this.setState({mloading:false,modelvisible: false,});
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
      modelCancel(e) {
        if (this.state.mloading) {
            message.loading('正在执行...', 0);
        }else{
        this.setState({
          modelvisible: false,
        });
        };
      },

    //通过API获取数据
    fetchData(params = {pagenum: this.state.pagination.current, pagesize: this.state.pagination.pageSize}){
        this.setState({loading: true});
        req({
            url: API_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            const p = this.state.pagination;
            p.total = resp.page.pageTotal;
            p.showTotal = total => {
                return `共 ${resp.page.pageTotal} 条`
            };
            this.setState({
                data: resp.data,
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
    xgSelect(index){
      this.setState({rowIndex:index,xgZT:true});
  },
    xgConcel(){
      this.setState({rowIndex:'a',xgZT:false});
  },
    xgOK(row){
      let value = this.props.form.getFieldsValue();
      if (!row.jlid) {
          Modal.info({ title: '提示', content: (<div><p><b>未有缴费记录，请添加后修改</b></p> </div>)});
          return; 
      };
      this.setState({ loading: true, });
      const fptj=value;
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
                      this.fetchData({//调用主查询
                        pagenum: this.state.pagination.current,
                        pagesize: this.state.pagination.pageSize,
                        where: encodeURIComponent(JSON.stringify(this.state.where)),
                      })
                    this.setState({rowIndex:'a',xgZT:false});
                    message.success('修改成功');
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
   rowDel(row) {
        this.setState({ loading: true, });
        req({
              url: API_URL_Del+row.jlid,
              type: 'json',
              method: 'delete',
              contentType: 'application/json',
              headers:{'x-auth-token':auth.getToken()}
          }).then(resp=> {
                    this.fetchData({//调用主查询
                      pagenum: this.state.pagination.current,
                      pagesize: this.state.pagination.pageSize,
                      where: encodeURIComponent(JSON.stringify(this.state.where)),
                    })
                  this.setState({rowIndex:'a',xgZT:false});
                  message.success('删除成功');
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
    if (!row.JE) {
        return (
                    <span>
                      <a onClick={that.showModal}>新增缴费</a>
                    </span>
                  );
    };
     if (!!this.state.xgZT&&index==this.state.rowIndex) {
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
                      <Popconfirm title="是否确认删除该缴费记录？" onConfirm={that.rowDel.bind(this,row)} ><a >删除</a></Popconfirm><span className="ant-divider" ></span>
                      <a onClick={that.print.bind(this,row)}>打印发票</a>
                    </span>
                  );
  },
    render(){
        let rowx = this.state.rowIndex;
        const columns = [{ //设定列
                  title: '序号', //设定该列名称
                  dataIndex: 'key', //设定该列对应后台字段名
                  key: 'key', //列key，必须设置，建议与字段名相同
                  sorter: true,
                }, {
                  title: '所属年度',
                  dataIndex: 'nd',
                  key: 'nd',
                }, {
                  title: '姓名',
                  dataIndex: 'XMING',
                  key: 'XMING',
                  sorter: true,
                  // render:this.ztRender
                }, {
                  title: '性别',
                  dataIndex: 'XB',
                  key: 'XB',
                  sorter: true,
                },{
                  title: '身份证号',
                  dataIndex: 'SFZH',
                  key: 'SFZH',
                },  {
                  title: '城市',
                  dataIndex: 'CS',
                  key: 'CS',
                  sorter: true,
                },{
                  title: '非执业注册日期',
                  dataIndex: 'FZYZCRQ',
                  key: 'FZYZCRQ',
                  sorter: true,
                }, {
                  title: '执业资格证书编号',
                  dataIndex: 'ZYZGZSBH',
                  key: 'ZYZGZSBH',
                }, {
                  title: '非执业注册编号',
                  dataIndex: 'FZYZCZSBH',
                  key: 'FZYZCZSBH',
                },{
                  title: '已交会费',
                  dataIndex: 'JE',
                  key: 'JE',
                  sorter: true,
                  render(text, row, index) {
                    if (index==rowx) {
                    return <InputNumber {...getFieldProps('JE',{ initialValue: text})} min={1} step={0.01} />;
                    }
                    return <span style={{color:'blue'}}>{text}</span>;
                  }
                }, {
                  title: '缴费日期',
                  dataIndex: 'JFRQ',
                  key: 'JFRQ',
                  render(text, row, index) {
                    return <span style={{color:'blue'}}>{text}</span>;
                  }
                }, {
                  title: '备注',
                  dataIndex: 'BZ',
                  key: 'BZ',
                  render(text, row, index) {
                    if (index==rowx) {
                    return <Input {...getFieldProps('BZ',{ initialValue: text})}  />;
                    }
                    return text;
                  }
                },  {
                  title: '所属单位',
                  dataIndex: 'ZZDW',
                  key: 'ZZDW',
                  sorter: true,
                }, {
                  title: '人员状态',
                  dataIndex: 'ryzt',
                  key: 'ryzt',
                }, {
                  title: '录入人',
                  dataIndex: 'LRR',
                  key: 'LRR',
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
         var that=this;
             const props = {
              showUploadList:false,
              name: 'file',
              action: '/api/zs/hyhf/fzyhyhfplsc',
              headers:{'x-auth-token':auth.getToken()},
              onChange(info) {
                if (info.file.status == 'uploading') {
                  that.setState({sloading: true});
                }
                if (info.file.status == 'done') {
                  that.setState({sloading: false});
                  let ff = false;
                  if (info.file.response.fls.length>0) {
                   const fls= info.file.response.fls.map((fl,index) =>
                      <li key={index}>{fl}</li>
                      );
                    ff = <div style={{'height':'200px','overflowY':'auto'}}><ol>{fls}</ol></div>;
                  };
                  Modal.success({
                      title: '上传完成',
                      width:'50%',
                      content:(<div>
                      <p><b>其中成功：</b>{info.file.response.success}条</p>
                      <p><b>其中失败：</b><span style={{'color':'red'}}>{info.file.response.fail}条</span></p>
                      {!!ff&&<p><b>其中失败记录及原因：</b></p>}
                      {ff}
                    </div>),
                      onOk(){
                      that.componentDidMount();
                      }
                    });
                } else if (info.file.status == 'error') {
                  that.setState({sloading: false});
                  Modal.error({
                      title: '上传失败',
                      content: (<p>{info.file.name}上传失败</p>)
                    });
                }
              },
              beforeUpload(file) {
                  if (!(file.type =='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||file.type =='application/vnd.ms-excel')) {
                    message.error('只能上传 XLS或XLSX 类型文件',2);
                    return false;
                  }
                  return true;
                },
            };
        let toolbar = <ToolBar><div>
              <Button type="ghost" onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="arrow-up"/> :
                  <Icon className="toggle-tip" type="arrow-down"/>}
              </Button><span className="ant-divider"></span>
              <Button type="ghost" onClick={this.showModal} >新增缴费</Button>
              <span className="ant-divider"></span>
              <Upload {...props}><Button type="ghost"  ><Icon type="upload" />批量缴费</Button></Upload>
              <span className="ant-divider"></span>
              <Link to="hyhf/scgl?fzy"><Button type="ghost"  >上传管理</Button></Link>
            </div>
        </ToolBar>;
        const { getFieldProps } = this.props.form;
        return <div className="hyhf-fzyhyhf">
            <div className="wrap">
             <Spin spinning={this.state.sloading}>   <Panel title="非执业会员会费缴纳情况" toolbar={toolbar}>
                    {this.state.searchToggle && <SearchForm
                        onSubmit={this.handleSearchSubmit}/>}
                    <div className="h-scroll-table">
                        <Table columns={columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleChange}
                               onRowClick={this.handleRowClick}/>
                        <Modal ref="modal" confirmLoading={this.state.mloading} 
                          visible={this.state.modelvisible} maskClosable={false} closable={false} 
                          title="非执业会员会费缴费" onOk={this.modelOk} onCancel={this.modelCancel} >
                          <Row><Col span="4"><b>所属年份：</b></Col>
                             <Col span="12"> <SelectorYear style={{'width':'150px'}}  { ...getFieldProps('nd', { })} /></Col>
                         </Row>
                         <Row><Col span="4"><b>身份证号：</b></Col>
                             <Col span="12"> <Input  { ...getFieldProps('sfzh', { })} /></Col>
                         </Row>
                         <Row><Col span="4"><b>金额：</b></Col>
                              <Col span="12"><InputNumber  { ...getFieldProps('je', { })} min={0} step={0.01} /></Col>
                         </Row>
                         <Row><Col span="4"><b>缴费日期：</b></Col>
                              <Col span="12"><DatePicker  { ...getFieldProps('jfrq', { })} /></Col>
                         </Row>
                         <Row><Col span="4"><b>备注：</b></Col>
                              <Col span="12"><Input  type="textarea" row='3' { ...getFieldProps('bz', { })} /></Col>
                         </Row>
                        </Modal>
                    </div>
                </Panel></Spin>
                
            </div>
        </div>
    }
});
lrb = createForm()(lrb);
module.exports = lrb;
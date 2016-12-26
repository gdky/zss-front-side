import React from 'react'
import CompBaseTable from 'component/compBaseTable';
import config from 'common/configuration'
import Panel from 'component/compPanel'
import ComTable from 'component/compTable'
import req from 'reqwest'
import Model from './model.js'
import SearchForm from './searchForm'
import YwlxTable from './ywlxTable'
import {Icon, Button, Row, Col, message, Table, notification }from 'antd'
import auth from 'common/auth'

const API_URL = config.HOST + config.URI_API_PROJECT + '/ywgl/ywbbsjfx';
const PanelBar = Panel.ToolBar;

const component = React.createClass({
  getInitialState() { //初始化State状态，使用传入参数
    const year = new Date().getFullYear() - 1;
    return {
      searchToggle: true,
      panelQs: true,//全省统计数据
      panelDq: false,//某个市所有事务所数据
      panelSws: false,//某个事务所的按业务类型进行的数据统计
      panelYwlx: false,//某个事务所的某个业务类型的数据
      dataQs: [],
      entityQs: {},
      dataDq: [],
      entityDq: {},
      dataSws: {},
      entitySws: {},
      dataYwlx: [],
      data: [],
      where: { ND: year },
    };
  },

  //全省统计数据
  fetch_data(params = { where: encodeURIComponent(JSON.stringify(this.state.where)) }) {
    this.setState({ loading: true, });
    const token = auth.getToken();
    req({
      url: API_URL,
      type: 'json',
      method: 'get',
      data: params,
      headers: { 'x-auth-token': token }
    }).then(resp => {
      this.setState({
        searchToggle: false,
        tableQs: true,
        loading: false,//关闭加载状态
        dataQs: resp.data
      });
    }).fail(e => {
      this.setState({ loading: false });
      notification.error({
        duration: 2,
        message: '数据读取失败',
        description: '可能网络访问原因，请稍后尝试'
      });
    })
  },

  //某个市所有事务所数据
  fetch_dataDq(params = { where: encodeURIComponent(JSON.stringify(this.state.where)), }) {
    const token = auth.getToken();
    this.setState({ loading: true, });
    req({
      url: API_URL + "/dq",
      type: 'json',
      method: 'get',
      data: params,
      headers: { 'x-auth-token': token }
    }).then(resp => {
      this.setState({
        loading: false,//关闭加载状态
        dataDq: resp.data
      });
    }).fail(e => {
      this.setState({ loading: false });
      notification.error({
        duration: 2,
        message: '数据读取失败',
        description: '可能网络访问原因，请稍后尝试'
      });
    })
  },

  //某个事务所的按业务类型进行的数据统计
  fetch_dataSws(params = { where: encodeURIComponent(JSON.stringify(this.state.where)), }) {
    const token = auth.getToken();
    this.setState({ loading: true, });
    req({
      url: API_URL + "/sws",
      type: 'json',
      method: 'get',
      data: params,
      headers: { 'x-auth-token': token }
    }).then(resp => {
      this.setState({
        loading: false,//关闭加载状态
        dataSws: resp
      });
    }).fail(e => {
      this.setState({ loading: false });
      notification.error({
        duration: 2,
        message: '数据读取失败',
        description: '可能网络访问原因，请稍后尝试'
      });
    })
  },

  //某个事务所的某个业务类型的数据
  fetch_dataYwlx(params = { where: encodeURIComponent(JSON.stringify(this.state.where)), }) {
    const token = auth.getToken();
    this.setState({ loading: true, });//主查询加载状态
    req({
      url: API_URL + "/ywlx",
      type: 'json',
      method: 'get',
      data: params,
      headers: { 'x-auth-token': token }
    }).then(resp => {
      this.setState({
        loading: false,//关闭加载状态
        dataYwlx: resp.data
      });
    }).fail(e => {
      this.setState({ loading: false });
      notification.error({
        duration: 2,
        message: '数据读取失败',
        description: '可能网络访问原因，请稍后尝试'
      });
    })
  },


  //打开关闭查询框
  handleSearchToggle() {
    this.setState({
      searchToggle: !this.state.searchToggle,
      tableQs: false
    })
  },

  //搜索提交
  handleSearchSubmit(value) {
    this.setState({ where: value });
    this.fetch_data({
      where: encodeURIComponent(JSON.stringify(value)),
    })
  },

  //渲染全省统计数据中地区列
  renderDq(text, record, index) {
    var that = this;
    function showDqDetail() {
      var value = that.state.where;
      value.cxdq = record.cs_dm;
      that.setState({ where: value, panelQs: false, panelDq: true });
      that.fetch_dataDq({
        where: encodeURIComponent(JSON.stringify(that.state.where)),
      });
    }
    return <a onClick={showDqDetail}>{text}</a>
  },

  //渲染某个市所有事务所数据中事务所列
  renderSws(text, record, index) {
    var that = this;
    function showSwsDetail() {
      var value = that.state.where;
      value.cxsws = record.jg_id;
      that.setState({ where: value, panelDq: false, panelSws: true });
      that.fetch_dataSws({
        where: encodeURIComponent(JSON.stringify(that.state.where)),
      });
    }
    return <a onClick={showSwsDetail}>{text}</a>
  },

  //渲染某个事务所的按业务类型进行的数据统计中业务类型列
  renderYwlx(text, record, index) {
    var that = this;
    function showYwlxDetail() {
      var value = that.state.where;
      value.cxywlx = record.ywlx_dm;
      that.setState({ where: value, panelSws: false, panelYwlx: true });
      that.fetch_dataYwlx({
        where: encodeURIComponent(JSON.stringify(that.state.where)),
      });
    }
    return <a onClick={showYwlxDetail}>{text}</a>
  },

  //返回按钮点击事件
  //返回全省统计数据
  backToQs() {
    this.setState({ panelQs: true, panelDq: false });
  },
  //返回某个市所有事务所数据
  backToDq() {
    this.setState({ panelDq: true, panelSws: false });
  },
  //返回某个事务所的按业务类型进行的数据统计
  backToSws() {
    this.setState({ panelSws: true, panelYwlx: false });
  },

  //根据value值获取业务类型名称
  getYwlxMc(value) {
    const ywlxs = Model.ywlx;
    for (var i = 0; i < ywlxs.length; i++) {
      if (value == ywlxs[i].id) {
        return ywlxs[i].mc;
      }
    }
  },

  render() {
    const columnsQs = [
      { title: '序号', dataIndex: 'xh', key: 'xh' },
      { title: '地区', dataIndex: 'dq', key: 'dq', render: this.renderDq },
      { title: '事务所户数', dataIndex: 'swshs', key: 'swshs' },
      { title: '委托单位户数', dataIndex: 'wtdwhs', key: 'wtdwhs' },
      { title: '协议收费总金额', dataIndex: 'xysfzje', key: 'xysfzje' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje', key: 'sjsfzje' },
      { title: '事务所户数', dataIndex: 'swshs_jskf', key: 'swshs_jskf' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_jskf', key: 'wtdwhs_jskf' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_jskf', key: 'xysfzje_jskf' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_jskf', key: 'sjsfzje_jskf' },
      { title: '事务所户数', dataIndex: 'swshs_sqkc', key: 'swshs_sqkc' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_sqkc', key: 'wtdwhs_sqkc' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_sqkc', key: 'xysfzje_sqkc' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_sqkc', key: 'sjsfzje_sqkc' },
      { title: '所得税税前扣除项目鉴证金额', dataIndex: 'sqkcxmje_sqkc', key: 'sqkcxmje_sqkc' },
      { title: '事务所户数', dataIndex: 'swshs_sdshsqj', key: 'swshs_sdshsqj' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_sdshsqj', key: 'wtdwhs_sdshsqj' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_sdshsqj', key: 'xysfzje_sdshsqj' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_sdshsqj', key: 'sjsfzje_sdshsqj' },
      { title: '纳税调整增加额', dataIndex: 'nstzzje_sdshsqj', key: 'nstzzje_sdshsqj' },
      { title: '纳税调整减少额', dataIndex: 'nstzjse_sdshsqj', key: 'nstzjse_sdshsqj' },
      { title: '事务所户数', dataIndex: 'swshs_td', key: 'swshs_td' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_td', key: 'wtdwhs_td' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_td', key: 'xysfzje_td' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_td', key: 'sjsfzje_td' },
      { title: '应补税额', dataIndex: 'ybse_td', key: 'ybse_td' },
      { title: '应退税额', dataIndex: 'ytse_td', key: 'ytse_td' },
      { title: '事务所户数', dataIndex: 'swshs_fdc', key: 'swshs_fdc' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_fdc', key: 'wtdwhs_fdc' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_fdc', key: 'xysfzje_fdc' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_fdc', key: 'sjsfzje_fdc' },
      { title: '应补税额', dataIndex: 'ybse_fdc', key: 'ybse_fdc' },
      { title: '应退税额', dataIndex: 'ytse_fdc', key: 'ytse_fdc' },
      { title: '事务所户数', dataIndex: 'swshs_qt', key: 'swshs_qt' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_qt', key: 'wtdwhs_qt' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_qt', key: 'xysfzje_qt' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_qt', key: 'sjsfzje_qt' },
      { title: '其他鉴证应补税额', dataIndex: 'ybse_qt', key: 'ybse_qt' },
      { title: '其他鉴证应退税额', dataIndex: 'ytse_qt', key: 'ytse_qt' },
      { title: '事务所户数', dataIndex: 'swshs_gxjs', key: 'swshs_gxjs' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_gxjs', key: 'wtdwhs_gxjs' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_gxjs', key: 'xysfzje_gxjs' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_gxjs', key: 'sjsfzje_gxjs' },
      { title: '事务所户数', dataIndex: 'swshs_zx', key: 'swshs_zx' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_zx', key: 'wtdwhs_zx' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_zx', key: 'xysfzje_zx' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_zx', key: 'sjsfzje_zx' },
      { title: '注销税务应补税额', dataIndex: 'ybse_zx', key: 'ybse_zx' },
      { title: '注销税务应退税额', dataIndex: 'ytse_zx', key: 'ytse_zx' },
      { title: '事务所户数', dataIndex: 'swshs_bg', key: 'swshs_bg' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_bg', key: 'wtdwhs_bg' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_bg', key: 'xysfzje_bg' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_bg', key: 'sjsfzje_bg' },
      { title: '变更税务应补税额', dataIndex: 'ybse_bg', key: 'ybse_bg' },
      { title: '变更税务应退税额', dataIndex: 'ytse_bg', key: 'ytse_bg' },
      { title: '事务所户数', dataIndex: 'swshs_grhsqj', key: 'swshs_grhsqj' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_grhsqj', key: 'wtdwhs_grhsqj' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_grhsqj', key: 'xysfzje_grhsqj' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_grhsqj', key: 'sjsfzje_grhsqj' },
      { title: '纳税调整增加额', dataIndex: 'nstzzje_grhsqj', key: 'nstzzje_grhsqj' },
      { title: '纳税调整减少额', dataIndex: 'nstzzje_grhsqj', key: 'nstzjse_grhsqj' }
    ];
    const columnsDq = [
      { title: '序号', dataIndex: 'xh', key: 'xh' },
      { title: '事务所名称', dataIndex: 'dwmc', key: 'dwmc', render: this.renderSws },
      { title: '委托单位户数', dataIndex: 'wtdwhs', key: 'wtdwhs' },
      { title: '协议收费总金额', dataIndex: 'xysfzje', key: 'xysfzje' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje', key: 'sjsfzje' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_jskf', key: 'wtdwhs_jskf' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_jskf', key: 'xysfzje_jskf' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_jskf', key: 'sjsfzje_jskf' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_sqkc', key: 'wtdwhs_sqkc' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_sqkc', key: 'xysfzje_sqkc' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_sqkc', key: 'sjsfzje_sqkc' },
      { title: '所得税税前扣除项目鉴证金额', dataIndex: 'sqkcxmje_sqkc', key: 'sqkcxmje_sqkc' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_sdshsqj', key: 'wtdwhs_sdshsqj' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_sdshsqj', key: 'xysfzje_sdshsqj' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_sdshsqj', key: 'sjsfzje_sdshsqj' },
      { title: '纳税调整增加额', dataIndex: 'nstzzje_sdshsqj', key: 'nstzzje_sdshsqj' },
      { title: '纳税调整减少额', dataIndex: 'nstzjse_sdshsqj', key: 'nstzjse_sdshsqj' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_td', key: 'wtdwhs_td' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_td', key: 'xysfzje_td' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_td', key: 'sjsfzje_td' },
      { title: '应补税额', dataIndex: 'ybse_td', key: 'ybse_td' },
      { title: '应退税额', dataIndex: 'ytse_td', key: 'ytse_td' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_fdc', key: 'wtdwhs_fdc' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_fdc', key: 'xysfzje_fdc' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_fdc', key: 'sjsfzje_fdc' },
      { title: '应补税额', dataIndex: 'ybse_fdc', key: 'ybse_fdc' },
      { title: '应退税额', dataIndex: 'ytse_fdc', key: 'ytse_fdc' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_qt', key: 'wtdwhs_qt' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_qt', key: 'xysfzje_qt' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_qt', key: 'sjsfzje_qt' },
      { title: '其他鉴证应补税额', dataIndex: 'ybse_qt', key: 'ybse_qt' },
      { title: '其他鉴证应退税额', dataIndex: 'ytse_qt', key: 'ytse_qt' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_gxjs', key: 'wtdwhs_gxjs' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_gxjs', key: 'xysfzje_gxjs' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_gxjs', key: 'sjsfzje_gxjs' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_zx', key: 'wtdwhs_zx' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_zx', key: 'xysfzje_zx' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_zx', key: 'sjsfzje_zx' },
      { title: '注销税务应补税额', dataIndex: 'ybse_zx', key: 'ybse_zx' },
      { title: '注销税务应退税额', dataIndex: 'ytse_zx', key: 'ytse_zx' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_bg', key: 'wtdwhs_bg' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_bg', key: 'xysfzje_bg' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_bg', key: 'sjsfzje_bg' },
      { title: '变更税务应补税额', dataIndex: 'ybse_bg', key: 'ybse_bg' },
      { title: '变更税务应退税额', dataIndex: 'ytse_bg', key: 'ytse_bg' },
      { title: '委托单位户数', dataIndex: 'wtdwhs_grhsqj', key: 'wtdwhs_grhsqj' },
      { title: '协议收费总金额', dataIndex: 'xysfzje_grhsqj', key: 'xysfzje_grhsqj' },
      { title: '实际收费总金额', dataIndex: 'sjsfzje_grhsqj', key: 'sjsfzje_grhsqj' },
      { title: '纳税调整增加额', dataIndex: 'nstzzje_grhsqj', key: 'nstzzje_grhsqj' },
      { title: '纳税调整减少额', dataIndex: 'nstzzje_grhsqj', key: 'nstzjse_grhsqj' }
    ];
    const columnsSws = [
      { title: '业务类型', dataIndex: 'ywlx', key: 'ywlx', colSpan: 2, render: this.renderYwlx },
    ];
    const columnsYw = [
      { title: '序号', dataIndex: 'xh', key: 'xh' },
      { title: '事务所名称', dataIndex: 'dwmc', key: 'dwmc' },
      { title: '企业名称', dataIndex: 'qymc', key: 'qymc' },
      { title: '税务登记证号', dataIndex: 'swsswdjzh', key: 'swsswdjzh' },
      { title: '业务发生地', dataIndex: 'ywfsd', key: 'ywfsd' },
      { title: '报告文号', dataIndex: 'bgwh', key: 'bgwh' },
      { title: '报备号码', dataIndex: 'bbhm', key: 'bbhm' },
      { title: '一级复核', dataIndex: 'yjfh', key: 'yjfh' },
      { title: '二级复核', dataIndex: 'rjfh', key: 'rjfh' },
      { title: '三级复核', dataIndex: 'sjfh', key: 'sjfh' },
      { title: '签名注册税务师', dataIndex: 'qzsws', key: 'qzsws' },
      { title: '协议收费金额', dataIndex: 'xyje', key: 'xyje' },
      { title: '实际收费金额', dataIndex: 'sjsqje', key: 'sjsqje' },
      { title: '应补税额', dataIndex: 'ybse', key: 'ybse' },
      { title: '应退税额', dataIndex: 'ytse', key: 'ytse' },
      { title: '报备时间', dataIndex: 'bbrq', key: 'bbrq' }
    ];
    const panelQsBar = <PanelBar>
      <Button onClick={this.handleSearchToggle}>
        <Icon type="search"/>查询
        { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
          <Icon className="toggle-tip" type="circle-o-down"/>}
      </Button>
    </PanelBar>;

    //返回按钮
    const panelDqBar = <PanelBar>
      <Button onClick={this.backToQs}>
        <Icon type="rollback"/>返回
      </Button>
    </PanelBar>;
    const panelSwsBar = <PanelBar>
      <Button onClick={this.backToDq}>
        <Icon type="rollback"/>返回
      </Button>
    </PanelBar>;
    const panelYwlxBar = <PanelBar>
      <Button onClick={this.backToSws}>
        <Icon type="rollback"/>返回
      </Button>
    </PanelBar>;

    const titleYwlx = <div style={{ width: '600px' }}>
      <span style={{ marginLeft: '10px' }}>{this.state.where.cxywlx == null ? '' : '业务类型：' + this.getYwlxMc(this.state.where.cxywlx) }</span>
    </div>;

    return <div className="ywbbsjfx">
      <div className="wrap">
        <div className="dataGird">
          {this.state.panelQs &&
            <Panel title="业务报备数据分析"   toolbar={panelQsBar}>
              {this.state.searchToggle && <SearchForm onSubmit={this.handleSearchSubmit} loading={this.state.loading}/>}
              {this.state.tableQs && <ComTable columns={columnsQs}
                header={Model.headerQs}
                dataSource={this.state.dataQs}
                loading={this.state.loading}
                scroll={{ x: 8192, y: 420 }}
                rowKey={record => record.cs_dm}
                bordered   />}
            </Panel>}
          {this.state.panelDq &&
            <Panel title="业务报备数据分析" toolbar={panelDqBar}>
              <ComTable columns={columnsDq}
                header={Model.headerDq}
                dataSource={this.state.dataDq}
                loading={this.state.loading}
                scroll={{ x: 8192, y: 420 }}
                bordered   />
            </Panel>}
          {this.state.panelSws &&
            <Panel title="业务报备数据分析" toolbar={panelSwsBar}>
              <YwlxTable columns={columnsSws}
                header={Model.headerSws}
                dataSource={this.state.dataSws}
                loading={this.state.loading}  bordered   />
            </Panel>}
          {this.state.panelYwlx &&
            <Panel title={titleYwlx} toolbar={panelYwlxBar}>
              <Table columns={columnsYw}
                dataSource={this.state.dataYwlx}
                loading={this.state.loading}
                pagination={false}
                bordered   />
            </Panel>}
        </div>
      </div>
    </div>
  }
});

module.exports = component;

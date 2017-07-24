import React from 'react'
import {Col, Input, Row, Button, Icon, Form, Modal, Select, Alert, Spin, InputNumber} from 'antd'
import {SelectorYear, SelectorXZ} from 'component/compSelector'
import './style.css'
import req from 'reqwest'
import config from 'common/configuration'
import auth from 'common/auth'
import Panel from 'component/compPanel'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const ToolBar = Panel.ToolBar;
const CheckNd_URL = config.HOST + config.URI_API_PROJECT + "/checkzcfz";


let Updatezcfzb = React.createClass({
    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },

    getInitialState() {
        return {
            visible: false,
            checkNd: true,
            checkTimevalue: true,
            loading: false,
            helper: true,
            entity: this.props.data
        };
    },

    handleSubmit(ztbj) {
        const obj = this.props.data;
        let value = this.props.form.getFieldsValue();
        for (let key in value) {
            if (typeof (value[key]) == 'undefined' || (isNaN(value[key]) ? ("" == value[key]) : false)) {
                value[key] = null;
            }
        }
        value.ztbj = ztbj;
        value.id = obj.id.value;
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.props.onSubmit(value);
            }
        });
    },

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    //帮助按钮
    handleHelper() {
        this.setState({helper: !this.state.helper})
    },

    showModal(e) {
        e.preventDefault();
        let that = this;
        Modal.confirm({
            title: '是否确定提交？',
            content: '提交后就不能修改了！',
            onOk() {
                that.handleSubmit(1);
            },
        });
    },


    //年检年度是否重复校验方法
    checkNdIfExit(rule, value, callback) {
        var id = this.state.entity.id;
        const timevalue = this.props.form.getFieldValue("timevalue");
        const params = {where: encodeURIComponent(JSON.stringify({nd: value, timevalue: timevalue, sbid: id})),}
        req({
            url: CheckNd_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: {'x-auth-token': auth.getToken()},
            contentType: 'application/json',
        }).then(resp => {
            if (resp) {
                callback('同一年度不能做两次上报，请选择其他年度');
            } else {
                callback();
            }
        }).fail(err => {
            this.setState({loading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>)
            });
        })
    },
    //timevalue是否重复校验方法
    checkTimeValueIfExit(rule, value, callback) {
        var id = this.state.entity.id;
        const nd = this.props.form.getFieldValue("nd") + "";
        const params = {where: encodeURIComponent(JSON.stringify({nd: nd, timevalue: value, sbid: id})),}
        req({
            url: CheckNd_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: {'x-auth-token': auth.getToken()},
            contentType: 'application/json',
        }).then(resp => {
            if (resp) {
                callback('该年度的上半年（或全年）已经填报上报表，请选择其他年度');
            } else {
                callback();
            }
        }).fail(err => {
            this.setState({loading: false});
            Modal.error({
                title: '数据获取错误',
                content: (
                    <div>
                        <p>无法从服务器返回数据，需检查应用服务工作情况</p>
                        <p>Status: {err.status}</p>
                    </div>)
            });
        })
    },


    render() {

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">详细说明：</p>);
        helper.push(<p key="helper-1">
            《资产负债表》反映事务所全部资产、负债和所有者权益的情况。增设的三个一级会计科目：“低值易耗品”（1231）、“物料用品”（1242）、“库存商品”（1243）之和填入本表“存货栏”。</p>);
        helper.push(<p key="helper-2">各栏关系：</p>);
        helper.push(<p key="helper-3">
            【14行+17行+26行+30行+31行=32行】【1行+...+13行=14行】【15行+16行=17行】【18行-19行=20行】【20行-21行=22行】【22行+23行+24行+25行=26行】【27行+28行+29行=30行】【47行+54行+55行=56行】
            【56行+63行=64行】【33行+...+46行=47行】【57行-58行=59行】【48行+...+53行=54行】【59行+...+62行=63行】【64行=32行】</p>);


        //定义工具栏内容
        let toolbar = <ToolBar>
            <ButtonGroup>
                <Button onClick={this.props.toback}>返回<Icon className="toggle-tip" type="arrow-left"/></Button>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
            </ButtonGroup>
        </ToolBar>;

        const {getFieldProps} = this.props.form;

        return <div className="add">
            {this.state.helper && <Alert message="资产负债表检索查询帮助"
                                         description={helper}
                                         type="info"
                                         closable
                                         onClose={this.handleHelperClose}/>}
            <Panel title="资产负债表修改" toolbar={toolbar}>
                <div className="fix-table table-bordered table-striped">
                    <Spin spinning={this.props.loading} tip="数据加载中。。。">
                        <Spin spinning={this.state.loading} tip="数据校验中。。。">
                            <Form horizontal onSubmit={this.handleSubmit}>
                                <table>
                                    <colgroup>
                                        <col className="col-4"/>
                                        <col className="col-2"/>
                                        <col className="col-3"/>
                                        <col className="col-3"/>
                                        <col className="col-4"/>
                                        <col className="col-2"/>
                                        <col className="col-3"/>
                                        <col className="col-3"/>
                                    </colgroup>
                                    <tbody>
                                    <tr>
                                        <td colSpan="2" style={{textAlign: 'center'}}>单位：</td>

                                        <td colSpan="3">{getFieldProps('dwmc').value}</td>


                                        <td width="11%"><Col
                                            label="年度：">
                                            <FormItem> <SelectorYear  { ...getFieldProps('nd', {
                                                rules: [{
                                                    require: true,
                                                    message: '选择一个年度',
                                                },]
                                            }) } />
                                            </FormItem>
                                        </Col>
                                        </td>

                                        <td ><Col>
                                            <SelectorXZ { ...getFieldProps('timevalue', {
                                                rules: [{
                                                    require: true,
                                                    message: '选择一个时间段',
                                                },]
                                            }) } />
                                        </Col>
                                        </td>

                                        <td>单位：元</td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign: 'center'}}>资产</td>
                                        <td>行次</td>
                                        <td > 年初数</td>
                                        <td > 年末数</td>
                                        <td style={{textAlign: 'center'}}>负债及所有者权益（或股东权益）</td>
                                        <td  >行次</td>
                                        <td > 年初数</td>
                                        <td > 年末数</td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>流动资产：</td>
                                        <td/>
                                        <td />
                                        <td />
                                        <td style={{textAlign: 'center'}}>流动负债：</td>
                                        <td/>
                                        <td />
                                        <td />
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>货币资金</td>
                                        <td>1</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_hbzj_nc') } />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_hbzj')} /></td>
                                        <td style={{textAlign: 'center'}}>短期借款</td>
                                        <td>33</td>
                                        <td ><InputNumber max={9999999999999}  {...getFieldProps('ldfz_dqjk_nc')} /></td>
                                        <td ><InputNumber max={9999999999999}  {...getFieldProps('ldfz_dqjk') } /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>短期投资</td>
                                        <td>2</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_dqtz_nc')}/></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_dqtz')} /></td>
                                        <td style={{textAlign: 'center'}}>应付票据</td>
                                        <td>34</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yfpj_nc')} /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yfpj') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>应收票据</td>
                                        <td>3</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_yspj_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_yspj') }  /></td>
                                        <td style={{textAlign: 'center'}}>应付账款</td>
                                        <td>35</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yfzk_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yfzk') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>应收股利</td>
                                        <td>4</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_ysgl_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_ysgl') }  /></td>
                                        <td style={{textAlign: 'center'}}>预收账款</td>
                                        <td>36</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yszk_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yszk') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>应收利息</td>
                                        <td>5</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_yslx_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_yslx') }  /></td>
                                        <td style={{textAlign: 'center'}}>应付工资</td>
                                        <td>37</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yfgz_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yfgz') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>应收账款</td>
                                        <td>6</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_yszk_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_yszk') }  /></td>
                                        <td style={{textAlign: 'center'}}>应付福利费</td>
                                        <td>38</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yffl_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yffl') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>其他应收款</td>
                                        <td>7</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_qtys_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_qtys') }  /></td>
                                        <td style={{textAlign: 'center'}}>应付股利</td>
                                        <td>39</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yfgl_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yfgl') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>预付账款</td>
                                        <td>8</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_yfzk_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_yfzk') }  /></td>
                                        <td style={{textAlign: 'center'}}>应交税金</td>
                                        <td>40</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yjsj_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yjsj') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>应收补贴款</td>
                                        <td>9</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_ysbt_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_ysbt') }  /></td>
                                        <td style={{textAlign: 'center'}}>其他应交款</td>
                                        <td>41</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_qtyj_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_qtyj') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>存货</td>
                                        <td>10</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_ch_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_ch') }  /></td>
                                        <td style={{textAlign: 'center'}}>其他应付款</td>
                                        <td>42</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_qtyf_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_qtyf') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>待摊费用</td>
                                        <td>11</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_dtfy_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_dtfy') }  /></td>
                                        <td style={{textAlign: 'center'}}>预提费用</td>
                                        <td>43</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_ytfy_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_ytfy') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>一年内到期的长期债券投资</td>
                                        <td>12</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_dqzj_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_dqzj') }  /></td>
                                        <td style={{textAlign: 'center'}}>预计负债</td>
                                        <td>44</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yjfz_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_yjfz') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>其他流动资产</td>
                                        <td>13</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_qtldzc_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_qtldzc') }  /></td>
                                        <td style={{textAlign: 'center'}}>一年内到期的长期负债</td>
                                        <td>45</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_dqfz_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_dqfz') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>流动资产合计</td>
                                        <td>14</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_hj_nc') } disabled/>
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldzc_hj') } disabled/></td>
                                        <td style={{textAlign: 'center'}}>其他流动负债</td>
                                        <td>46</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_qtfz_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_qtfz') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>长期投资:</td>
                                        <td colSpan="7"/>

                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>长期股权投资</td>
                                        <td>15</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqtz_gq_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqtz_gq') }  /></td>
                                        <td style={{textAlign: 'center'}}>流动负债合计</td>
                                        <td>47</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_hj_nc') } disabled/>
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ldfz_hj') } disabled/></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>长期债权投资</td>
                                        <td>16</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqtz_zq_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqtz_zq') }  /></td>
                                        <td style={{textAlign: 'center'}}>长期负债:</td>
                                        <td colSpan="3"/>

                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>长期投资合计</td>
                                        <td>17</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqtz_hj_nc') } disabled/>
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqtz_hj') } disabled/></td>
                                        <td style={{textAlign: 'center'}}>长期借款</td>
                                        <td>48</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_cqjk_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_cqjk') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>固定资产:</td>
                                        <td colSpan="3"/>

                                        <td style={{textAlign: 'center'}}>应付债券</td>
                                        <td>49</td>
                                        <td ><InputNumber max={9999999999999}  {...getFieldProps('cqfz_yfzq_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_yfzq') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>固定资产原价</td>
                                        <td>18</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_yj_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_yj') }  /></td>
                                        <td style={{textAlign: 'center'}}>长期应付款</td>
                                        <td>50</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_cqyf_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_cqyf') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>减：累计折旧</td>
                                        <td>19</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_ljzj_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_ljzj') }  /></td>
                                        <td style={{textAlign: 'center'}}>专项应付款</td>
                                        <td>51</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_zxyf_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_zxyf') }  /></td>
                                    </tr>

                                    <tr>

                                        <td colSpan="4"/>

                                        <td style={{textAlign: 'center'}}>职业风险基金</td>
                                        <td>52</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_zyfxjj_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_zyfxjj') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>固定资产净值</td>
                                        <td>20</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_jz_nc') } disabled/>
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_jz') } disabled/></td>
                                        <td style={{textAlign: 'center'}}>其他长期负债</td>
                                        <td>53</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_qtfz_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_qtfz') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>减：固定资产减值准备</td>
                                        <td>21</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_jzzb_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_jzzb') }  /></td>
                                        <td style={{textAlign: 'center'}}>长期负债合计</td>
                                        <td>54</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_hj_nc') } disabled/>
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('cqfz_hj') } disabled/></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>固定资产净额</td>
                                        <td>22</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_je_nc') } disabled/>
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_je') } disabled/></td>
                                        <td style={{textAlign: 'center'}}>递延税项：</td>
                                        <td colSpan="3"/>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>工程物资</td>
                                        <td>23</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_gcwz_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_gcwz') }  /></td>
                                        <td style={{textAlign: 'center'}}>递延税款贷项</td>
                                        <td>55</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('dysx_dyskdx_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('dysx_dyskdx') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>在建工程</td>
                                        <td>24</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_zjgc_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_zjgc') }  /></td>
                                        <td style={{textAlign: 'center'}}>负债合计</td>
                                        <td>56</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('dysx_fzhj_nc') }
                                                          disabled/></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('dysx_fzhj') } disabled/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>固定资产清理</td>
                                        <td>25</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_ql_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_ql') }  /></td>

                                        <td colSpan="4"/>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>固定资产合计</td>
                                        <td>26</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_hj_nc') } disabled/>
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('gdzc_hj') } disabled/></td>
                                        <td style={{textAlign: 'center'}}>所有者权益（或股东权益）：</td>
                                        <td colSpan="3"/>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>无形资产及其他资产：</td>
                                        <td colSpan="3"/>

                                        <td style={{textAlign: 'center'}}>实收资本（或股本）</td>
                                        <td>57</td>
                                        <td ><InputNumber max={9999999999999}  {...getFieldProps('syzqy_sszb_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_sszb') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>无形资产</td>
                                        <td>27</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('wxqt_wxzc_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('wxqt_wxzc') }  /></td>
                                        <td style={{textAlign: 'center'}}>减：已归还投资</td>
                                        <td>58</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_yhtz_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_yhtz') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>长期待摊费用</td>
                                        <td>28</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('wxqt_cqdt_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('wxqt_cqdt') }  /></td>
                                        <td style={{textAlign: 'center'}}>实收资本（股本）净额</td>
                                        <td>59</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_sszbje_nc') }
                                                          disabled/></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_sszbje') }
                                                          disabled/></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>其他长期资产</td>
                                        <td>29</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('wxqt_qtcq_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('wxqt_qtcq') }  /></td>
                                        <td style={{textAlign: 'center'}}>资本公积</td>
                                        <td>60</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_zbgj_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_zbgj') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>无形资产和其他资产合计</td>
                                        <td>30</td>
                                        <td ><InputNumber max={9999999999999}  {...getFieldProps('wxqt_hj_nc') } disabled/>
                                        </td>
                                        <td ><InputNumber max={9999999999999}  {...getFieldProps('wxqt_hj') } disabled/></td>
                                        <td style={{textAlign: 'center'}}>盈余公积</td>
                                        <td>61</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_yygj_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_yygj') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>递延税项：</td>
                                        <td colSpan="3"/>

                                        <td style={{textAlign: 'center'}}>未分配利润</td>
                                        <td>62</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_wfplr_nc') }  />
                                        </td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_wfplr') }  /></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>递延税款借项</td>
                                        <td>31</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ydsx_skjx_nc') }  /></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('ydsx_skjx') }  /></td>
                                        <td style={{textAlign: 'center'}}>所有者权益(或股东权益)合计</td>
                                        <td>63</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_hj_nc') }
                                                          disabled/></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('syzqy_hj') } disabled/></td>
                                    </tr>

                                    <tr>
                                        <td style={{textAlign: 'center'}}>资产总计</td>
                                        <td>32</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('zczj_nc') } disabled/></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('zczj') } disabled/></td>
                                        <td style={{textAlign: 'center'}}>负债和所有者权益(或股东权益)合计</td>
                                        <td>64</td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('fzsyzqy_hj_nc') } disabled/></td>
                                        <td ><InputNumber max={9999999999999} {...getFieldProps('fzsyzqy_hj') } disabled/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td/>
                                        <td style={{textAlign: 'center'}}>所长：</td>
                                        <td ><Input   {...getFieldProps('sz') } /></td>
                                        <td style={{textAlign: 'center'}}>主管会计：</td>
                                        <td ><Input   {...getFieldProps('zgkj') } /></td>
                                        <td style={{textAlign: 'center'}}>制表人：</td>
                                        <td ><Input   {...getFieldProps('zbr') } /></td>
                                        <td/>
                                    </tr>

                                    </tbody>

                                    <tbody>
                                    <tr >
                                        <td colSpan="2">
                                            <Button type="primary" onClick={this.handleSubmit.bind(this, 0)}
                                                    loading={this.props.btnloading}> <Icon type="check"/>保存</Button>
                                        </td>
                                        <td>
                                            <Button type="primary" onClick={this.showModal}
                                                    loading={this.props.btnloading}> <Icon type="arrow-up"/>提交</Button>
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                            </Form>
                        </Spin>
                    </Spin>
                </div>
            </Panel>
        </div>
    }
});


Updatezcfzb = Form.create({
    mapPropsToFields(props) {
        return props.data
    },
    onFieldsChange(props, field){
        props.changed(field, 'update')
    }
})(Updatezcfzb);

module.exports = Updatezcfzb;
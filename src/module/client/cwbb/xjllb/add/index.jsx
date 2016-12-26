import React from 'react'
import auth from 'common/auth'
import config from 'common/configuration'
import req from 'reqwest'
import { InputNumber, Button, Icon, Form, Modal, notification, Spin } from 'antd'
import { SelectorYear } from 'component/compSelector'
import './style.css'

const createForm = Form.create;
const FormItem = Form.Item;
const token = auth.getToken();
const GET_URL = config.HOST + config.URI_API_PROJECT + "/cwbb/getJgxx";
const CHECK_URL = config.HOST + config.URI_API_PROJECT + "/checkXjllb";

Date.prototype.Format = function (fmt) { //时间格式化函数
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));//补0处理
    return fmt;
}

let Addxjllb = React.createClass({
    getInitialState() {
        return { jgxx: {}, loading: false, tip: "数据加载中。。。", checkNdResult: true, checkmessage: "" };
    },
    getDefaultProps() {
        return {
            onSubmit: {},
        }
    },

    componentDidMount() {
        this.fetch_jgxx();
    },

    //获取表中单位信息
    fetch_jgxx(params) {
        this.setState({ loading: true });
        req({
            url: GET_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            this.setState({ jgxx: resp.data, loading: false });
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    handleSubmit(ztbj) {
        var mp = {};
        let value = this.props.form.getFieldsValue()
        for (var key in value) {
            if (typeof (value[key]) == 'undefined' || (isNaN(value[key]) ? ("" == value[key]) : false)) {
                value[key] = null;
            }
            if (Object.prototype.toString.call(value[key]) == "[object Date]") {//时间格式化
                var dd = value[key].Format("yyyy-MM-dd");
                value[key] = dd;
            }
        }
        value.ztbj = ztbj;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                this.props.onSubmit(value);
            }
        });
    },

    handleReset(e) {
        e.preventDefault();
        this.setState({ checkNdResult: true, checkmessage: "" });
        this.props.resetFields("add");
    },

    showModal(e) {
        e.preventDefault();
        var that = this;
        Modal.confirm({
            title: '是否确定提交？',
            content: '提交后就不能修改了！！！',
            onOk() {
                that.handleSubmit(1);
            },
        });
    },

    checkNd(rule, value, callback) {
        if (!value) {
            this.setState({ checkNdResult: false, checkmessage: "请选择年度" });
        } else {
            const where = { nd: value };
            const params = { where: encodeURIComponent(JSON.stringify(where)) };
            this.setState({ loading: true, tip: "数据校验中。。。" });
            req({
                url: CHECK_URL,
                type: 'json',
                method: 'get',
                data: params,
                headers: { 'x-auth-token': token }
            }).then(resp => {
                this.setState({ loading: false });
                if (resp) {
                    this.setState({ checkNdResult: true, checkmessage: "" });
                    callback();
                } else {
                    this.setState({ checkNdResult: false, checkmessage: "该年度的现金流量表记录已存在" });
                    callback("该年度的现金流量表记录已存在");
                }
            }).fail(e => {
                this.setState({ loading: false, checkNdResult: false, checkmessage: "校验失败" });
                notification.error({
                    duration: 2,
                    message: '数据读取失败',
                    description: '可能网络访问原因，请稍后尝试'
                });
                callback("校验失败");
            })
        }
    },

    render() {
        const { getFieldProps } = this.props.form;
        const jgxx = this.state.jgxx;
        const year = new Date().getFullYear() + "";
        return <div className="add">
            <div className="fix-table table-bordered table-striped" >
                <Spin spinning={this.state.loading} tip={this.state.tip}>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <table>
                            <colgroup>
                                <col className="col-2"></col>
                                <col className="col-5"></col>
                                <col className="col-2"></col>
                                <col className="col-9"></col>
                                <col className="col-3"></col>
                                <col className="col-3"></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>单位：</td>
                                    <td colSpan="3" style={{ textAlign: 'left' }} >{jgxx.DWMC}</td>
                                    <td width="12%">
                                        <SelectorYear { ...getFieldProps('nd', { initialValue: year, rules: [{ required: true, message: "请选择年度" }, { validator: this.checkNd }] }) } />
                                        {!this.state.checkNdResult && <span style={{ 'color': 'red' }}>{this.state.checkmessage}</span>}
                                    </td>
                                    <td width="12%">单位：元</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }} >项目</td>
                                    <td >行次</td>
                                    <td >金额</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>一、经营活动产生的现金流量：</td>
                                    <td> </td>
                                    <td> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>销售商品、提供劳务收到的现金</td>
                                    <td>1 </td>
                                    <td><InputNumber min={0} step={0.01} {...getFieldProps('jyhd_xjlr_xslw') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>收到的税费返还</td>
                                    <td>2</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('jyhd_xjlr_skfh') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>收到的其它与经营活动有关的现金</td>
                                    <td>3</td>
                                    <td><InputNumber min={0} step={0.01}   {...getFieldProps('jyhd_xjlr_qtjy') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>现金流入小计</td>
                                    <td>4</td>
                                    <td><InputNumber step={0.01}  {...getFieldProps('jyhd_xjlr_xj') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}> 购买商品、接收劳务支付的现金</td>
                                    <td>5</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('jyhd_xjlc_gmlw') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>支付给职工以及为职工支付的现金</td>
                                    <td>6</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('jyhd_xjlc_zfzg') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>支付的各项税费</td>
                                    <td>7</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('jyhd_xjlc_sf') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>支付的其它与经营活动有关的现金</td>
                                    <td>8</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('jyhd_xjlc_qtjy') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>现金流出小计</td>
                                    <td>9</td>
                                    <td><InputNumber step={0.01}  {...getFieldProps('jyhd_xjlc_xj') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>经营活动产生的现金流量净额</td>
                                    <td>10</td>
                                    <td><InputNumber step={0.01}  {...getFieldProps('jyhd_je') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>二、投资活动产生的现金流量：</td>
                                    <td></td>
                                    <td> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>收回投资所收到的现金</td>
                                    <td>11</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('tzhd_xjlr_shtz') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>取得投资收益所收到的现金</td>
                                    <td>12</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('tzhd_xjlr_tzsy') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>处置固定资产、无形资产和其他长期资产所收回的现金净额</td>
                                    <td>13</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('tzhd_xjlr_czzc') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>收到其他与投资活动有关的现金</td>
                                    <td>14</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('tzhd_xjlr_qttz') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>投资活动现金流入小计</td>
                                    <td>15</td>
                                    <td><InputNumber step={0.01}  {...getFieldProps('tzhd_xjlr_xj') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>购建固定资产、无形资产和其他长期资产所支付的现金</td>
                                    <td>16</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('tzhd_xjlc_gjzc') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>投资所支付的现金</td>
                                    <td>17</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('tzhd_xjlc_tz') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>支付的其他与投资活动有关的现金</td>
                                    <td>18</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('tzhd_xjlc_qttz') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>投资活动现金流出小计</td>
                                    <td>19</td>
                                    <td><InputNumber step={0.01}  {...getFieldProps('tzhd_xjlc_xj') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>投资活动产生的现金流量净额</td>
                                    <td>20</td>
                                    <td><InputNumber {...getFieldProps('tzhd_je') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>三、筹资活动产生的现金流量：</td>
                                    <td></td>
                                    <td> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>吸收投资所收到的现金</td>
                                    <td>21</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('czhd_xjlr_xstz') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>借款所收到的现金</td>
                                    <td>22</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('czhd_xjlr_jk') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>收到的其它与筹资活动有关的现金</td>
                                    <td>23</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('czhd_xjlr_qtcz') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>筹资活动现金流入小计</td>
                                    <td>24</td>
                                    <td><InputNumber step={0.01}  {...getFieldProps('czhd_xjlr_xj') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>偿还债务所支付的现金</td>
                                    <td>25</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('czhd_xjlc_chzw') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>分配股利、利润或偿付利息所支付的现金</td>
                                    <td>26</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('czhd_xjlc_fplr') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>支付的其它与筹资活动有关的现金</td>
                                    <td>27</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('czhd_xjlc_qtcz') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>筹资活动现金流出小计</td>
                                    <td>28</td>
                                    <td><InputNumber step={0.01}  {...getFieldProps('czhd_xjlc_xj') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>筹资活动产生的现金流量净额</td>
                                    <td>29</td>
                                    <td><InputNumber step={0.01}  {...getFieldProps('czhd_je') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>四、汇率变动对现金的影响</td>
                                    <td>30</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('hlbdyx') } /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>五、现金及现金等价物净增加额</td>
                                    <td>31</td>
                                    <td><InputNumber step={0.01}   {...getFieldProps('xjjzzj') } disabled /> </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>补充资料</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>1、将净利润调节为经营活动的现金流量</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>补充资料净利润</td>
                                    <td>32</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_jlr') } /></td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>加：计提的资产减值准备</td>
                                    <td>33</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_jtzcjz') } /></td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>固定资产折旧</td>
                                    <td>34</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_gdzczj') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>无形资产摊销</td>
                                    <td>35</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_wxzctx') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>长期待摊费用摊销</td>
                                    <td>36</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_cqdtfy') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>待摊费用减少（减：增加）</td>
                                    <td>37</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_dtfyjs') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>预提费用减少（减：减少）</td>
                                    <td>38</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_ytfyjs') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>处置固定资产、无形资产和其他长期资产的损失（减：收益）</td>
                                    <td>39</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_zcss') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>固定资产报废损失</td>
                                    <td>40</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_gdzcbf') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>财务费用</td>
                                    <td>41</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_cwfy') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>投资损失（减：收益）</td>
                                    <td>42</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_tzss') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>递延税款贷项（减：借项）</td>
                                    <td>43</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_dysddx') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>存货的减少（减：增加）</td>
                                    <td>44</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_chjs') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>经营性应收项目的减少（减：增加）</td>
                                    <td>45</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_ysxmjs') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>经营性应付项目的增加（减：减少）</td>
                                    <td>46</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_yfxmzj') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>其它</td>
                                    <td>47</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_qt') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>补充资料经营活动产生的现金流量净额</td>
                                    <td>48</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_xjllje') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>2、不涉及现金收支的投资和筹资活动：</td>
                                    <td></td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>债务转为资本</td>
                                    <td>49</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_zwzwzb') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>一年内到期的可转换公司债券</td>
                                    <td>50</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_yndqzj') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>融资租入固定资产</td>
                                    <td>51</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_rzzrzc') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>3、现金及现金等价物净增加情况：</td>
                                    <td></td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>现金的期末余额</td>
                                    <td>52</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_xjqmye') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>减：现金的期初余额</td>
                                    <td>53</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_xjqcye') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>加：现金的等价物的期末余额</td>
                                    <td>54</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_xjdjwqmye') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>减：现金等价物的期初余额</td>
                                    <td>55</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_xjdjwqcye') } /></td>
                                </tr>

                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>补充资料现金及现金等价物净增加额</td>
                                    <td>56</td>
                                    <td><InputNumber min={0} step={0.01}  {...getFieldProps('bczl_xjdjwjezj') } /></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr >
                                    <td></td>
                                    <td>
                                        <Button type="primary" onClick={this.handleSubmit.bind(this, 0)} loading={this.props.btnloading}> <Icon type="check" />保存</Button>
                                    </td>
                                    <td>
                                        <Button type="primary" onClick={this.showModal} loading={this.props.btnloading}> <Icon type="arrow-up" />提交</Button>
                                    </td>
                                    <td>
                                        <Button type="primary" onClick={this.handleReset} loading={this.props.btnloading}><Icon type="cross" />重置</Button>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </Form>
                </Spin>
            </div>
        </div>
    }
});
Addxjllb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = { value: props.data[prop] }
        }
        return result;
    },
    onFieldsChange(props, fields) {
        for (var key in fields) {
            props.changed(key, fields[key]['value']);
        }
    }
})(Addxjllb);


module.exports = Addxjllb
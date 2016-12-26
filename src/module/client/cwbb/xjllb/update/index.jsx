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

let Updatexjllb = React.createClass({
    getInitialState() {
        return { loading: false, tip: "数据加载中。。。", checkNdResult: true, checkmessage: "" };
    },

    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },

    handleSubmit(ztbj) {
        const obj = this.props.data;
        var mp = {};
        let value = this.props.form.getFieldsValue();
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
        value.id = obj.id; 
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
        this.props.resetFields("update");
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
        const data = this.props.data;
        if (!value) {
            this.setState({ checkNdResult: false, checkmessage: "请选择年度" });
        } else {
            const xjllbid = data.id;
            const where = { nd: value, xjllbid: xjllbid };
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
        const data = this.props.data; 
        const loading = this.props.loading;
        return <div className="add">
            <div className="fix-table table-bordered table-striped">
                <Spin spinning={loading} tip="数据加载中。。。">
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
                                        <td colSpan="3" style={{ textAlign: 'left' }} >{data.dwmc}</td>
                                        <td width="12%">
                                            <SelectorYear { ...getFieldProps('nd', { initialValue: data.ND, rules: [{ required: true, message: "请选择年度" }, { validator: this.checkNd }] }) } />
                                            {!this.state.checkNdResult && <span style={{ 'color': 'red' }}>{this.state.checkmessage}</span>}
                                        </td>
                                        <td width="12%">单位：元</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }} >项目</td>
                                        <td>行次</td>
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
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('jyhd_xjlr_xslw', { initialValue: data.JYHD_XJLR_XSLW }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>收到的税费返还</td>
                                        <td>2</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('jyhd_xjlr_skfh', { initialValue: data.JYHD_XJLR_SKFH }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>收到的其它与经营活动有关的现金</td>
                                        <td>3</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('jyhd_xjlr_qtjy', { initialValue: data.JYHD_XJLR_QTJY }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>现金流入小计</td>
                                        <td>4</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('jyhd_xjlr_xj', { initialValue: data.JYHD_XJLR_XJ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}> 购买商品、接收劳务支付的现金</td>
                                        <td>5</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('jyhd_xjlc_gmlw', { initialValue: data.JYHD_XJLC_GMLW }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>支付给职工以及为职工支付的现金</td>
                                        <td>6</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('jyhd_xjlc_zfzg', { initialValue: data.JYHD_XJLC_ZFZG }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>支付的各项税费</td>
                                        <td>7</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('jyhd_xjlc_sf', { initialValue: data.JYHD_XJLC_SF }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>支付的其它与经营活动有关的现金</td>
                                        <td>8</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('jyhd_xjlc_qtjy', { initialValue: data.JYHD_XJLC_QTJY }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>现金流出小计</td>
                                        <td>9</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('jyhd_xjlc_xj', { initialValue: data.JYHD_XJLC_XJ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>经营活动产生的现金流量净额</td>
                                        <td>10</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('jyhd_je', { initialValue: data.JYHD_JE }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>二、投资活动产生的现金流量：</td>
                                        <td></td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>收回投资所收到的现金</td>
                                        <td>11</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('tzhd_xjlr_shtz', { initialValue: data.TZHD_XJLR_SHTZ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>取得投资收益所收到的现金</td>
                                        <td>12</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('tzhd_xjlr_tzsy', { initialValue: data.TZHD_XJLR_TZSY }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>处置固定资产、无形资产和其他长期资产所收回的现金净额</td>
                                        <td>13</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('tzhd_xjlr_czzc', { initialValue: data.TZHD_XJLR_CZZC }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>收到其他与投资活动有关的现金</td>
                                        <td>14</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('tzhd_xjlr_qttz', { initialValue: data.TZHD_XJLR_QTTZ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>投资活动现金流入小计</td>
                                        <td>15</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('tzhd_xjlr_xj', { initialValue: data.TZHD_XJLR_XJ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>购建固定资产、无形资产和其他长期资产所支付的现金</td>
                                        <td>16</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('tzhd_xjlc_gjzc', { initialValue: data.TZHD_XJLC_GJZC }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>投资所支付的现金</td>
                                        <td>17</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('tzhd_xjlc_tz', { initialValue: data.TZHD_XJLC_TZ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>支付的其他与投资活动有关的现金</td>
                                        <td>18</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('tzhd_xjlc_qttz', { initialValue: data.TZHD_XJLC_QTTZ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>投资活动现金流出小计</td>
                                        <td>19</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('tzhd_xjlc_xj', { initialValue: data.TZHD_XJLC_XJ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>投资活动产生的现金流量净额</td>
                                        <td>20</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('tzhd_je', { initialValue: data.TZHD_JE }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>三、筹资活动产生的现金流量：</td>
                                        <td></td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>吸收投资所收到的现金</td>
                                        <td>21</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('czhd_xjlr_xstz', { initialValue: data.CZHD_XJLR_XSTZ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>借款所收到的现金</td>
                                        <td>22</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('czhd_xjlr_jk', { initialValue: data.CZHD_XJLR_JK }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>收到的其它与筹资活动有关的现金</td>
                                        <td>23</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('czhd_xjlr_qtcz', { initialValue: data.CZHD_XJLR_QTCZ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>筹资活动现金流入小计</td>
                                        <td>24</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('czhd_xjlr_xj', { initialValue: data.CZHD_XJLR_XJ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>偿还债务所支付的现金</td>
                                        <td>25</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('czhd_xjlc_chzw', { initialValue: data.CZHD_XJLC_CHZW }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>分配股利、利润或偿付利息所支付的现金</td>
                                        <td>26</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('czhd_xjlc_fplr', { initialValue: data.CZHD_XJLC_FPLR }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>支付的其它与筹资活动有关的现金</td>
                                        <td>27</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('czhd_xjlc_qtcz', { initialValue: data.CZHD_XJLC_QTCZ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>筹资活动现金流出小计</td>
                                        <td>28</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('czhd_xjlc_xj', { initialValue: data.CZHD_XJLC_XJ }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>筹资活动产生的现金流量净额</td>
                                        <td>29</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('czhd_je', { initialValue: data.CZHD_JE }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>四、汇率变动对现金的影响</td>
                                        <td>30</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('hlbdyx', { initialValue: data.HLBDYX }) } /> </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>五、现金及现金等价物净增加额</td>
                                        <td>31</td>
                                        <td><InputNumber step={0.01} disabled {...getFieldProps('xjjzzj', { initialValue: data.XJJZZJ }) } /> </td>
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
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_jlr', { initialValue: data.BCZL_JLR }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>加：计提的资产减值准备</td>
                                        <td>33</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_jtzcjz', { initialValue: data.BCZL_JTZCJZ }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>固定资产折旧</td>
                                        <td>34</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_gdzczj', { initialValue: data.BCZL_GDZCZJ }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>无形资产摊销</td>
                                        <td>35</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_wxzctx', { initialValue: data.BCZL_WXZCTX }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>长期待摊费用摊销</td>
                                        <td>36</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_cqdtfy', { initialValue: data.BCZL_CQDTFY }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>待摊费用减少（减：增加）</td>
                                        <td>37</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_dtfyjs', { initialValue: data.BCZL_DTFYJS }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>预提费用减少（减：减少）</td>
                                        <td>38</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_ytfyjs', { initialValue: data.BCZL_YTFYJS }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>处置固定资产、无形资产和其他长期资产的损失（减：收益）</td>
                                        <td>39</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_zcss', { initialValue: data.BCZL_ZCSS }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>固定资产报废损失</td>
                                        <td>40</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_gdzcbf', { initialValue: data.BCZL_GDZCBF }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>财务费用</td>
                                        <td>41</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_cwfy', { initialValue: data.BCZL_CWFY }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>投资损失（减：收益）</td>
                                        <td>42</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_tzss', { initialValue: data.BCZL_TZSS }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>递延税款贷项（减：借项）</td>
                                        <td>43</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_dysddx', { initialValue: data.BCZL_DYSDDX }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>存货的减少（减：增加）</td>
                                        <td>44</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_chjs', { initialValue: data.BCZL_CHJS }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>经营性应收项目的减少（减：增加）</td>
                                        <td>45</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_ysxmjs', { initialValue: data.BCZL_YSXMJS }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>经营性应付项目的增加（减：减少）</td>
                                        <td>46</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_yfxmzj', { initialValue: data.BCZL_YFXMZJ }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>其它</td>
                                        <td>47</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_qt', { initialValue: data.BCZL_QT }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>补充资料经营活动产生的现金流量净额</td>
                                        <td>48</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_xjllje', { initialValue: data.BCZL_XJLLJE }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>2、不涉及现金收支的投资和筹资活动：</td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>债务转为资本</td>
                                        <td>49</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_zwzwzb', { initialValue: data.BCZL_ZWZWZB }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>一年内到期的可转换公司债券</td>
                                        <td>50</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_yndqzj', { initialValue: data.BCZL_YNDQZJ }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>融资租入固定资产</td>
                                        <td>51</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_rzzrzc', { initialValue: data.BCZL_RZZRZC }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>3、现金及现金等价物净增加情况：</td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>现金的期末余额</td>
                                        <td>52</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_xjqmye', { initialValue: data.BCZL_XJQMYE }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>减：现金的期初余额</td>
                                        <td>53</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_xjqcye', { initialValue: data.BCZL_XJQCYE }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>加：现金的等价物的期末余额</td>
                                        <td>54</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_xjdjwqmye', { initialValue: data.BCZL_XJDJWQMYE }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>减：现金等价物的期初余额</td>
                                        <td>55</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_xjdjwqcye', { initialValue: data.BCZL_XJDJWQCYE }) } /></td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>补充资料现金及现金等价物净增加额</td>
                                        <td>56</td>
                                        <td><InputNumber min={0} step={0.01} {...getFieldProps('bczl_xjdjwjezj', { initialValue: data.BCZL_XJDJWJEZJ }) } /></td>
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
                </Spin>
            </div>
        </div>
    }
});


Updatexjllb = Form.create({
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
})(Updatexjllb);

module.exports = Updatexjllb
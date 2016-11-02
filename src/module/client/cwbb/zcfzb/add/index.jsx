import React from 'react'
import { Col, Input, Row, Button, Icon, Form, Modal, DatePicker, Alert, message,Spin } from 'antd'
import { SelectorYear, SelectorXZ } from 'component/compSelector'
import './style.css'
import Panel from 'component/compPanel'
import req from 'reqwest'
import config from 'common/configuration'
import auth from 'common/auth'

const ButtonGroup = Button.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const ToolBar = Panel.ToolBar;
const CheckNd_URL = config.HOST + config.URI_API_PROJECT + "/checkzcfz"


let Addzcfzb = React.createClass({
    getInitialState() {
        return { visible: false, checkNd: true, checkTimevalue: true, loading: false, helper: true };
    },

    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },

    handleSubmit(ztbj) {
        var mp = {};
        let value = this.props.form.getFieldsValue()
        for (var key in value) {
            if (typeof (value[key]) == 'undefined' || (isNaN(value[key]) ? ("" == value[key]) : false)) {
                value[key] = null;
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
        this.props.form.resetFields();
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
    
    
     
    //帮助按钮
    handleHelper() {
        this.setState({ helper: !this.state.helper })
    },
    //填报年度是否重复校验方法
    checkNdIfExit(rule, value, callback) {
        const rs = true;
        const timevalue = this.props.form.getFieldValue("timevalue")
        const params = { where: encodeURIComponent(JSON.stringify({ nd: value, timevalue: timevalue })), }
        req({
            url: CheckNd_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': auth.getToken() },
            contentType: 'application/json',
        }).then(resp => {
            if (resp) {
                callback('同一年度不能做两次上报，请选择其他年度');
            } else {
                callback();
            }
        }).fail(err => {
            this.setState({ loading: false });
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
    checkTimevalueIfExit(rule, value, callback) {

        const nd = this.props.form.getFieldValue("nd")
        const params = { where: encodeURIComponent(JSON.stringify({ nd: nd, timevalue: value })), }
        req({
            url: CheckNd_URL,
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': auth.getToken() },
            contentType: 'application/json',
        }).then(resp => {
            if (resp) {
                callback('该年度的上半年（或全年）已经填报上报表，请选择其他年度');
            } else {
                callback();
            }
        }).fail(err => {
            this.setState({ loading: false });
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

    //数值输入处理方法
    handleInputChange(e) {
        let changeField = e.target.id;
        let value = e.target.value;
        if (!value) {
            value = 0;
        }
        let entity = this.props.form.getFieldsValue();
        let ldzc_hbzj_nc = 0;
        let ldzc_hbzj = 0;
        let ldfz_dqjk_nc = 0;
        let ldfz_dqjk = 0;
        let ldzc_dqtz_nc = 0;
        let ldzc_dqtz = 0;
        let ldfz_yfpj_nc = 0;
        let ldfz_yfpj = 0;
        let ldzc_yspj_nc = 0;
        let ldzc_yspj = 0;
        let ldfz_yfzk_nc = 0;
        let ldfz_yfzk = 0;
        let ldzc_ysgl_nc = 0;
        let ldzc_ysgl = 0;
        let ldfz_yszk_nc = 0;
        let ldfz_yszk = 0;
        let ldzc_yslx_nc = 0;
        let ldzc_yslx = 0;
        let ldzc_yszk_nc = 0;
        let ldzc_yszk = 0;
        let ldzc_qtys_nc = 0;
        let ldzc_qtys = 0;
        let ldzc_yfzk_nc = 0;
        let ldzc_yfzk = 0;
        let ldzc_ysbt_nc = 0;
        let ldzc_ysbt = 0;
        let ldzc_ch_nc = 0;
        let ldzc_ch = 0;
        let ldzc_dtfy_nc = 0;
        let ldzc_dtfy = 0;
        let ldzc_dqzj_nc = 0;
        let ldzc_dqzj = 0;
        let ldzc_qtldzc_nc = 0;
        let ldzc_qtldzc = 0;
        let ldzc_hj_nc = 0;
        let ldzc_hj = 0;
        let cqtz_gq_nc = 0;
        let cqtz_gq = 0;
        let cqtz_zq_nc = 0;
        let cqtz_zq = 0;
        let cqtz_hj_nc = 0;
        let cqtz_hj = 0;
        let gdzc_yj_nc = 0;
        let gdzc_yj = 0;
        let gdzc_ljzj_nc = 0;
        let gdzc_ljzj = 0;
        let gdzc_jz_nc = 0;
        let gdzc_jz = 0;
        let gdzc_jzzb_nc = 0;
        let gdzc_jzzb = 0;
        let gdzc_je_nc = 0;
        let gdzc_je = 0;
        let gdzc_gcwz_nc = 0;
        let gdzc_gcwz = 0;
        let gdzc_zjgc_nc = 0;
        let gdzc_zjgc = 0;
        let gdzc_ql_nc = 0;
        let gdzc_ql = 0;
        let gdzc_hj_nc = 0;
        let gdzc_hj = 0;
        let wxqt_wxzc_nc = 0;
        let wxqt_wxzc = 0;
        let wxqt_cqdt_nc = 0;
        let wxqt_cqdt = 0;
        let wxqt_qtcq_nc = 0;
        let wxqt_qtcq = 0;
        let wxqt_hj_nc = 0;
        let wxqt_hj = 0;
        let zczj_nc = 0;
        let zczj = 0;
        let ydsx_skjx_nc = 0;
        let ydsx_skjx = 0;
        let ldfz_yfgz_nc = 0;
        let ldfz_yfgz = 0;
        let ldfz_yffl_nc = 0;
        let ldfz_yffl = 0;
        let ldfz_yfgl_nc = 0;
        let ldfz_yfgl = 0;
        let ldfz_yjsj_nc = 0;
        let ldfz_yjsj = 0;
        let ldfz_qtyj_nc = 0;
        let ldfz_qtyj = 0;
        let ldfz_qtyf_nc = 0;
        let ldfz_qtyf = 0;
        let ldfz_ytfy_nc = 0;
        let ldfz_ytfy = 0;
        let ldfz_yjfz_nc = 0;
        let ldfz_yjfz = 0;
        let ldfz_dqfz_nc = 0;
        let ldfz_dqfz = 0;
        let ldfz_qtfz_nc = 0;
        let ldfz_qtfz = 0;
        let ldfz_hj_nc = 0;
        let ldfz_hj = 0;
        let cqfz_cqjk_nc = 0;
        let cqfz_cqjk = 0;
        let cqfz_yfzq_nc = 0;
        let cqfz_yfzq = 0;
        let cqfz_cqyf_nc = 0;
        let cqfz_cqyf = 0;
        let cqfz_zxyf_nc = 0;
        let cqfz_zxyf = 0;
        let cqfz_zyfxjj_nc = 0;
        let cqfz_zyfxjj = 0;
        let cqfz_qtfz_nc = 0;
        let cqfz_qtfz = 0;
        let cqfz_hj_nc = 0;
        let cqfz_hj = 0;
        let dysx_dyskdx_nc = 0;
        let dysx_dyskdx = 0;
        let dysx_fzhj_nc = 0;
        let dysx_fzhj = 0;
        let syzqy_sszb_nc = 0;
        let syzqy_sszb = 0;
        let syzqy_yhtz_nc = 0;
        let syzqy_yhtz = 0;
        let syzqy_sszbje_nc = 0;
        let syzqy_sszbje = 0;
        let syzqy_zbgj_nc = 0;
        let syzqy_zbgj = 0;
        let syzqy_yygj_nc = 0;
        let syzqy_yygj = 0;
        let syzqy_wfplr_nc = 0;
        let syzqy_wfplr = 0;
        let syzqy_hj_nc = 0;
        let syzqy_hj = 0;
        let fzsyzqy_hj_nc = 0;
        let fzsyzqy_hj = 0;
        //================================================================

        if (entity.ldzc_hbzj_nc) {
            ldzc_hbzj_nc = entity.ldzc_hbzj_nc;
        }
        if (entity.ldzc_hbzj) {
            ldzc_hbzj = entity.ldzc_hbzj;
        }
        if (entity.ldfz_dqjk_nc) {
            ldfz_dqjk_nc = entity.ldfz_dqjk_nc;
        }
        if (entity.ldfz_dqjk) {
            ldfz_dqjk = entity.ldfz_dqjk;
        }

        if (entity.ldzc_dqzj_nc) {
            ldzc_dqzj_nc = entity.ldzc_dqzj_nc;
        }
        if (entity.ldzc_dqzj) {
            ldzc_dqzj = entity.ldzc_dqzj;
        }
        if (entity.ydsx_skjx_nc) {
            ydsx_skjx_nc = entity.ydsx_skjx_nc;
        }
        if (entity.ydsx_skjx) {
            ydsx_skjx = entity.ydsx_skjx;
        }
        if (entity.ldzc_dqtz_nc) {
            ldzc_dqtz_nc = entity.ldzc_dqtz_nc;
        }
        if (entity.ldzc_dqtz) {
            ldzc_dqtz = entity.ldzc_dqtz;
        }
        if (entity.ldfz_yfpj_nc) {
            ldfz_yfpj_nc = entity.ldfz_yfpj_nc;
        }
        if (entity.ldfz_yfpj) {
            ldfz_yfpj = entity.ldfz_yfpj;
        }
        if (entity.ldzc_yspj_nc) {
            ldzc_yspj_nc = entity.ldzc_yspj_nc;
        }
        if (entity.ldzc_yspj) {
            ldzc_yspj = entity.ldzc_yspj;
        }
        if (entity.ldfz_yfzk_nc) {
            ldfz_yfzk_nc = entity.ldfz_yfzk_nc;
        }
        if (entity.ldfz_yfzk) {
            ldfz_yfzk = entity.ldfz_yfzk;
        }
        if (entity.ldfz_yszk_nc) {
            ldfz_yszk_nc = entity.ldfz_yszk_nc;
        }
        if (entity.ldfz_yszk) {
            ldfz_yszk = entity.ldfz_yszk;

        }

        if (entity.ldfz_yfgz_nc) {
            ldfz_yfgz_nc = entity.ldfz_yfgz_nc;
        }
        if (entity.ldfz_yfgz) {
            ldfz_yfgz = entity.ldfz_yfgz;
        }
        if (entity.ldfz_yffl_nc) {
            ldfz_yffl_nc = entity.ldfz_yffl_nc;
        }
        if (entity.ldfz_yffl) {
            ldfz_yffl = entity.ldfz_yffl;
        }

        if (entity.ldfz_yf) {
            ldfz_yffl = entity.ldfz_yffl;
        }
        if (entity.ldfz_yfgl_nc) {
            ldfz_yfgl_nc = entity.ldfz_yfgl_nc;
        }
        if (entity.ldfz_yfgl) {
            ldfz_yfgl = entity.ldfz_yfgl;
        }
        if (entity.ldfz_yjsj_nc) {
            ldfz_yjsj_nc = entity.ldfz_yjsj_nc;
        }
        if (entity.ldfz_yjsj) {
            ldfz_yjsj = entity.ldfz_yjsj;
        }
        if (entity.ldfz_qtyj_nc) {
            ldfz_qtyj_nc = entity.ldfz_qtyj_nc;
        }
        if (entity.ldfz_qtyj) {
            ldfz_qtyj = entity.ldfz_qtyj;
        }

        if (entity.ldfz_qtyf_nc) {
            ldfz_qtyf_nc = entity.ldfz_qtyf_nc;
        }
        if (entity.ldfz_qtyf) {
            ldfz_qtyf = entity.ldfz_qtyf;
        }
        if (entity.ldfz_ytfy_nc) {
            ldfz_ytfy_nc = entity.ldfz_ytfy_nc;
        }
        if (entity.ldfz_ytfy) {
            ldfz_ytfy = entity.ldfz_ytfy;
        }
        if (entity.ldfz_yjfz_nc) {
            ldfz_yjfz_nc = entity.ldfz_yjfz_nc;
        }
        if (entity.ldfz_yjfz) {
            ldfz_yjfz = entity.ldfz_yjfz;
        }
        if (entity.ldfz_dqfz_nc) {
            ldfz_dqfz_nc = entity.ldfz_dqfz_nc;
        }
        if (entity.ldfz_dqfz) {
            ldfz_dqfz = entity.ldfz_dqfz;
        }
        if (entity.ldfz_qtfz_nc) {
            ldfz_qtfz_nc = entity.ldfz_qtfz_nc;
        }
        if (entity.ldfz_qtfz) {
            ldfz_qtfz = entity.ldfz_qtfz;
        }
        if (entity.ldfz_hj_nc) {
            ldfz_hj_nc = entity.ldfz_hj_nc;
        }
        if (entity.ldfz_hj) {
            ldfz_hj = entity.ldfz_hj;
        }
        if (entity.cqfz_cqjk_nc) {
            cqfz_cqjk_nc = entity.cqfz_cqjk_nc;
        }
        if (entity.cqfz_cqjk) {
            cqfz_cqjk = entity.cqfz_cqjk;
        }
        if (entity.cqfz_yfzq_nc) {
            cqfz_yfzq_nc = entity.cqfz_yfzq_nc;
        }
        if (entity.cqfz_yfzq) {
            cqfz_yfzq = entity.cqfz_yfzq;
        }
        if (entity.cqfz_cqyf_nc) {
            cqfz_cqyf_nc = entity.cqfz_cqyf_nc;
        }
        if (entity.cqfz_cqyf) {
            cqfz_cqyf = entity.cqfz_cqyf;
        }
        if (entity.cqfz_zxyf_nc) {
            cqfz_zxyf_nc = entity.cqfz_zxyf_nc;
        }
        if (entity.cqfz_zxyf) {
            cqfz_zxyf = entity.cqfz_zxyf;
        }

        if (entity.cqfz_zyfxjj_nc) {
            cqfz_zyfxjj_nc = entity.cqfz_zyfxjj_nc;
        }
        if (entity.cqfz_zyfxjj) {
            cqfz_zyfxjj = entity.cqfz_zyfxjj;
        }
        if (entity.cqfz_qtfz_nc) {
            cqfz_qtfz_nc = entity.cqfz_qtfz_nc;
        }
        if (entity.cqfz_qtfz) {
            cqfz_qtfz = entity.cqfz_qtfz;
        }
        if (entity.cqfz_hj_nc) {
            cqfz_hj_nc = entity.cqfz_hj_nc;
        }
        if (entity.cqfz_hj) {
            cqfz_hj = entity.cqfz_hj;
        }
        if (entity.syzqy_sszb_nc) {
            syzqy_sszb_nc = entity.syzqy_sszb_nc;
        }
        if (entity.syzqy_sszb) {
            syzqy_sszb = entity.syzqy_sszb;
        }
        if (entity.syzqy_yhtz_nc) {
            syzqy_yhtz_nc = entity.syzqy_yhtz_nc;
        }
        if (entity.syzqy_yhtz) {
            syzqy_yhtz = entity.syzqy_yhtz;
        }
        if (entity.syzqy_sszbje_nc) {
            syzqy_sszbje_nc = entity.syzqy_sszbje_nc;
        }
        if (entity.syzqy_sszbje) {
            syzqy_sszbje = entity.syzqy_sszbje;
        }
        if (entity.syzqy_zbgj_nc) {
            syzqy_zbgj_nc = entity.syzqy_zbgj_nc;
        }
        if (entity.syzqy_zbgj) {
            syzqy_zbgj = entity.syzqy_zbgj;
        }
        if (entity.syzqy_yygj_nc) {
            syzqy_yygj_nc = entity.syzqy_yygj_nc;
        }
        if (entity.syzqy_yygj) {
            syzqy_yygj = entity.syzqy_yygj;
        }
        if (entity.syzqy_wfplr_nc) {
            syzqy_wfplr_nc = entity.syzqy_wfplr_nc;
        }
        if (entity.syzqy_wfplr) {
            syzqy_wfplr = entity.syzqy_wfplr;
        }
        if (entity.syzqy_hj_nc) {
            syzqy_hj_nc = entity.syzqy_hj_nc;
        }
        if (entity.syzqy_hj) {
            syzqy_hj = entity.syzqy_hj;
        }
        if (entity.fzsyzqy_hj_nc) {
            fzsyzqy_hj_nc = entity.fzsyzqy_hj_nc;
        }
        if (entity.fzsyzqy_hj) {
            fzsyzqy_hj = entity.fzsyzqy_hj;
        }
        if (entity.ldzc_ysgl_nc) {
            ldzc_ysgl_nc = entity.ldzc_ysgl_nc;
        }
        if (entity.ldzc_ysgl) {
            ldzc_ysgl = entity.ldzc_ysgl;
        }
        if (entity.ldzc_yslx_nc) {
            ldzc_yslx_nc = entity.ldzc_yslx_nc;
        }
        if (entity.ldzc_yslx) {
            ldzc_yslx = entity.ldzc_yslx;
        }
        if (entity.ldzc_yszk_nc) {
            ldzc_yszk_nc = entity.ldzc_yszk_nc;
        }
        if (entity.ldzc_yszk) {
            ldzc_yszk = entity.ldzc_yszk;
        }
        if (entity.ldzc_qtys_nc) {
            ldzc_qtys_nc = entity.ldzc_qtys_nc;
        }
        if (entity.ldzc_qtys) {
            ldzc_qtys = entity.ldzc_qtys;
        }
        if (entity.ldzc_yfzk_nc) {
            ldzc_yfzk_nc = entity.ldzc_yfzk_nc;
        }
        if (entity.ldzc_yfzk) {
            ldzc_yfzk = entity.ldzc_yfzk;
        }
        if (entity.ldzc_ysbt_nc) {
            ldzc_ysbt_nc = entity.ldzc_ysbt_nc;
        }
        if (entity.ldzc_ysbt) {
            ldzc_ysbt = entity.ldzc_ysbt;
        }
        if (entity.ldzc_ch_nc) {
            ldzc_ch_nc = entity.ldzc_ch_nc;
        }
        if (entity.ldzc_ch) {
            ldzc_ch = entity.ldzc_ch;
        }
        if (entity.ldzc_dtfy_nc) {
            ldzc_dtfy_nc = entity.ldzc_dtfy_nc;
        }
        if (entity.ldzc_dtfy) {
            ldzc_dtfy = entity.ldzc_dtfy;
        }
        if (entity.ldzc_dqtz_nc) {
            ldzc_dqtz_nc = entity.ldzc_dqtz_nc;
        }
        if (entity.ldzc_dqtz) {
            ldzc_dqtz = entity.ldzc_dqtz;
        }
        if (entity.ldzc_qtldzc_nc) {
            ldzc_qtldzc_nc = entity.ldzc_qtldzc_nc;
        }
        if (entity.ldzc_qtldzc) {
            ldzc_qtldzc = entity.ldzc_qtldzc;
        }
        if (entity.ldzc_hj_nc) {
            ldzc_hj_nc = entity.ldzc_hj_nc;
        }
        if (entity.ldzc_hj) {
            ldzc_hj = entity.ldzc_hj;
        }
        if (entity.cqtz_gq_nc) {
            cqtz_gq_nc = entity.cqtz_gq_nc;
        }
        if (entity.cqtz_gq) {
            cqtz_gq = entity.cqtz_gq;
        }
        if (entity.cqtz_zq_nc) {
            cqtz_zq_nc = entity.cqtz_zq_nc;
        }
        if (entity.cqtz_zq) {
            cqtz_zq = entity.cqtz_zq;
        }
        if (entity.cqtz_hj_nc) {
            cqtz_hj_nc = entity.cqtz_hj_nc;
        }
        if (entity.cqtz_hj) {
            cqtz_hj = entity.cqtz_hj;
        }
        if (entity.gdzc_yj_nc) {
            gdzc_yj_nc = entity.gdzc_yj_nc;
        }
        if (entity.gdzc_yj) {
            gdzc_yj = entity.gdzc_yj;
        }
        if (entity.gdzc_ljzj_nc) {
            gdzc_ljzj_nc = entity.gdzc_ljzj_nc;
        }
        if (entity.gdzc_ljzj) {
            gdzc_ljzj = entity.gdzc_ljzj;
        }
        if (entity.gdzc_jz_nc) {
            gdzc_jz_nc = entity.gdzc_jz_nc;
        }
        if (entity.gdzc_jz) {
            gdzc_jz = entity.gdzc_jz;
        }
        if (entity.gdzc_jzzb_nc) {
            gdzc_jzzb_nc = entity.gdzc_jzzb_nc;
        }
        if (entity.gdzc_jzzb) {
            gdzc_jzzb = entity.gdzc_jzzb;
        }
        if (entity.gdzc_je_nc) {
            gdzc_je_nc = entity.gdzc_je_nc;
        }
        if (entity.gdzc_je) {
            gdzc_je = entity.gdzc_je;
        }
        if (entity.gdzc_gcwz_nc) {
            gdzc_gcwz_nc = entity.gdzc_gcwz_nc;
        }

        if (entity.gdzc_gcwz) {
            gdzc_gcwz = entity.gdzc_gcwz;
        }
        if (entity.gdzc_zjgc_nc) {
            gdzc_zjgc_nc = entity.gdzc_zjgc_nc;
        }
        if (entity.gdzc_zjgc) {
            gdzc_zjgc = entity.gdzc_zjgc;
        }
        if (entity.gdzc_ql_nc) {
            gdzc_ql_nc = entity.gdzc_ql_nc;
        }
        if (entity.gdzc_ql) {
            gdzc_ql = entity.gdzc_ql;
        }
        if (entity.gdzc_hj_nc) {
            gdzc_hj_nc = entity.gdzc_hj_nc;
        }
        if (entity.gdzc_hj) {
            gdzc_hj = entity.gdzc_hj;
        }
        if (entity.wxqt_wxzc_nc) {
            wxqt_wxzc_nc = entity.wxqt_wxzc_nc;
        }
        if (entity.wxqt_wxzc) {
            wxqt_wxzc = entity.wxqt_wxzc;
        }
        if (entity.wxqt_cqdt_nc) {
            wxqt_cqdt_nc = entity.wxqt_cqdt_nc;
        }
        if (entity.wxqt_cqdt) {
            wxqt_cqdt = entity.wxqt_cqdt;
        }
        if (entity.wxqt_qtcq_nc) {
            wxqt_qtcq_nc = entity.wxqt_qtcq_nc;
        }
        if (entity.wxqt_qtcq) {
            wxqt_qtcq = entity.wxqt_qtcq;
        }
        if (entity.wxqt_hj_nc) {
            wxqt_hj_nc = entity.wxqt_hj_nc;
        }
        if (entity.wxqt_hj) {
            wxqt_hj = entity.wxqt_hj;
        }
        if (entity.dysx_dyskdx_nc) {
            dysx_dyskdx_nc = entity.dysx_dyskdx_nc;
        }
        if (entity.dysx_dyskdx) {
            dysx_dyskdx = entity.dysx_dyskdx;
        }
        if (entity.zczj_nc) {
            zczj_nc = entity.zczj_nc;
        }
        if (entity.zczj) {
            zczj = entity.zczj;
        }
        if (entity.dysx_fzhj_nc) {
            dysx_fzhj_nc = entity.dysx_fzhj_nc
        }
        if (entity.dysx_fzhj) {
            dysx_fzhj = entity.dysx_fzhj
        }

        //-------------------------------------------------------------------------------------



        if (changeField == "ldzc_hbzj_nc") {
            ldzc_hbzj_nc = value;
            this.props.form.setFieldsValue({ ldzc_hbzj_nc: value });
        } else if (changeField == "ldzc_hbzj") {
            ldzc_hbzj = value;
            this.props.form.setFieldsValue({ ldzc_hbzj: value });
        } else if (changeField == "ldfz_dqjk_nc") {
            ldfz_dqjk_nc = value;
            this.props.form.setFieldsValue({ ldfz_dqjk_nc: value });
        } else if (changeField == "ldfz_dqjk") {
            ldfz_dqjk = value;
            this.props.form.setFieldsValue({ ldfz_dqjk: value });
        } else if (changeField == "ldzc_dqzj_nc") {
            ldzc_dqzj_nc = value;
            this.props.form.setFieldsValue({ ldzc_dqzj_nc: value });
        } else if (changeField == "ldzc_dqzj") {
            ldzc_dqzj = value;
            this.props.form.setFieldsValue({ ldzc_dqzj: value });
        } else if (changeField == "ydsx_skjx_nc") {
            ydsx_skjx_nc = value;
            this.props.form.setFieldsValue({ ydsx_skjx_nc: value });
        } else if (changeField == "ydsx_skjx") {
            ydsx_skjx = value;
            this.props.form.setFieldsValue({ ydsx_skjx: value });
        } else if (changeField == "ldzc_dqtz_nc") {
            ldzc_dqtz_nc = value;
            this.props.form.setFieldsValue({ ldzc_dqtz_nc: value });
        } else if (changeField == "ldzc_dqtz") {
            ldzc_dqtz = value;
            this.props.form.setFieldsValue({ ldzc_dqtz: value });
        } else if (changeField == "ldzc_yspj_nc") {
            ldzc_yspj_nc = value;
            this.props.form.setFieldsValue({ ldzc_yspj_nc: value });
        } else if (changeField == "ldzc_yspj") {
            ldzc_yspj = value;
            this.props.form.setFieldsValue({ ldzc_yspj: value });
        } else if (changeField == "ldfz_yfzk_nc") {
            ldfz_yfzk_nc = value;
            this.props.form.setFieldsValue({ ldfz_yfzk_nc: value });
        } else if (changeField == "ldfz_yfzk") {
            ldfz_yfzk = value;
            this.props.form.setFieldsValue({ ldfz_yfzk: value });
        } else if (changeField == "ldzc_qtys_nc") {
            ldzc_qtys_nc = value;
            this.props.form.setFieldsValue({ ldzc_qtys_nc: value });
        } else if (changeField == "ldzc_qtys") {
            ldzc_qtys = value;
            this.props.form.setFieldsValue({ ldzc_qtys: value });
        } else if (changeField == "ldzc_yfzk_nc") {
            ldzc_yfzk_nc = value;
            this.props.form.setFieldsValue({ ldzc_yfzk_nc: value });
        } else if (changeField == "ldzc_yfzk") {
            ldzc_yfzk = value;
            this.props.form.setFieldsValue({ ldzc_yfzk: value });
        } else if (changeField == "ldzc_ysbt_nc") {
            ldzc_ysbt_nc = value;
            this.props.form.setFieldsValue({ ldzc_ysbt_nc: value });
        } else if (changeField == "ldzc_ysbt") {
            ldzc_ysbt = value;
            this.props.form.setFieldsValue({ ldzc_ysbt: value });
        } else if (changeField == "ldzc_ch_nc") {
            ldzc_ch_nc = value;
            this.props.form.setFieldsValue({ ldzc_ch_nc: value });
        } else if (changeField == "ldzc_ch") {
            ldzc_ch = value;
            this.props.form.setFieldsValue({ ldzc_ch: value });
        } else if (changeField == "ldzc_dtfy_nc") {
            ldzc_dtfy_nc = value;
            this.props.form.setFieldsValue({ ldzc_dtfy_nc: value });
        } else if (changeField == "ldzc_dtfy") {
            ldzc_dtfy = value;
            this.props.form.setFieldsValue({ ldzc_dtfy: value });
        } else if (changeField == "ldzc_dqtz_nc") {
            ldzc_dqtz_nc = value;
            this.props.form.setFieldsValue({ ldzc_dqtz_nc: value });
        } else if (changeField == "ldzc_dqtz") {
            ldzc_dqtz = value;
            this.props.form.setFieldsValue({ ldzc_dqtz: value });
        } else if (changeField == "ldzc_qtldzc_nc") {
            ldzc_qtldzc_nc = value;
            this.props.form.setFieldsValue({ ldzc_qtldzc_nc: value });
        } else if (changeField == "ldzc_qtldzc") {
            ldzc_qtldzc = value;
            this.props.form.setFieldsValue({ ldzc_qtldzc: value });
        } else if (changeField == "ldzc_hj_nc") {
            ldzc_hj_nc = value;
            this.props.form.setFieldsValue({ ldzc_hj_nc: value });
        } else if (changeField == "ldzc_hj") {
            ldzc_hj = value;
            this.props.form.setFieldsValue({ ldzc_hj: value });
        } else if (changeField == "cqtz_gq_nc") {
            cqtz_gq_nc = value;
            this.props.form.setFieldsValue({ cqtz_gq_nc: value });
        } else if (changeField == "cqtz_gq") {
            cqtz_gq = value;
            this.props.form.setFieldsValue({ cqtz_gq: value });
        } else if (changeField == "cqtz_zq_nc") {
            cqtz_zq_nc = value;
            this.props.form.setFieldsValue({ cqtz_zq_nc: value });
        } else if (changeField == "cqtz_zq") {
            cqtz_zq = value;
            this.props.form.setFieldsValue({ cqtz_zq: value });
        } else if (changeField == "cqtz_hj_nc") {
            cqtz_hj_nc = value;
            this.props.form.setFieldsValue({ cqtz_hj_nc: value });

        } else if (changeField == "cqtz_hj") {
            cqtz_hj = value;
            this.props.form.setFieldsValue({ cqtz_hj: value });
        } else if (changeField == "gd") {
            cqtz_hj_nc = value;
            this.props.form.setFieldsValue({ cqtz_hj_nc: value });
        } else if (changeField == "cqtz_hj") {
            cqtz_hj = value;
            this.props.form.setFieldsValue({ cqtz_hj: value });
        } else if (changeField == "ldzc_ysgl_nc") {
            ldzc_ysgl_nc = value;
            this.props.form.setFieldsValue({ ldzc_ysgl_nc: value });
        } else if (changeField == "ldzc_ysgl") {
            ldzc_ysgl = value;
            this.props.form.setFieldsValue({ ldzc_ysgl: value });
        } else if (changeField == "ldzc_yslx_nc") {
            ldzc_yslx_nc = value;
            this.props.form.setFieldsValue({ ldzc_yslx_nc: value });
        } else if (changeField == "ldzc_yslx") {
            ldzc_yslx = value;
            this.props.form.setFieldsValue({ ldzc_yslx: value });
        } else if (changeField == "ldzc_yszk_nc") {
            ldzc_yszk_nc = value;
            this.props.form.setFieldsValue({ ldzc_yszk_nc: value });
        } else if (changeField == "ldzc_yszk") {
            ldzc_yszk = value;
            this.props.form.setFieldsValue({ ldzc_yszk: value });
        } else if (changeField == "ldzc_qtldzc_nc") {
            ldzc_qtldzc_nc = value;
            this.props.form.setFieldsValue({ ldzc_qtldzc_nc: value });
        } else if (changeField == "ldzc_qtldzc") {
            ldzc_qtldzc = value;
            this.props.form.setFieldsValue({ ldzc_qtldzc: value });
        } else if (changeField == "ldzc_hj_nc") {
            ldzc_hj_nc = value;
            this.props.form.setFieldsValue({ ldzc_hj_nc: value });
        } else if (changeField == "ldzc_hj") {
            ldzc_hj = value;
            this.props.form.setFieldsValue({ ldzc_hj: value });
        } else if (changeField == "gdzc_yj_nc") {
            gdzc_yj_nc = value;
            this.props.form.setFieldsValue({ gdzc_yj_nc: value });
        } else if (changeField == "gdzc_yj") {
            gdzc_yj = value;
            this.props.form.setFieldsValue({ gdzc_yj: value });
        } else if (changeField == "gdzc_ljzj_nc") {
            gdzc_ljzj_nc = value;
            this.props.form.setFieldsValue({ gdzc_ljzj_nc: value });
        } else if (changeField == "gdzc_ljzj") {
            gdzc_ljzj = value;
            this.props.form.setFieldsValue({ gdzc_ljzj: value });
        } else if (changeField == "gdzc_jz_nc") {
            gdzc_jz_nc = value;
            this.props.form.setFieldsValue({ gdzc_jz_nc: value });
        } else if (changeField == "gdzc_jz") {
            gdzc_jz = value;
            this.props.form.setFieldsValue({ gdzc_jz: value });
        } else if (changeField == "gdzc_jzzb_nc") {
            gdzc_jzzb_nc = value;
            this.props.form.setFieldsValue({ gdzc_jzzb_nc: value });
        } else if (changeField == "gdzc_jzzb") {
            gdzc_jzzb = value;
            this.props.form.setFieldsValue({ gdzc_jzzb: value });
        } else if (changeField == "gdzc_je_nc") {
            gdzc_je_nc = value;
            this.props.form.setFieldsValue({ gdzc_je_nc: value });
        } else if (changeField == "gdzc_je") {
            gdzc_je = value;
            this.props.form.setFieldsValue({ gdzc_je: value });
        } else if (changeField == "gdzc_gcwz_nc") {
            gdzc_gcwz_nc = value;
            this.props.form.setFieldsValue({ gdzc_gcwz_nc: value });
        } else if (changeField == "gdzc_gcwz") {
            gdzc_gcwz = value;
            this.props.form.setFieldsValue({ gdzc_gcwz: value });
        } else if (changeField == "gdzc_zjgc_nc") {
            gdzc_zjgc_nc = value;
            this.props.form.setFieldsValue({ gdzc_zjgc_nc: value });
        } else if (changeField == "gdzc_zjgc") {
            gdzc_zjgc = value;
            this.props.form.setFieldsValue({ gdzc_zjgc: value });
        } else if (changeField == "gdzc_ql_nc") {
            gdzc_ql_nc = value;
            this.props.form.setFieldsValue({ gdzc_ql_nc: value });
        } else if (changeField == "gdzc_ql") {
            gdzc_ql = value;
            this.props.form.setFieldsValue({ gdzc_ql: value });
        } else if (changeField == "gdzc_hj_nc") {
            gdzc_hj_nc = value;
            this.props.form.setFieldsValue({ gdzc_hj_nc: value });
        } else if (changeField == "gdzc_hj") {
            gdzc_hj = value;
            this.props.form.setFieldsValue({ gdzc_hj: value });
        } else if (changeField == "wxqt_wxzc_nc") {
            wxqt_wxzc_nc = value;
            this.props.form.setFieldsValue({ wxqt_wxzc_nc: value });
        } else if (changeField == "wxqt_wxzc") {
            wxqt_wxzc = value;
            this.props.form.setFieldsValue({ wxqt_wxzc: value });
        } else if (changeField == "wxqt_cqdt_nc") {
            wxqt_cqdt_nc = value;
            this.props.form.setFieldsValue({ wxqt_cqdt_nc: value });
        } else if (changeField == "wxqt_cqdt") {
            wxqt_cqdt = value;
            this.props.form.setFieldsValue({ wxqt_cqdt: value });
        } else if (changeField == "wxqt_qtcq_nc") {
            wxqt_qtcq_nc = value;
            this.props.form.setFieldsValue({ wxqt_qtcq_nc: value });
        } else if (changeField == "wxqt_qtcq") {
            wxqt_qtcq = value;
            this.props.form.setFieldsValue({ wxqt_qtcq: value });
        } else if (changeField == "wxqt_hj_nc") {
            wxqt_hj = value;
            this.props.form.setFieldsValue({ wxqt_hj_nc: value });
        } else if (changeField == "wxqt_hj") {
            wxqt_hj = value;
            this.props.form.setFieldsValue({ wxqt_hj: value });
        } else if (changeField == "dysx_dyskdx_nc") {
            dysx_dyskdx_nc = value;
            this.props.form.setFieldsValue({ dysx_dyskdx_nc: value });
        } else if (changeField == "dysx_dyskdx") {
            dysx_dyskdx = value;
            this.props.form.setFieldsValue({ dysx_dyskdx: value });
        } else if (changeField == "zczj_nc") {
            zczj_nc = value;
            this.props.form.setFieldsValue({ zczj_nc: value });
        } else if (changeField == "zczj") {
            zczj = value;
            this.props.form.setFieldsValue({ zczj: value });
        } else if (changeField == "ldfz_yfpj_nc") {
            ldfz_yfpj_nc = value;
            this.props.form.setFieldsValue({ ldfz_yfpj_nc: value });
        } else if (changeField == "ldfz_yfpj") {
            ldfz_yfpj = value;
            this.props.form.setFieldsValue({ ldfz_yfpj: value });
        } else if (changeField == "ldfz_yszk_nc") {
            ldfz_yszk_nc = value;
            this.props.form.setFieldsValue({ ldfz_yszk_nc: value });
        } else if (changeField == "ldfz_yszk") {
            ldfz_yszk = value;
            this.props.form.setFieldsValue({ ldfz_yszk: value });
        } else if (changeField == "ldfz_yfgz_nc") {
            ldfz_yfgz_nc = value;
            this.props.form.setFieldsValue({ ldfz_yfgz_nc: value });
        } else if (changeField == "ldfz_yfgz") {
            ldfz_yfgz = value;
            this.props.form.setFieldsValue({ ldfz_yfgz: value });
        } else if (changeField == "ldfz_yffl_nc") {
            ldfz_yffl_nc = value;
            this.props.form.setFieldsValue({ ldfz_yffl_nc: value });
        } else if (changeField == "ldfz_yffl") {
            ldfz_yffl = value;
            this.props.form.setFieldsValue({ ldfz_yffl: value });
        } else if (changeField == "ldfz_yfgl_nc") {
            ldfz_yfgl_nc = value;
            this.props.form.setFieldsValue({ ldfz_yfgl_nc: value });
        } else if (changeField == "ldfz_yfgl") {
            ldfz_yfgl = value;
            this.props.form.setFieldsValue({ ldfz_yfgl: value });
        } else if (changeField == "ldfz_yjsj_nc") {
            ldfz_yjsj_nc = value;
            this.props.form.setFieldsValue({ ldfz_yjsj_nc: value });
        } else if (changeField == "ldfz_yjsj") {
            ldfz_yjsj = value;
            this.props.form.setFieldsValue({ ldfz_yjsj: value });
        } else if (changeField == "ldfz_qtyj_nc") {
            ldfz_qtyj_nc = value;
            this.props.form.setFieldsValue({ ldfz_qtyj_nc: value });
        } else if (changeField == "ldfz_qtyj") {
            ldfz_qtyj = value;
            this.props.form.setFieldsValue({ ldfz_qtyj: value });
        } else if (changeField == "ldfz_qtyf_nc") {
            ldfz_qtyf_nc = value;
            this.props.form.setFieldsValue({ ldfz_qtyf_nc: value });
        } else if (changeField == "ldfz_qtyf") {
            ldfz_qtyf = value;
            this.props.form.setFieldsValue({ ldfz_qtyf: value });
        } else if (changeField == "ldfz_ytfy_nc") {
            ldfz_ytfy_nc = value;
            this.props.form.setFieldsValue({ ldfz_ytfy_nc: value });
        } else if (changeField == "ldfz_ytfy") {
            ldfz_ytfy = value;
            this.props.form.setFieldsValue({ ldfz_ytfy: value });
        } else if (changeField == "ldfz_yjfz_nc") {
            ldfz_yjfz_nc = value;
            this.props.form.setFieldsValue({ ldfz_yjfz_nc: value });
        } else if (changeField == "ldfz_yjfz") {
            ldfz_yjfz = value;
            this.props.form.setFieldsValue({ ldfz_yjfz: value });
        } else if (changeField == "ldfz_dqfz_nc") {
            ldfz_dqfz_nc = value;
            this.props.form.setFieldsValue({ ldfz_dqfz_nc: value });
        } else if (changeField == "ldfz_dqfz") {
            ldfz_dqfz = value;
            this.props.form.setFieldsValue({ ldfz_dqfz: value });
        } else if (changeField == "ldfz_qtfz_nc") {
            ldfz_qtfz_nc = value;
            this.props.form.setFieldsValue({ ldfz_qtfz_nc: value });
        } else if (changeField == "ldfz_qtfz") {
            ldfz_qtfz = value;
            this.props.form.setFieldsValue({ ldfz_qtfz: value });
        } else if (changeField == "ldfz_hj_nc") {
            ldfz_hj_nc = value;
            this.props.form.setFieldsValue({ ldfz_hj_nc: value });
        } else if (changeField == "ldfz_hj") {
            ldfz_hj = value;
            this.props.form.setFieldsValue({ ldfz_hj: value });
        } else if (changeField == "cqfz_cqjk_nc") {
            cqfz_cqjk_nc = value;
            this.props.form.setFieldsValue({ cqfz_cqjk_nc: value });
        } else if (changeField == "cqfz_cqjk") {
            cqfz_cqjk = value;
            this.props.form.setFieldsValue({ cqfz_cqjk: value });
        } else if (changeField == "cqfz_yfzq_nc") {
            cqfz_yfzq_nc = value;
            this.props.form.setFieldsValue({ cqfz_yfzq_nc: value });
        } else if (changeField == "cqfz_yfzq") {
            cqfz_yfzq = value;
            this.props.form.setFieldsValue({ cqfz_yfzq: value });
        } else if (changeField == "cqfz_cqyf_nc") {
            cqfz_cqyf_nc = value;
            this.props.form.setFieldsValue({ cqfz_cqyf_nc: value });
        } else if (changeField == "cqfz_cqyf") {
            cqfz_cqyf = value;
            this.props.form.setFieldsValue({ cqfz_cqyf: value });
        } else if (changeField == "cqfz_zxyf_nc") {
            cqfz_zxyf_nc = value;
            this.props.form.setFieldsValue({ cqfz_zxyf_nc: value });
        } else if (changeField == "cqfz_zxyf") {
            cqfz_zxyf = value;
            this.props.form.setFieldsValue({ cqfz_zxyf: value });
        } else if (changeField == "cqfz_zyfxjj_nc") {
            cqfz_zyfxjj_nc = value;
            this.props.form.setFieldsValue({ cqfz_zyfxjj_nc: value });
        } else if (changeField == "cqfz_zyfxjj") {
            cqfz_zyfxjj = value;
            this.props.form.setFieldsValue({ cqfz_zyfxjj: value });
        } else if (changeField == "cqfz_qtfz_nc") {
            cqfz_qtfz_nc = value;
            this.props.form.setFieldsValue({ cqfz_qtfz_nc: value });
        } else if (changeField == "cqfz_qtfz") {
            cqfz_qtfz = value;
            this.props.form.setFieldsValue({ cqfz_qtfz: value });
        } else if (changeField == "dysx_dyskdx_nc") {
            dysx_dyskdx_nc = value;
            this.props.form.setFieldsValue({ dysx_dyskdx_nc: value });
        } else if (changeField == "dysx_dyskdx") {
            dysx_dyskdx = value;
            this.props.form.setFieldsValue({ dysx_dyskdx: value });
        } else if (changeField == "dysx_fzhj_nc") {
            dysx_fzhj_nc = value;
            this.props.form.setFieldsValue({ dysx_fzhj_nc: value });
        } else if (changeField == "dysx_fzhj") {
            dysx_fzhj = value;
            this.props.form.setFieldsValue({ dysx_fzhj: value });
        } else if (changeField == "syzqy_sszb_nc") {
            syzqy_sszb_nc = value;
            this.props.form.setFieldsValue({ syzqy_sszb_nc: value });
        } else if (changeField == "syzqy_sszb") {
            syzqy_sszb = value;
            this.props.form.setFieldsValue({ syzqy_sszb: value });
        } else if (changeField == "syzqy_yhtz_nc") {
            syzqy_yhtz_nc = value;
            this.props.form.setFieldsValue({ syzqy_yhtz_nc: value });
        } else if (changeField == "syzqy_yhtz") {
            syzqy_yhtz = value;
            this.props.form.setFieldsValue({ syzqy_yhtz: value });
        } else if (changeField == "syzqy_sszbje_nc") {
            syzqy_sszbje_nc = value;
            this.props.form.setFieldsValue({ syzqy_sszbje_nc: value });
        } else if (changeField == "syzqy_sszbje") {
            syzqy_sszbje = value;
            this.props.form.setFieldsValue({ syzqy_sszbje: value });
        } else if (changeField == "syzqy_zbgj_nc") {
            syzqy_zbgj_nc = value;
            this.props.form.setFieldsValue({ syzqy_zbgj_nc: value });
        } else if (changeField == "syzqy_zbgj") {
            syzqy_zbgj = value;
            this.props.form.setFieldsValue({ syzqy_zbgj: value });
        } else if (changeField == "syzqy_yygj_nc") {
            syzqy_yygj_nc = value;
            this.props.form.setFieldsValue({ syzqy_yygj_nc: value });
        } else if (changeField == "syzqy_yygj") {
            syzqy_yygj = value;
            this.props.form.setFieldsValue({ syzqy_yygj: value });
        } else if (changeField == "syzqy_wfplr_nc") {
            syzqy_wfplr_nc = value;
            this.props.form.setFieldsValue({ syzqy_wfplr_nc: value });
        } else if (changeField == "syzqy_wfplr") {
            syzqy_wfplr = value;
            this.props.form.setFieldsValue({ syzqy_wfplr: value });
        } else if (changeField == "syzqy_hj_nc") {
            syzqy_hj_nc = value;
            this.props.form.setFieldsValue({ syzqy_hj_nc: value });
        } else if (changeField == "syzqy_hj") {
            syzqy_hj = value;
            this.props.form.setFieldsValue({ syzqy_hj: value });
        } else if (changeField == "fzsyzqy_hj_nc") {
            fzsyzqy_hj_nc = value;
            this.props.form.setFieldsValue({ fzsyzqy_hj_nc: value });
        } else if (changeField == "fzsyzqy_hj") {
            fzsyzqy_hj = value;
            this.props.form.setFieldsValue({ fzsyzqy_hj: value });
        }


        //========================================
        //1.统计14=1+2+3+...+13
        ldzc_hj_nc = parseFloat(ldzc_hbzj_nc) + parseFloat(ldzc_dqtz_nc) + parseFloat(ldzc_yspj_nc)
            + parseFloat(ldzc_ysgl_nc) + parseFloat(ldzc_yslx_nc) + parseFloat(ldzc_yszk_nc) + parseFloat(ldzc_qtys_nc)
            + parseFloat(ldzc_yfzk_nc) + parseFloat(ldzc_ysbt_nc) + parseFloat(ldzc_ch_nc) + parseFloat(ldzc_dtfy_nc)
            + parseFloat(ldzc_dqzj_nc) + parseFloat(ldzc_qtldzc_nc);
        this.props.form.setFieldsValue({ ldzc_hj_nc: ldzc_hj_nc });

        ldzc_hj = parseFloat(ldzc_hbzj) + parseFloat(ldzc_dqtz) + parseFloat(ldzc_yspj)
            + parseFloat(ldzc_ysgl) + parseFloat(ldzc_yslx) + parseFloat(ldzc_yszk) + parseFloat(ldzc_qtys)
            + parseFloat(ldzc_yfzk) + parseFloat(ldzc_ysbt) + parseFloat(ldzc_ch) + parseFloat(ldzc_dtfy)
            + parseFloat(ldzc_dqzj) + parseFloat(ldzc_qtldzc);
        this.props.form.setFieldsValue({ ldzc_hj: ldzc_hj });
        //2.统计15+16=17

        cqtz_hj_nc = parseFloat(cqtz_gq_nc) + parseFloat(cqtz_zq_nc);

        this.props.form.setFieldsValue({ cqtz_hj_nc: cqtz_hj_nc });

        cqtz_hj = parseFloat(cqtz_gq) + parseFloat(cqtz_zq);

        this.props.form.setFieldsValue({ cqtz_hj: cqtz_hj });

        //3.统计18-19=20

        gdzc_jz_nc = parseFloat(gdzc_yj_nc) - parseFloat(gdzc_ljzj_nc);
        console.log("gdzc_jz_nc:" + gdzc_jz_nc);
        this.props.form.setFieldsValue({ gdzc_jz_nc: gdzc_jz_nc });
        console.log("gdzc_jz_nc2:" + this.props.form.getFieldValue("gdzc_jz_nc"));
        gdzc_jz = gdzc_yj - gdzc_ljzj;

        this.props.form.setFieldsValue({ gdzc_jz: gdzc_jz });
        console.log("gdzc_jz_nc3:" + this.props.form.getFieldValue("gdzc_jz_nc"));
        //4.统计20-21=22

        gdzc_je_nc = parseFloat(gdzc_jz_nc) - parseFloat(gdzc_jzzb_nc);

        this.props.form.setFieldsValue({ gdzc_je_nc: gdzc_je_nc });

        gdzc_je = parseFloat(gdzc_jz) - parseFloat(gdzc_jzzb);

        this.props.form.setFieldsValue({ gdzc_je: gdzc_je });

        //5.统计22+23+24+25=26

        gdzc_hj_nc = parseFloat(gdzc_je_nc) + parseFloat(gdzc_gcwz_nc) + parseFloat(gdzc_zjgc_nc) + parseFloat(gdzc_ql_nc);

        this.props.form.setFieldsValue({ gdzc_hj_nc: gdzc_hj_nc });


        gdzc_hj = parseFloat(gdzc_je) + parseFloat(gdzc_gcwz) + parseFloat(gdzc_zjgc) + parseFloat(gdzc_ql);

        this.props.form.setFieldsValue({ gdzc_hj: gdzc_hj });
        //6.统计27+28+29=30

        wxqt_hj_nc = parseFloat(wxqt_wxzc_nc) + parseFloat(wxqt_cqdt_nc) + parseFloat(wxqt_qtcq_nc);

        this.props.form.setFieldsValue({ wxqt_hj_nc: wxqt_hj_nc });


        wxqt_hj = parseFloat(wxqt_wxzc) + parseFloat(wxqt_cqdt) + parseFloat(wxqt_qtcq);

        this.props.form.setFieldsValue({ wxqt_hj: wxqt_hj });

        //7.统计14+17+26+30+31=32

        zczj_nc = parseFloat(ldzc_hj_nc) + parseFloat(gdzc_hj_nc) + parseFloat(wxqt_hj_nc) +
            parseFloat(cqtz_hj_nc) + parseFloat(ydsx_skjx_nc);
        this.props.form.setFieldsValue({ zczj_nc: zczj_nc });


        zczj = parseFloat(ldzc_hj) + parseFloat(gdzc_hj) + parseFloat(wxqt_hj) +
            parseFloat(cqtz_hj) + parseFloat(ydsx_skjx);
        this.props.form.setFieldsValue({ zczj: zczj });


        //8.统计33+...46=47

        ldfz_hj_nc = parseFloat(ldfz_dqjk_nc) + parseFloat(ldfz_yfpj_nc) + parseFloat(ldfz_yfzk_nc)
            + parseFloat(ldfz_yszk_nc) + parseFloat(ldfz_yfgz_nc)
            + parseFloat(ldfz_yffl_nc) + parseFloat(ldfz_yfgl_nc) +
            parseFloat(ldfz_yjsj_nc) + parseFloat(ldfz_qtyj_nc) +
            parseFloat(ldfz_qtyf_nc) + parseFloat(ldfz_ytfy_nc)
            + parseFloat(ldfz_yjfz_nc) + parseFloat(ldfz_dqfz_nc) + parseFloat(ldfz_qtfz_nc);
        this.props.form.setFieldsValue({ ldfz_hj_nc: ldfz_hj_nc });



        ldfz_hj = parseFloat(ldfz_dqjk) + parseFloat(ldfz_yfpj) + parseFloat(ldfz_yfzk)
            + parseFloat(ldfz_yszk) + parseFloat(ldfz_yfgz)
            + parseFloat(ldfz_yffl) + parseFloat(ldfz_yfgl)
            + parseFloat(ldfz_yjsj) + parseFloat(ldfz_qtyj)
            + parseFloat(ldfz_qtyf) + parseFloat(ldfz_ytfy)
            + parseFloat(ldfz_yjfz) + parseFloat(ldfz_dqfz)
            + parseFloat(ldfz_qtfz);
        this.props.form.setFieldsValue({ ldfz_hj: ldfz_hj });

        //9.统计48+...+53=54


        cqfz_hj_nc = parseFloat(cqfz_cqjk_nc) + parseFloat(cqfz_yfzq_nc)
            + parseFloat(cqfz_cqyf_nc) + parseFloat(cqfz_zxyf_nc) + parseFloat(cqfz_zyfxjj_nc) + parseFloat(cqfz_qtfz_nc);

        this.props.form.setFieldsValue({ cqfz_hj_nc: cqfz_hj_nc });



        cqfz_hj = parseFloat(cqfz_cqjk) + parseFloat(cqfz_yfzq)
            + parseFloat(cqfz_cqyf) + parseFloat(cqfz_zxyf) + parseFloat(cqfz_zyfxjj) + parseFloat(cqfz_qtfz);

        this.props.form.setFieldsValue({ cqfz_hj: cqfz_hj });

        //10.统计47+54+55=56

        dysx_fzhj_nc = parseFloat(ldfz_hj_nc) + parseFloat(cqfz_hj_nc) + parseFloat(dysx_dyskdx_nc);

        this.props.form.setFieldsValue({ dysx_fzhj_nc: dysx_fzhj_nc });


        dysx_fzhj = parseFloat(ldfz_hj) + parseFloat(cqfz_hj) + parseFloat(dysx_dyskdx);

        this.props.form.setFieldsValue({ dysx_fzhj: dysx_fzhj });

        //11.统计57-58=59

        syzqy_sszbje_nc = parseFloat(syzqy_sszb_nc) - parseFloat(syzqy_yhtz_nc);
        this.props.form.setFieldsValue({ syzqy_sszbje_nc: syzqy_sszbje_nc });



        syzqy_sszbje = parseFloat(syzqy_sszb) - parseFloat(syzqy_yhtz);
        this.props.form.setFieldsValue({ syzqy_sszbje: syzqy_sszbje });


        //12.统计59+...+62=63

        syzqy_hj_nc = parseFloat(syzqy_sszbje_nc) + parseFloat(syzqy_zbgj_nc)
            + parseFloat(syzqy_yygj_nc) + parseFloat(syzqy_wfplr_nc);

        this.props.form.setFieldsValue({ syzqy_hj_nc: syzqy_hj_nc });


        syzqy_hj = parseFloat(syzqy_sszbje) + parseFloat(syzqy_zbgj)
            + parseFloat(syzqy_yygj) + parseFloat(syzqy_wfplr);

        this.props.form.setFieldsValue({ syzqy_hj: syzqy_hj });

        //13.统计56+63=64
        fzsyzqy_hj_nc = parseFloat(dysx_fzhj_nc) + parseFloat(syzqy_hj_nc);
        this.props.form.setFieldsValue({ fzsyzqy_hj_nc: fzsyzqy_hj_nc });

        console.log(parseFloat(dysx_fzhj) + ";" + parseFloat(syzqy_hj));
        fzsyzqy_hj = parseFloat(dysx_fzhj) + parseFloat(syzqy_hj);

        this.props.form.setFieldsValue({ fzsyzqy_hj: fzsyzqy_hj });

        console.log("gdzc_jz_nc4:" + this.props.form.getFieldValue("gdzc_jz_nc"));














    },


    render() {

        //定义提示内容
        let helper = [];
        helper.push(<p key="helper-0">详细说明：</p>);
        helper.push(<p key="helper-1">《资产负债表》反映事务所全部资产、负债和所有者权益的情况。增设的三个一级会计科目：“低值易耗品”（1231）、“物料用品”（1242）、“库存商品”（1243）之和填入本表“存货栏”。</p>);
        helper.push(<p key="helper-2">各栏关系：</p>);
        helper.push(<p key="helper-3">【14行+17行+26行+30行+31行=32行】【1行+...+13行=14行】【15行+16行=17行】【18行-19行=20行】【20行-21行=22行】【22行+23行+24行+25行=26行】【27行+28行+29行=30行】【47行+54行+55行=56行】
            【56行+63行=64行】【33行+...+46行=47行】【57行-58行=59行】【48行+...+53行=54行】【59行+...+62行=63行】【64行=32行】</p>);




        //定义工具栏内容
        let toolbar = <ToolBar>
            <ButtonGroup>
                <Button onClick={this.props.toback}>返回<Icon className="toggle-tip" type="arrow-left" /></Button>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question" /></Button>
            </ButtonGroup>
        </ToolBar>;
        let nd = new Date().getFullYear() + "";
        let xz = "0";
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const year = new Date().getFullYear() + "";
        let obj = [{}];
        if (this.props.data.length != 0) {
            obj = this.props.data;
        };

        return <div className="add">
            {this.state.helper && <Alert message="资产负债表检索查询帮助"
                description={helper}
                type="info"
                closable
                onClose={this.handleHelperClose} />}
            <Panel title="添加资产负债" toolbar={toolbar}>
                <div className="fix-table table-bordered table-striped" >
                    <Spin spinning={this.state.loading} tip="数据校验中。。。" >

                        <div className="fix-table table-bordered table-striped" >
                            <Form horizontal onSubmit={this.handleSubmit}>
                                <table>
                                    <colgroup>
                                        <col className="col-4"></col>
                                        <col className="col-2"></col>
                                        <col className="col-3"></col>
                                        <col className="col-3"></col>
                                        <col className="col-4"></col>
                                        <col className="col-2"></col>
                                        <col className="col-3"></col>
                                        <col className="col-3"></col>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">单位： {obj[0].DWMC}</td>

                                            <td colSpan="3">

                                            </td>


                                            <td width="11%">  <Col
                                                label="年度：">
                                                <FormItem>    <SelectorYear  { ...getFieldProps('nd', {
                                                    initialValue: nd, rules: [{
                                                        require: true,
                                                        message: '选择一个年度做自检',
                                                    }, {
                                                        validator: this.checkNdIfExit,
                                                    }]
                                                }) } /></FormItem>
                                            </Col>
                                            </td>

                                            <td > <Col>
                                                <FormItem>      <SelectorXZ   { ...getFieldProps('timevalue', {
                                                    initialValue: xz, rules: [{
                                                        require: true,
                                                        message: '',
                                                    }, {
                                                        validator: this.checkTimevalueIfExit,
                                                    }]
                                                }) } /></FormItem>
                                            </Col>
                                            </td>

                                            <td>单位：元</td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: 'center' }} >资产</td>
                                            <td>行次</td>
                                            <td > 年初数</td>
                                            <td > 年末数</td>
                                            <td style={{ textAlign: 'center' }} >负债及所有者权益（或股东权益）</td>
                                            <td  >行次</td>
                                            <td > 年初数</td>
                                            <td > 年末数</td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >流动资产：</td>
                                            <td></td>
                                            <td > </td>
                                            <td > </td>
                                            <td style={{ textAlign: 'center' }} >流动负债：</td>
                                            <td></td>
                                            <td ></td>
                                            <td > </td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >货币资金</td>
                                            <td>1</td>
                                            <td ><Input id='ldzc_hbzj_nc' type='Number'  {...getFieldProps('ldzc_hbzj_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_hbzj' type='Number' {...getFieldProps('ldzc_hbzj') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >短期借款</td>
                                            <td>33</td>
                                            <td ><Input id='ldfz_dqjk_nc' type='Number'  {...getFieldProps('ldfz_dqjk_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_dqjk' type='Number'  {...getFieldProps('ldfz_dqjk') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >短期投资</td>
                                            <td>2</td>
                                            <td ><Input id='ldzc_dqtz_nc' type='Number'  {...getFieldProps('ldzc_dqtz_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_dqtz' type='Number'  {...getFieldProps('ldzc_dqtz') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >应付票据</td>
                                            <td>34</td>
                                            <td ><Input id='ldfz_yfpj_nc' type='Number' {...getFieldProps('ldfz_yfpj_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_yfpj' type='Number' {...getFieldProps('ldfz_yfpj') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >应收票据</td>
                                            <td>3</td>
                                            <td ><Input id='ldzc_yspj_nc' type='Number' {...getFieldProps('ldzc_yspj_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_yspj' type='Number'  {...getFieldProps('ldzc_yspj') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >应付账款</td>
                                            <td>35</td>
                                            <td ><Input id='ldfz_yfzk_nc' type='Number' {...getFieldProps('ldfz_yfzk_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_yfzk' type='Number' {...getFieldProps('ldfz_yfzk') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >应收股利</td>
                                            <td>4</td>
                                            <td ><Input id='ldzc_ysgl_nc' type='Number' {...getFieldProps('ldzc_ysgl_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_ysgl' type='Number' {...getFieldProps('ldzc_ysgl') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >预收账款</td>
                                            <td>36</td>
                                            <td ><Input id='ldfz_yszk_nc' type='Number' {...getFieldProps('ldfz_yszk_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_yszk' type='Number' {...getFieldProps('ldfz_yszk') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >应收利息</td>
                                            <td>5</td>
                                            <td ><Input id='ldzc_yslx_nc' type='Number'  {...getFieldProps('ldzc_yslx_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_yslx' type='Number' {...getFieldProps('ldzc_yslx') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >应付工资</td>
                                            <td>37</td>
                                            <td ><Input id='ldfz_yfgz_nc' type='Number' {...getFieldProps('ldfz_yfgz_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_yfgz' type='Number' {...getFieldProps('ldfz_yfgz') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >应收账款</td>
                                            <td>6</td>
                                            <td ><Input id='ldzc_yszk_nc' type='Number' {...getFieldProps('ldzc_yszk_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_yszk' type='Number' {...getFieldProps('ldzc_yszk') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >应付福利费</td>
                                            <td>38</td>
                                            <td ><Input id='ldfz_yffl_nc' type='Number' {...getFieldProps('ldfz_yffl_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_yffl' type='Number' {...getFieldProps('ldfz_yffl') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >其他应收款</td>
                                            <td>7</td>
                                            <td ><Input id='ldzc_qtys_nc' type='Number'  {...getFieldProps('ldzc_qtys_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_qtys' type='Number'  {...getFieldProps('ldzc_qtys') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >应付股利</td>
                                            <td>39</td>
                                            <td ><Input id='ldfz_yfgl_nc' type='Number'  {...getFieldProps('ldfz_yfgl_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_yfgl' type='Number'  {...getFieldProps('ldfz_yfgl') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >预付账款</td>
                                            <td>8</td>
                                            <td ><Input id='ldzc_yfzk_nc' type='Number'  {...getFieldProps('ldzc_yfzk_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_yfzk' type='Number' {...getFieldProps('ldzc_yfzk') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >应交税金</td>
                                            <td>40</td>
                                            <td ><Input id='ldfz_yjsj_nc' type='Number' {...getFieldProps('ldfz_yjsj_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_yjsj' type='Number' {...getFieldProps('ldfz_yjsj') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >应收补贴款</td>
                                            <td>9</td>
                                            <td ><Input id='ldzc_ysbt_nc' type='Number'  {...getFieldProps('ldzc_ysbt_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_ysbt' type='Number' {...getFieldProps('ldzc_ysbt') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >其他应交款</td>
                                            <td>41</td>
                                            <td ><Input id='ldfz_qtyj_nc' type='Number'  {...getFieldProps('ldfz_qtyj_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_qtyj' type='Number' {...getFieldProps('ldfz_qtyj') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >存货</td>
                                            <td>10</td>
                                            <td ><Input id='ldzc_ch_nc' type='Number'  {...getFieldProps('ldzc_ch_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_ch' type='Number'  {...getFieldProps('ldzc_ch') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >其他应付款</td>
                                            <td>42</td>
                                            <td ><Input id='ldfz_qtyf_nc' type='Number' {...getFieldProps('ldfz_qtyf_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_qtyf' type='Number'  {...getFieldProps('ldfz_qtyf') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >待摊费用</td>
                                            <td>11</td>
                                            <td ><Input id='ldzc_dtfy_nc' type='Number'  {...getFieldProps('ldzc_dtfy_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_dtfy' type='Number' {...getFieldProps('ldzc_dtfy') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >预提费用</td>
                                            <td>43</td>
                                            <td ><Input id='ldfz_ytfy_nc' type='Number'  {...getFieldProps('ldfz_ytfy_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_ytfy' type='Number'  {...getFieldProps('ldfz_ytfy') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >一年内到期的长期债券投资</td>
                                            <td>12</td>
                                            <td ><Input id='ldzc_dqzj_nc' type='Number'  {...getFieldProps('ldzc_dqzj_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_dqzj' type='Number'  {...getFieldProps('ldzc_dqzj') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >预计负债</td>
                                            <td>44</td>
                                            <td ><Input id='ldfz_yjfz_nc' type='Number'  {...getFieldProps('ldfz_yjfz_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_yjfz' type='Number'  {...getFieldProps('ldfz_yjfz') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >其他流动资产</td>
                                            <td>13</td>
                                            <td ><Input id='ldzc_qtldzc_nc' type='Number' {...getFieldProps('ldzc_qtldzc_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ldzc_qtldzc' type='Number'{...getFieldProps('ldzc_qtldzc') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >一年内到期的长期负债</td>
                                            <td>45</td>
                                            <td ><Input id='ldfz_dqfz_nc' type='Number'  {...getFieldProps('ldfz_dqfz_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_dqfz' type='Number' {...getFieldProps('ldfz_dqfz') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >流动资产合计</td>
                                            <td>14</td>
                                            <td ><Input id='ldzc_hj_nc' type='Number' {...getFieldProps('ldzc_hj_nc') } disabled /> </td>
                                            <td ><Input id='ldzc_hj' type='Number' {...getFieldProps('ldzc_hj') } disabled /> </td>
                                            <td style={{ textAlign: 'center' }} >其他流动负债</td>
                                            <td>46</td>
                                            <td ><Input id='ldfz_qtfz_nc' type='Number' {...getFieldProps('ldfz_qtfz_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='ldfz_qtfz' type='Number' {...getFieldProps('ldfz_qtfz') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >长期投资: </td>
                                            <td colSpan="7"></td>

                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >长期股权投资</td>
                                            <td>15</td>
                                            <td ><Input id='cqtz_gq_nc' type='Number' {...getFieldProps('cqtz_gq_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='cqtz_gq' type='Number' {...getFieldProps('cqtz_gq') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >流动负债合计</td>
                                            <td>47</td>
                                            <td ><Input id='ldfz_hj_nc' type='Number'  {...getFieldProps('ldfz_hj_nc') } disabled /></td>
                                            <td ><Input id='ldfz_hj' type='Number' {...getFieldProps('ldfz_hj') } disabled /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >长期债权投资</td>
                                            <td>16</td>
                                            <td ><Input id='cqtz_zq_nc' type='Number'  {...getFieldProps('cqtz_zq_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='cqtz_zq' type='Number' {...getFieldProps('cqtz_zq') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >长期负债: </td>
                                            <td colSpan="3"></td>

                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >长期投资合计</td>
                                            <td>17</td>
                                            <td ><Input id='cqtz_hj_nc' type='Number'  {...getFieldProps('cqtz_hj_nc') } disabled /> </td>
                                            <td ><Input id='cqtz_hj' type='Number' {...getFieldProps('cqtz_hj') } disabled /> </td>
                                            <td style={{ textAlign: 'center' }} >长期借款</td>
                                            <td>48</td>
                                            <td ><Input id='cqfz_cqjk_nc' type='Number' {...getFieldProps('cqfz_cqjk_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='cqfz_cqjk' type='Number' {...getFieldProps('cqfz_cqjk') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >固定资产: </td>
                                            <td colSpan="3"></td>

                                            <td style={{ textAlign: 'center' }} >应付债券</td>
                                            <td>49</td>
                                            <td ><Input id='cqfz_yfzq_nc' type='Number'  {...getFieldProps('cqfz_yfzq_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='cqfz_yfzq' type='Number' {...getFieldProps('cqfz_yfzq') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >固定资产原价</td>
                                            <td>18</td>
                                            <td ><Input id='gdzc_yj_nc' type='Number' {...getFieldProps('gdzc_yj_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='gdzc_yj' type='Number'{...getFieldProps('gdzc_yj') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >长期应付款</td>
                                            <td>50</td>
                                            <td ><Input id='cqfz_cqyf_nc' type='Number' {...getFieldProps('cqfz_cqyf_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='cqfz_cqyf' type='Number' {...getFieldProps('cqfz_cqyf') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >减：累计折旧</td>
                                            <td>19</td>
                                            <td ><Input id='gdzc_ljzj_nc' type='Number' {...getFieldProps('gdzc_ljzj_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='gdzc_ljzj' type='Number' {...getFieldProps('gdzc_ljzj') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >专项应付款</td>
                                            <td>51</td>
                                            <td ><Input id='cqfz_zxyf_nc' type='Number' {...getFieldProps('cqfz_zxyf_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='cqfz_zxyf' type='Number' {...getFieldProps('cqfz_zxyf') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>

                                            <td colSpan="4"></td>

                                            <td style={{ textAlign: 'center' }} >职业风险基金</td>
                                            <td>52</td>
                                            <td ><Input id='cqfz_zyfxjj_nc' type='Number' {...getFieldProps('cqfz_zyfxjj_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='cqfz_zyfxjj' type='Number' {...getFieldProps('cqfz_zyfxjj') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >固定资产净值</td>
                                            <td>20</td>
                                            <td ><Input id='gdzc_jz_nc' type='Number' {...getFieldProps('gdzc_jz_nc') } disabled /> </td>
                                            <td ><Input id='gdzc_jz' type='Number' {...getFieldProps('gdzc_jz') } disabled /> </td>
                                            <td style={{ textAlign: 'center' }} >其他长期负债</td>
                                            <td>53</td>
                                            <td ><Input id='cqfz_qtfz_nc' type='Number' {...getFieldProps('cqfz_qtfz_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='cqfz_qtfz' type='Number' {...getFieldProps('cqfz_qtfz') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >减：固定资产减值准备</td>
                                            <td>21</td>
                                            <td ><Input id='gdzc_jzzb_nc' type='Number' {...getFieldProps('gdzc_jzzb_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='gdzc_jzzb' type='Number' {...getFieldProps('gdzc_jzzb') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >长期负债合计</td>
                                            <td>54</td>
                                            <td ><Input id='cqfz_hj_nc' type='Number' {...getFieldProps('cqfz_hj_nc') } disabled /></td>
                                            <td ><Input id='cqfz_hj' type='Number' {...getFieldProps('cqfz_hj') } disabled /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >固定资产净额</td>
                                            <td>22</td>
                                            <td ><Input id='gdzc_je_nc' type='Number' {...getFieldProps('gdzc_je_nc') } disabled /> </td>
                                            <td ><Input id='gdzc_je' type='Number' {...getFieldProps('gdzc_je') } disabled /> </td>
                                            <td style={{ textAlign: 'center' }} >递延税项：</td>
                                            <td colSpan="3"></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >工程物资</td>
                                            <td>23</td>
                                            <td ><Input id='gdzc_gcwz_nc' type='Number' {...getFieldProps('gdzc_gcwz_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='gdzc_gcwz' type='Number' {...getFieldProps('gdzc_gcwz') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >递延税款贷项</td>
                                            <td>55</td>
                                            <td ><Input id='dysx_dyskdx_nc' type='Number' {...getFieldProps('dysx_dyskdx_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='dysx_dyskdx' type='Number' {...getFieldProps('dysx_dyskdx') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >在建工程</td>
                                            <td>24</td>
                                            <td ><Input id='gdzc_zjgc_nc' type='Number'  {...getFieldProps('gdzc_zjgc_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='gdzc_zjgc' type='Number' {...getFieldProps('gdzc_zjgc') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >负债合计</td>
                                            <td>56</td>
                                            <td ><Input id='dysx_fzhj_nc' type='Number' {...getFieldProps('dysx_fzhj_nc') } onChange={this.handleInputChange} disabled /></td>
                                            <td ><Input id='dysx_fzhj' type='Number' {...getFieldProps('dysx_fzhj') } onChange={this.handleInputChange} disabled /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >固定资产清理</td>
                                            <td>25</td>
                                            <td ><Input id='gdzc_ql_nc' type='Number' {...getFieldProps('gdzc_ql_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='gdzc_ql' type='Number' {...getFieldProps('gdzc_ql') } onChange={this.handleInputChange} /> </td>

                                            <td colSpan="4"></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >固定资产合计</td>
                                            <td>26</td>
                                            <td ><Input id='gdzc_hj_nc' type='Number' {...getFieldProps('gdzc_hj_nc') } disabled /> </td>
                                            <td ><Input id='gdzc_hj' type='Number' {...getFieldProps('gdzc_hj') } disabled /> </td>
                                            <td style={{ textAlign: 'center' }} >所有者权益（或股东权益）：</td>
                                            <td colSpan="3"></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >无形资产及其他资产：</td>
                                            <td colSpan="3"></td>

                                            <td style={{ textAlign: 'center' }} >实收资本（或股本）</td>
                                            <td>57</td>
                                            <td ><Input id='syzqy_sszb_nc' type='Number' {...getFieldProps('syzqy_sszb_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='syzqy_sszb' type='Number' {...getFieldProps('syzqy_sszb') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >无形资产</td>
                                            <td>27</td>
                                            <td ><Input id='wxqt_wxzc_nc' type='Number' {...getFieldProps('wxqt_wxzc_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='wxqt_wxzc' type='Number' {...getFieldProps('wxqt_wxzc') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >减：已归还投资</td>
                                            <td>58</td>
                                            <td ><Input id='syzqy_yhtz_nc' type='Number' {...getFieldProps('syzqy_yhtz_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='syzqy_yhtz' type='Number' {...getFieldProps('syzqy_yhtz') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >长期待摊费用</td>
                                            <td>28</td>
                                            <td ><Input id='wxqt_cqdt_nc' type='Number' {...getFieldProps('wxqt_cqdt_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='wxqt_cqdt' type='Number' {...getFieldProps('wxqt_cqdt') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >实收资本（股本）净额</td>
                                            <td>59</td>
                                            <td ><Input id='syzqy_sszbje_nc' type='Number'  {...getFieldProps('syzqy_sszbje_nc') } disabled /></td>
                                            <td ><Input id='syzqy_sszbje' type='Number' {...getFieldProps('syzqy_sszbje') } disabled /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >其他长期资产</td>
                                            <td>29</td>
                                            <td ><Input id='wxqt_qtcq_nc' type='Number'  {...getFieldProps('wxqt_qtcq_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='wxqt_qtcq' type='Number' {...getFieldProps('wxqt_qtcq') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >资本公积</td>
                                            <td>60</td>
                                            <td ><Input id='syzqy_zbgj_nc' type='Number' {...getFieldProps('syzqy_zbgj_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='syzqy_zbgj' type='Number' {...getFieldProps('syzqy_zbgj') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >无形资产和其他资产合计</td>
                                            <td>30</td>
                                            <td ><Input id='wxqt_hj_nc' type='Number' {...getFieldProps('wxqt_hj_nc') } disabled /> </td>
                                            <td ><Input id='wxqt_hj' type='Number' {...getFieldProps('wxqt_hj') } disabled /> </td>
                                            <td style={{ textAlign: 'center' }} >盈余公积</td>
                                            <td>61</td>
                                            <td ><Input id='syzqy_yygj_nc' type='Number' {...getFieldProps('syzqy_yygj_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='syzqy_yygj' type='Number' {...getFieldProps('syzqy_yygj') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >递延税项：</td>
                                            <td colSpan="3"></td>

                                            <td style={{ textAlign: 'center' }} >未分配利润</td>
                                            <td>62</td>
                                            <td ><Input id='syzqy_wfplr_nc' type='Number' {...getFieldProps('syzqy_wfplr_nc') } onChange={this.handleInputChange} /></td>
                                            <td ><Input id='syzqy_wfplr' type='Number' {...getFieldProps('syzqy_wfplr') } onChange={this.handleInputChange} /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >递延税款借项</td>
                                            <td>31</td>
                                            <td ><Input id='ydsx_skjx_nc' type='Number' {...getFieldProps('ydsx_skjx_nc') } onChange={this.handleInputChange} /> </td>
                                            <td ><Input id='ydsx_skjx' type='Number' {...getFieldProps('ydsx_skjx') } onChange={this.handleInputChange} /> </td>
                                            <td style={{ textAlign: 'center' }} >所有者权益(或股东权益) 合计</td>
                                            <td>63</td>
                                            <td ><Input id='syzqy_hj_nc' type='Number' {...getFieldProps('syzqy_hj_nc') } onChange={this.handleInputChange} disabled /></td>
                                            <td ><Input id='syzqy_hj' type='Number' {...getFieldProps('syzqy_hj') } onChange={this.handleInputChange} disabled /></td>
                                        </tr>

                                        <tr>
                                            <td style={{ textAlign: 'center' }} >资产总计</td>
                                            <td>32</td>
                                            <td ><Input id='zczj_nc' type='Number'  {...getFieldProps('zczj_nc') } disabled /> </td>
                                            <td ><Input id='zczj' type='Number' {...getFieldProps('zczj') } disabled /> </td>
                                            <td style={{ textAlign: 'center' }} >负债和所有者权益(或股东权益) 合计</td>
                                            <td>64</td>
                                            <td ><Input id='fzsyzqy_hj_nc' type='Number' {...getFieldProps('fzsyzqy_hj_nc') } disabled /></td>
                                            <td ><Input id='fzsyzqy_hj' type='Number' {...getFieldProps('fzsyzqy_hj') } disabled /></td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td style={{ textAlign: 'center' }} >所长：</td>
                                            <td ><Input   {...getFieldProps('sz') } /> </td>
                                            <td style={{ textAlign: 'center' }} >主管会计：</td>
                                            <td ><Input   {...getFieldProps('zgkj') } /></td>
                                            <td style={{ textAlign: 'center' }} >制表人：</td>
                                            <td ><Input   {...getFieldProps('zbr') } /></td>
                                            <td></td>
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
                        </div>



                    </Spin>
                </div>
            </Panel>
        </div>

    }
});
Addzcfzb = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = { value: props.data[prop] }
        }
        return result;
    }
})(Addzcfzb);


module.exports = Addzcfzb
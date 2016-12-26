import React from 'react'
import {Modal,  Col, Row, Button, Input,notification} from 'antd'
import req from 'reqwest'
import auth from 'common/auth'

let modal = React.createClass({
    getInitialState(){
        return {
            loading: false
        }
    },
    handlePass(){
        const token = auth.getToken();
        const {data,apiUrl,refreshList} = this.props;
        const obj = {
            lx: 3, //操作类型3为提交报备操作
            data: {}
        };
        this.setState({loading: true});
        req({
            url: apiUrl + data.id,
            type: 'json',
            method: 'put',
            contentType: 'application/json',
            data: JSON.stringify(obj),
            headers: {'x-auth-token': token}
        }).then(resp=> {
            refreshList();
            this.setState({loading: false});
            this.props.onClose();
        }).fail(e=> {
            this.setState({loading: false});
            notification.error({
                duration: 3,
                message: '操作失败',
                description: '网络故障，数据无法提交'
            });
            this.props.onClose();
        })
    },

    handleClose(){
        this.props.onClose();
    },
    render(){
        const {visible,data} = this.props;
        const footer = [
            <Button key="cancel" type="ghost" size="large" onClick={this.handleClose}>取消</Button>,
            <Button key="pass" type="primary" size="large" loading={this.state.loading} onClick={this.handlePass}>提交报备</Button>
        ];

        return <Modal
          visible={visible}
          style={{top: '100px'}}
          title="提交业务报备"
          footer={footer}
          onCancel = {this.handleClose}>
            <div className="fix-table no-border">
                <table>
                    <tbody>
                    <tr>
                        <td>报备号码 :</td>
                        <td>{data.bbhm}</td>
                    </tr>
                    <tr>
                        <td>委托企业 :</td>
                        <td>{data.wtdw}</td>
                    </tr>
                    <tr>
                        <td>事务所 :</td>
                        <td>{data.swsmc}</td>
                    </tr>
                    <tr>
                        <td>业务类型 :</td>
                        <td>{data.ywlx}</td>
                    </tr>
                    <tr>
                        <td>报备日期 :</td>
                        <td>{data.bbrq}</td>
                    </tr>
                    <tr>
                        <td>最后修改时间 :</td>
                        <td>{data.zbrq}</td>
                    </tr>
                    <tr>
                        <td>协议金额 :</td>
                        <td>{data.xyje}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
    }
});

module.exports = modal;
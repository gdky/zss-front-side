import React from 'react'
import {Modal,  Col, Row, Button, Input,notification} from 'antd'
import req from 'reqwest'
import config from 'common/configuration'
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
            lx: 11, //操作类型11为同意启用
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
                description: '可能网络访问原因，请稍后尝试'
            });
            this.props.onClose();
        })

    },
    handleReject(){
        const token = auth.getToken();
        const {data,apiUrl,refreshList} = this.props;
        const obj = {
            lx: 12, //操作类型12为拒绝启用
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
                description: '可能网络访问原因，请稍后尝试'
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
            <Button key="reject" size="large" onClick={this.handleReject}>拒绝申请</Button>,
            <Button key="pass" type="primary" size="large" onClick={this.handlePass}>同意申请</Button>
        ];

        return <Modal
          visible={visible}
          style={{top: '100px'}}
          title="处理业务报备重新启用申请"
          footer={footer}
          confirmLoading={this.state.loading}
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
                        <td>协议金额 :</td>
                        <td>{data.xyje}</td>
                    </tr>
                    <tr>
                        <td>申请启用理由 :</td>
                        <td>{data.sqqyly}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
    }
});

module.exports = modal;
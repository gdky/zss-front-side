import React from 'react'
import {Button, Icon, Spin, Modal} from 'antd'
import req from 'common/request'
import config from 'common/configuration'
import {formatDate} from 'common/utils'
import './pxnr.css'
/**
 * 培训课程内容显示组件
 * @props.id String 课程id
 * @props.visible  boolean 组件显示状态控制
 * @props.onClose function(){} 点击关闭时的回调函数
 */
const detail = React.createClass({
    getDefaultProps(){
        return {
            title: '课程详细信息',
            url: config.HOST + config.URI_API_PROJECT + '/pxnr'
        }
    },
    getInitialState(){
        return {
            bt: '',
            pxkssj: '',
            pxjssj: '',
            pxlxr: '',
            pxnr: '',
            zysx: '',
            loading: true,
            loadFail:''
        }
    },
    //退回用户管理界面
    back(){
        this.setState({
            bt: '',
            pxkssj: '',
            pxjssj: '',
            pxlxr: '',
            pxnr: '',
            zysx: '',
            loading: true,
            loadFail:''
        });
        this.props.onClose();
    },
    componentWillReceiveProps(nextProps){
        if (!!nextProps && nextProps.visible == true) {
            const {url, id}  = nextProps;
            req({
                method: 'get',
                url: url + `/${id}`
            }).then(resp => {
                this.setState({
                    bt: resp.bt,
                    pxkssj: resp.pxkssj,
                    pxjssj: resp.pxjssj,
                    pxlxr: resp.pxlxr,
                    pxnr: resp.pxnr,
                    zysx: resp.zysx,
                    loading: false,
                    loadFail:''
                })
            }).catch(e => {
                this.setState({loading: false,loadFail:'数据读取失败'})
            })
        }
    },

    render(){

        const {title, visible} = this.props;
        let {bt, pxkssj, pxjssj, pxlxr, pxnr, zysx, loading,loadFail} = this.state;
        return <Modal title={title}
                      className="pxnr-detail"
                      visible={visible}
                      width="720"
                      onCancel={this.back}
                      footer={false}>
            <Spin spinning={loading}>
                <div className="ct">
                    <div className="c1">
                        <h2 className="c1-1">{bt}</h2>
                        <p className="c1-2">
                            {pxkssj} 至
                            {pxjssj} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            联系人：{pxlxr}
                        </p>
                    </div>
                    {!!loadFail && <div className="load-fail">{loadFail}</div>}
                    <div className="c2" dangerouslySetInnerHTML={{__html: pxnr}}/>
                    <div className="c3" dangerouslySetInnerHTML={{__html: zysx}}/>
                </div>
            </Spin>
        </Modal>
    }
});

module.exports = detail;
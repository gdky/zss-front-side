import React from 'react'
import {Button, Icon, Spin, Modal,Table} from 'antd'
import req from 'common/request'
import config from 'common/configuration'
import {addZero} from 'common/utils'
import Panel from 'component/compPanel'
import Export from 'component/ComExcelExperss';
import auth from 'common/auth'

const tj = React.createClass({
    getDefaultProps(){
        return {
            data: {},
            url: config.HOST + config.URI_API_PROJECT + '/pxxxtjlist'
        }
    },
    getInitialState(){
        return {
            loading: true,
            dataList:[]
        }
    },
    //退回用户管理界面
    back(){
        this.setState({
            loading: true,
        });
        this.props.onClose();
    },
    componentWillReceiveProps(nextProps){
        if (!!nextProps && nextProps.visible == true) {
            const {url,data}  = nextProps;
            req({
                method: 'get',
                url: url + `/${data.pxid}`,
                headers:{'x-auth-token':auth.getToken()}
            }).then(resp => {
                let date= new Date();
                let data=resp;
                for(let key=0;key<data.length;key++){
                    data[key].BH='PX'+date.getFullYear()+(date.getMonth()+1)+addZero(''+key,3);
                }
                this.setState({
                    dataList:data,
                    loading: false,
                })
            }).catch(e => {
                this.setState({loading: false,dataList:[]})
            })
        }
    },

    render(){

        const obj = this.props.data;
        const{ visible} = this.props;
        const columns = [{
                  title: '编号',
                  dataIndex: 'BH',
                  key: 'BH',
                }, {
                  title: '单位名称',
                  dataIndex: 'DWMC',
                  key: 'DWMC',
                }, {
                  title: '姓名',
                  dataIndex: 'XMING',
                  key: 'XMING',
                }, {
                  title: '性别',
                  dataIndex: 'XB',
                  key: 'XB',
                }, {
                  title: '职务',
                  dataIndex: 'ZW',
                  key: 'ZW',
                }, {
                  title: '手机',
                  dataIndex: 'YDDH',
                  key: 'YDDH',
                }, {
                  title: '订房（单/双）',
                  dataIndex: 'DF',
                  key: 'DF',
                }, {
                  title: '入住时间',
                  dataIndex: 'RZSJ',
                  key: 'RZSJ',
                }, {
                  title: '离开时间',
                  dataIndex: 'LKSJ',
                  key: 'LKSJ',
                }, {
                  title: '订餐',
                  dataIndex: 'DCQK',
                  key: 'DCQK',
                }, {
                  title: '备注',
                  dataIndex: 'BZ',
                  key: 'BZ',
                }];
          let exportHead="培训时间：,"+obj.PXKSSJ+' 至 '+obj.PXJSSJ+',\n'+"培训地点：,"+obj.PXDD+',\n'+
                                        "培训地点电话：,"+ obj.PXDDDH+',\n'+"培训联系人：,"+obj.PXLXR+',\n'+
                                        "培训总人数：,"+obj.bmrs+',\n'+
                                        "住宿人数（总数/单）：,"+obj.zszrs+','+obj.drzs+',\n'+"双人房（男）：,"+
                                        obj.srnan+',\n'+"双人房（女）：,"+obj.srnv+',\n'+"订餐人数 (总数/早/午/晚)：,"+
                                        obj.bczrs+','+obj.zcrs+','+obj.wucrs+','+obj.wcrs+',\n'+',\n'+',\n'
        return <Modal 
                      className="pxnr-tj"
                      visible={visible}
                      width="80%"
                      onCancel={this.back}
                      footer={false}>
                <div className="tjt">
                        <h2 className="tj1-1" style={{textAlign:'center',color:'#000000',fontSize:'26px'}}>{obj.BT}统计</h2>
                    <div style={{padding:'20px'}}>
                    <div className="base-table table-bordered table-striped" >
                        <table>
                                <tbody>
                                    <tr>
                                        <td colSpan={5} style={{color:'#000000',fontSize:'20px'}}><b>详细信息</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>培训时间：</td>
                                        <td colSpan={4}>{obj.PXKSSJ+' 至 '+obj.PXJSSJ}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>培训地点：</td>
                                        <td colSpan={4}>{obj.PXDD}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>培训地点电话：</td>
                                        <td colSpan={4}>{obj.PXDDDH}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>培训联系人：</td>
                                        <td colSpan={4}>{obj.PXLXR}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>培训总人数：</td>
                                        <td colSpan={4}>{obj.bmrs}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>住宿人数（总数/单）：</td>
                                        <td colSpan={2}>{obj.zszrs}</td>
                                        <td colSpan={2}>{obj.drzs}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>双人房（男）：</td>
                                        <td colSpan={4}>{obj.srnan}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>双人房（女）：</td>
                                        <td colSpan={4}>{obj.srnv}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>订餐人数 (总数/早/午/晚)：</td>
                                        <td >{obj.bczrs}</td>
                                        <td >{obj.zcrs}</td>
                                        <td >{obj.wucrs}</td>
                                        <td >{obj.wcrs}</td>
                                    </tr>
                                     <tr>
                                        <td colSpan={5} style={{color:'#000000',fontSize:'20px'}}><b>注意事项</b></td>
                                    </tr>
                                     <tr>
                                        {obj.ZYSX?<td colSpan={5} ><div className="c3" dangerouslySetInnerHTML={{__html: obj.ZYSX}}/></td>:
                                        <td colSpan={5} >无</td>}
                                    </tr>
                                </tbody>
                        </table>
                        <Panel title={<b style={{color:'#000000',fontSize:'20px'}}>报名人员明细</b>}><div className="h-scroll-table">
                        <Table columns={columns} dataSource={this.state.dataList} /></div>
                        <div style={{textAlign:'center'}}><Export resData={this.state.dataList} butName="导出Excel" 
                        model={columns} fileName ={obj.BT+"统计"} header={exportHead} /></div></Panel>
                    </div>
                    </div>
                </div>
        </Modal>
    }
});

module.exports = tj;
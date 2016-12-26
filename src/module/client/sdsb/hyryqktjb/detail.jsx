import React from 'react'
import {Button,Icon,Row,Col,Spin} from 'antd'
import Panel from 'component/compPanel'
import auth from 'common/auth.js'
import config from 'common/configuration.js'
import req from 'common/request'
import Success from './successScr'
import FailScr from './failScr'

const PanelBar = Panel.ToolBar;
const DetailBox = React.createClass({
    render(){
        const obj = this.props.data;
        return <div className="h-scroll-table" >
        <div className="fix-table table-bordered table-striped">
            <h1 style={{textAlign:'center'}}>{obj.ND}年度执业税务师行业人员情况统计表（表2)</h1>
            <Row className="dt"><Col  span="12">编制地区(单位）：{obj.DWMC}</Col><Col  span="8">上报时间：{obj.sbrqM}</Col><Col  span="4">单位：万元、人</Col></Row>
            <table>
                <tbody>
                
                <tr style={{textAlign:'center'}}>
                    <th rowSpan="3" colSpan="2">项目</th>
                    <th colSpan="2">人员</th>
                    <th colSpan="4">学历</th>
                    <th colSpan="4">年龄</th>
                    <th colSpan="2">政治面貌</th>
                    <th colSpan="8">备注</th>
                </tr>
                 <tr>
                    <th rowSpan="2">总计</th>
                    <th rowSpan="2">其中:女</th>
                    <th rowSpan="2">研宄生及以上</th>
                    <th rowSpan="2">大学本科</th>
                    <th rowSpan="2">大专</th>
                    <th rowSpan="2">大专以下</th>
                    <th rowSpan="2">35岁以下</th>
                    <th rowSpan="2">36-50岁</th>
                    <th rowSpan="2">51-60 岁</th>
                    <th rowSpan="2">61岁以上</th>
                    <th rowSpan="2">中共党员</th>
                    <th rowSpan="2">民主党派</th>
                    <th colSpan="4">人大代表</th>
                    <th colSpan="4">政协委员</th>
                </tr>
                <tr>
                    <th >全国</th>
                    <th >省</th>
                    <th >市</th>
                    <th >县</th>
                    <th >全国</th>
                    <th >省</th>
                    <th >市</th>
                    <th >县</th>
                </tr>
                  <tr>
                    <td colSpan="2">人员总数</td>
                    <td>{obj.RYZS_RY_ZJ}</td>
                    <td>{obj.RYZS_RY_NV}</td>
                    <td>{obj.RYZS_XL_YJS}</td>
                    <td>{obj.RYZS_XL_BK}</td>
                    <td>{obj.RYZS_XL_DZ}</td>
                    <td>{obj.RYZS_XL_ZZ}</td>
                    <td>{obj.RYZS_NL_35}</td>
                    <td>{obj.RYZS_NL_50}</td>
                    <td>{obj.RYZS_NL_60L}</td>
                    <td>{obj.RYZS_NL_60U}</td>
                    <td>{obj.RYZS_ZZMM_GCD}</td>
                    <td>{obj.RYZS_ZZMM_MZP}</td>
                    <td>{obj.BZ1}</td>
                    <td>{obj.BZ2}</td>
                    <td>{obj.BZ3}</td>
                    <td>{obj.BZ4}</td>
                    <td>{obj.BZ5}</td>
                    <td>{obj.BZ6}</td>
                    <td>{obj.BZ7}</td>
                    <td>{obj.BZ8}</td>
                </tr>
                  <tr>
                    <td colSpan="2">1、执业注册税务师</td>
                    <td>{obj.ZYSWS_RY_ZJ}</td>
                    <td>{obj.ZYSWS_RY_NV}</td>
                    <td>{obj.ZYSWS_XL_YJS}</td>
                    <td>{obj.ZYSWS_XL_BK}</td>
                    <td>{obj.ZYSWS_XL_DZ}</td>
                    <td>{obj.ZYSWS_XL_ZZ}</td>
                    <td>{obj.ZYSWS_NL_35}</td>
                    <td>{obj.ZYSWS_NL_50}</td>
                    <td>{obj.ZYSWS_NL_60L}</td>
                    <td>{obj.ZYSWS_NL_60U}</td>
                    <td>{obj.ZYSWS_ZZMM_GCD}</td>
                    <td>{obj.ZYSWS_ZZMM_MZP}</td>
                    <td>{obj.BZ9}</td>
                    <td>{obj.BZ10}</td>
                    <td>{obj.BZ11}</td>
                    <td>{obj.BZ12}</td>
                    <td>{obj.BZ13}</td>
                    <td>{obj.BZ14}</td>
                    <td>{obj.BZ15}</td>
                    <td>{obj.BZ16}</td>
                </tr>
                  <tr>
                    <td colSpan="2" style={{paddingLeft:'3em'}}>其中：股东或合伙人</td>
                    <td>{obj.HHCZR_RY_ZJ}</td>
                    <td>{obj.HHCZR_RY_NV}</td>
                    <td>{obj.HHCZR_XL_YJS}</td>
                    <td>{obj.HHCZR_XL_BK}</td>
                    <td>{obj.HHCZR_XL_DZ}</td>
                    <td>{obj.HHCZR_XL_ZZ}</td>
                    <td>{obj.HHCZR_NL_35}</td>
                    <td>{obj.HHCZR_NL_50}</td>
                    <td>{obj.HHCZR_NL_60L}</td>
                    <td>{obj.HHCZR_NL_60U}</td>
                    <td>{obj.HHCZR_ZZMM_GCD}</td>
                    <td>{obj.HHCZR_ZZMM_MZP}</td>
                    <td>{obj.BZ17}</td>
                    <td>{obj.BZ18}</td>
                    <td>{obj.BZ19}</td>
                    <td>{obj.BZ20}</td>
                    <td>{obj.BZ21}</td>
                    <td>{obj.BZ22}</td>
                    <td>{obj.BZ23}</td>
                    <td>{obj.BZ24}</td>
                </tr>
                <tr>
                    <td colSpan="2">2、其他从业人员</td>
                    <td>{obj.QTCYRY_RY_ZJ}</td>
                    <td>{obj.QTCYRY_RY_NV}</td>
                    <td>{obj.QTCYRY_XL_YJS}</td>
                    <td>{obj.QTCYRY_XL_BK}</td>
                    <td>{obj.QTCYRY_XL_DZ}</td>
                    <td>{obj.QTCYRY_XL_ZZ}</td>
                    <td>{obj.QTCYRY_NL_35}</td>
                    <td>{obj.QTCYRY_NL_50}</td>
                    <td>{obj.QTCYRY_NL_60L}</td>
                    <td>{obj.QTCYRY_NL_60U}</td>
                    <td>{obj.QTCYRY_ZZMM_GCD}</td>
                    <td>{obj.QTCYRY_ZZMM_MZP}</td>
                    <td>{obj.BZ25}</td>
                    <td>{obj.BZ26}</td>
                    <td>{obj.BZ27}</td>
                    <td>{obj.BZ28}</td>
                    <td>{obj.BZ29}</td>
                    <td>{obj.BZ30}</td>
                    <td>{obj.BZ31}</td>
                    <td>{obj.BZ32}</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{paddingLeft:'3em'}}>其中：亊务所内非执业注册税务师</td>
                    <td>{obj.FZYZSS_RY_ZJ}</td>
                    <td>{obj.FZYZSS_RY_NV}</td>
                    <td>{obj.FZYZSS_XL_YJS}</td>
                    <td>{obj.FZYZSS_XL_BK}</td>
                    <td>{obj.FZYZSS_XL_DZ}</td>
                    <td>{obj.FZYZSS_XL_ZZ}</td>
                    <td>{obj.FZYZSS_NL_35}</td>
                    <td>{obj.FZYZSS_NL_50}</td>
                    <td>{obj.FZYZSS_NL_60L}</td>
                    <td>{obj.FZYZSS_NL_60U}</td>
                    <td>{obj.FZYZSS_ZZMM_GCD}</td>
                    <td>{obj.FZYZSS_ZZMM_MZP}</td>
                    <td>{obj.BZ33}</td>
                    <td>{obj.BZ34}</td>
                    <td>{obj.BZ35}</td>
                    <td>{obj.BZ36}</td>
                    <td>{obj.BZ37}</td>
                    <td>{obj.BZ38}</td>
                    <td>{obj.BZ39}</td>
                    <td>{obj.BZ40}</td>
                </tr>
                 <tr>
                    <td rowSpan="3">其中：具有其他专业服务资格的从业人员</td>
                    <td>1、注册会计师</td>
                    <td>{obj.ZCKJS_RY_ZJ}</td>
                    <td>{obj.ZCKJS_RY_NV}</td>
                    <td>{obj.ZCKJS_XL_YJS}</td>
                    <td>{obj.ZCKJS_XL_BK}</td>
                    <td>{obj.ZCKJS_XL_DZ}</td>
                    <td>{obj.ZCKJS_XL_ZZ}</td>
                    <td>{obj.ZCKJS_NL_35}</td>
                    <td>{obj.ZCKJS_NL_50}</td>
                    <td>{obj.ZCKJS_NL_60L}</td>
                    <td>{obj.ZCKJS_NL_60U}</td>
                    <td>{obj.ZCKJS_ZZMM_GCD}</td>
                    <td>{obj.ZCKJS_ZZMM_MZP}</td>
                    <td>{obj.BZ41}</td>
                    <td>{obj.BZ42}</td>
                    <td>{obj.BZ43}</td>
                    <td>{obj.BZ44}</td>
                    <td>{obj.BZ45}</td>
                    <td>{obj.BZ46}</td>
                    <td>{obj.BZ47}</td>
                    <td>{obj.BZ48}</td>
                </tr>
                 <tr>
                    <td>2、资产评估师</td>
                    <td>{obj.ZCPGS_RY_ZJ}</td>
                    <td>{obj.ZCPGS_RY_NV}</td>
                    <td>{obj.ZCPGS_XL_YJS}</td>
                    <td>{obj.ZCPGS_XL_BK}</td>
                    <td>{obj.ZCPGS_XL_DZ}</td>
                    <td>{obj.ZCPGS_XL_ZZ}</td>
                    <td>{obj.ZCPGS_NL_35}</td>
                    <td>{obj.ZCPGS_NL_50}</td>
                    <td>{obj.ZCPGS_NL_60L}</td>
                    <td>{obj.ZCPGS_NL_60U}</td>
                    <td>{obj.ZCPGS_ZZMM_GCD}</td>
                    <td>{obj.ZCPGS_ZZMM_MZP}</td>
                    <td>{obj.BZ49}</td>
                    <td>{obj.BZ50}</td>
                    <td>{obj.BZ51}</td>
                    <td>{obj.BZ52}</td>
                    <td>{obj.BZ53}</td>
                    <td>{obj.BZ54}</td>
                    <td>{obj.BZ55}</td>
                    <td>{obj.BZ56}</td>
                </tr>
                 <tr>
                    <td>3、律师</td>
                    <td>{obj.LS_RY_ZJ}</td>
                    <td>{obj.LS_RY_NV}</td>
                    <td>{obj.LS_XL_YJS}</td>
                    <td>{obj.LS_XL_BK}</td>
                    <td>{obj.LS_XL_DZ}</td>
                    <td>{obj.LS_XL_ZZ}</td>
                    <td>{obj.LS_NL_35}</td>
                    <td>{obj.LS_NL_50}</td>
                    <td>{obj.LS_NL_60L}</td>
                    <td>{obj.LS_NL_60U}</td>
                    <td>{obj.LS_ZZMM_GCD}</td>
                    <td>{obj.LS_ZZMM_MZP}</td>
                    <td>{obj.BZ57}</td>
                    <td>{obj.BZ58}</td>
                    <td>{obj.BZ59}</td>
                    <td>{obj.BZ60}</td>
                    <td>{obj.BZ61}</td>
                    <td>{obj.BZ62}</td>
                    <td>{obj.BZ63}</td>
                    <td>{obj.BZ64}</td>
                </tr>
                </tbody>
            </table>
            <Row className="dt"><Col  span="8">填报人：{obj.ZBR}</Col><Col  offspan="16">所长：{obj.SZ}</Col></Row>
            <div className="sm">
                <p>填表说明：</p>
                <p>1、本表统计数据截止为统计年度的12月31日；上报截止期为次年3月31日。（具体时间以各省通知为准）</p>
                   <p> 2、人员总数=执业注册税务师+其他从业人员</p>
                   <p> 3、"具有其他专业服务执业资格的人员"是指除执业注册税务师以外的注册会计师、注册资产评估师、律师的专业服务执业资格的人 具有两种以上中介执业资格的人员，可以重复统计。</p>
                   <p> 4、备注栏中埴列县以上人大代表和政协委员。</p>
            </div>
       
             </div>
        </div>
    }
});

const c = React.createClass({
    getInitialState(){
        return {
            loading: true,
            data: {},
            scr: 'edit'
        }
    },
    back(){
        this.props.onBack();
    },


    componentDidMount(){
        req({
            method: 'get',
            url: config.HOST + config.URI_API_PROJECT + `/client/hyryqktjb/${this.props.data.id}`,
            headers:{'x-auth-token':auth.getToken()}
        }).then(resp=> {
            this.setState({data: resp, loading: false})
        }).catch(e=> {
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                let failtext = {
                    text: res.text
                };
                this.setState({scr: 'fail', loading: false, failtext: failtext})
            } else {
                this.setState({scr: 'fail', loading: false})
            }

        })
    },

    render(){
        const {title} = this.props;
        let {data,loading,scr,failtext,successType} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;

        let content = {
            edit: <DetailBox data={data} onCommit={this.handleCommit} onSave={this.handleSave} />,
            fail: <FailScr text={failtext}/>,
            success: <Success type={successType}/>
        };

        return <Panel className="swsjbqk-edit" toolbar={panelBar} title={title}>
            <Spin spinning={loading}>
                {content[scr]}
            </Spin>
        </Panel>

    }
});


module.exports = c;
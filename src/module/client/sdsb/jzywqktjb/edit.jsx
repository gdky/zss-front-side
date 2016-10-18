import React from 'react'
import {Steps, Col, Row, Spin, notification, Icon, Button, Form, Input,InputNumber,Popconfirm} from 'antd'
import Panel from 'component/compPanel'
import {SelectorYear, SelectorXZ, SelectorSWSXZ, SelectorCS} from 'component/compSelector'
import config from 'common/configuration.js'
import req from 'common/request'
import utils from 'common/utils'
import Success from './successScr'
import FailScr from './failScr'
import {mapKeys} from 'lodash'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const PanelBar = Panel.ToolBar;

let Editfrom = React.createClass({
    checkRyzs(rule, value, callback){
        if (value < this.props.form.getFieldValue('zyzcswsrs')) {
            callback("人员总数要大于执业人数")
        } else {
            callback()
        }
    },
    checkZczj(rule, value, callback){
        if ( this.props.data.jgxz_dm==2 && (!value || value <= 0)) {
            callback("必填")
        } else {
            callback()
        }
    },
    checkCzrs(rule, value, callback){
        if ( this.props.data.jgxz_dm==2 && (!value || value <= 0)) {
            callback("必填")
        } else {
            callback()
        }
    },
    checkHhrs(rule, value, callback){
        if ( this.props.data.jgxz_dm==1 && (!value || value <= 0)) {
            callback("必填")
        } else {
            callback()
        }
    },
    checkYysr(rule, value, callback){
        if ( this.props.data.jgxz_dm==1 && (!value || value <= 0)) {
            callback("必填")
        } else {
            callback()
        }
    },
    checkZyzcswsrs(rule, value, callback){
        if(value > this.props.zyzcswsrs){
            callback('填报的执业人数不能多于'+this.props.zyzcswsrs+'人')
        }else if (value > this.props.form.getFieldValue('ryzs')){
            callback('执业人数不能大于人员总数')
        }else {
            callback()
        }
    },
    commit(){
        const {validateFields} = this.props.form;
        validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            values = utils.transEmpty2Null(values);
            this.props.onCommit(values);
        })
    },
    save(){
        const {validateFields} = this.props.form;
        validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            values = utils.transEmpty2Null(values);
            this.props.onSave(values);
        })
    },
    render(){
        const {data} = this.props;
        const {getFieldProps} = this.props.form;
        const layout = {
            labelCol: {span: 12},
            wrapperCol: {span: 12}
        };
        const style = {style: {width: '100%'}};
        const ndProps = getFieldProps('nd', {
            rules: [
                {required: true, type: 'number', message: '必填'}
            ]
        });
        const jgxzProps = getFieldProps('jgxz_dm', {
            rules: [
                {required: true, message: '必填'}
            ]
        });
        const frdbProps = getFieldProps('frdbxm', {
            rules: [
                {required: true, whitespace: true, message: '必填'}
            ]
        });
        const ryzsProps = getFieldProps('ryzs', {
            rules: [
                {required: true, type: "number", message: '必填'},
                {validator: this.checkRyzs}
            ]
        });
        const zyzcswsrsProps = getFieldProps('zyzcswsrs', {
            rules: [
                {required: true, type: "number", message: '必填'},
                {validator: this.checkZyzcswsrs}
            ]
        });
        const lrzeProps = getFieldProps('lrze', {
            rules: [
                {required: true, type: "number", message: '必填'}
            ]
        });
        const zczeProps = getFieldProps('zcze', {
            rules: [
                {required: true, type: "number", message: '必填'}
            ]
        });
        const srzeProps = getFieldProps('srze', {
            rules: [
                {required: true, type: "number", message: '必填'}
            ]
        });
        const wthsProps = getFieldProps('wths', {
            rules: [
                {required: true, type: "number", message: '必填'}
            ]
        });
        const csProps = getFieldProps('cs_dm', {
            rules: [
                {required: true, type:'object', message: '必填'}
            ]
        });
        const zczjProps = getFieldProps('zczj', {
            rules: [
                {validator: this.checkZczj}
            ]
        });
        const czrsProps = getFieldProps('czrs', {
            rules: [
                {validator: this.checkCzrs}
            ]
        });
        const hhrsProps = getFieldProps('hhrs', {
            rules: [
                {validator: this.checkHhrs}
            ]
        });
        const yysrProps = getFieldProps('yysr', {
            rules: [
                {validator: this.checkYysr}
            ]
        });
        const tbrProps = getFieldProps('tianbiaoren', {
            rules: [
                {required: true, whitespace: true, message: '必填'}
            ]
        });
        const szProps = getFieldProps('suozhang', {
            rules: [
                {required: true, whitespace: true, message: '必填'}
            ]
        });
        return <div className="fix-table no-border table-striped  ">
            <Form horizontal>
                <table className="tg">
                    <colgroup>
                        <col style={{width:'25%'}}/>
                        <col style={{width:'25%'}}/>
                        <col style={{width:'25%'}}/>
                        <col style={{width:'25%'}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td className="tg-031e" colSpan="2">单位：{data.dwmc}</td>
                        <td className="tg-031e" colSpan="2">
                            <FormItem label="年度"  {...layout}><Input {...style} disabled { ...ndProps} /></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">
                            <FormItem label="组织形式"  {...layout}><SelectorSWSXZ {...style}
                              disabled { ...jgxzProps}/></FormItem>
                        </td>
                        <td className="tg-031e"><FormItem
                          label="法人" {...layout}><Input {...style} {...frdbProps}/></FormItem>
                        </td>

                        <td className="tg-031e">
                            <FormItem label="人员总数" {...layout}><InputNumber  {...style} {...ryzsProps}/></FormItem>
                        </td>
                        <td className="tg-031e">
                            <FormItem label="执业人数" {...layout}><InputNumber {...style}
                              {...zyzcswsrsProps}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">
                            <FormItem label="利润总额 万元"  {...layout}><InputNumber step={0.01} {...style} {...lrzeProps}/></FormItem>
                        </td>
                        <td className="tg-031e">
                            <FormItem label="资产总额 万元" {...layout}><InputNumber step={0.01} {...style} {...zczeProps}/></FormItem>
                        </td>

                        <td className="tg-031e">
                            <FormItem label="收入总额 万元" {...layout}><InputNumber step={0.01} {...style}
                                                                               disabled   {...srzeProps}/></FormItem></td>
                        <td className="tg-031e">
                            <FormItem label="委托户数" {...layout}><InputNumber {...style} {...wthsProps}/></FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">
                            <FormItem
                              label="所在地" {...layout}><SelectorCS labelInValue {...style} { ...csProps}/></FormItem></td>

                        {data.jgxz_dm == 2 ? <td className="tg-031e">
                            <FormItem label="注册资金 万元" {...layout}><InputNumber step={0.01} {...style} {...zczjProps}/></FormItem>
                        </td> : null}
                        {data.jgxz_dm == 2 ? <td className="tg-031e">
                            <FormItem label="股东人数" {...layout}><InputNumber {...style} {...czrsProps}/></FormItem>
                        </td> : null}
                        {data.jgxz_dm == 1 ? <td className="tg-031e">
                            <FormItem label="合伙人数" {...layout}><InputNumber {...style} {...hhrsProps}/></FormItem>
                        </td> : null}
                        {data.jgxz_dm == 1 ? <td className="tg-031e">
                            <FormItem label="运营资金 万元" {...layout}><InputNumber step={0.01} {...style} {...yysrProps}/></FormItem>
                        </td> : null}
                        <td> </td>
                    </tr>
                    <tr>
                        <td className="tg-031e">
                            <FormItem label="制表人" {...layout}><Input {...style} {...tbrProps}/></FormItem></td>
                        <td className="tg-031e">
                            <FormItem label="所长" {...layout}><Input {...style} {...szProps}/></FormItem></td>
                        <td colSpan="2"> </td>
                    </tr>
                    </tbody>
                </table>
                <Row style={{marginTop:'24px'}}>
                    <Col span="5" offset="19">
                        <ButtonGroup>
                            <Popconfirm placement="top" title="确定保存？" onConfirm={this.save}>
                                <Button type="primary"> <Icon type="save"/>保存</Button>
                            </Popconfirm>
                            <Popconfirm placement="top" title="确定提交？" onConfirm={this.commit}>
                                <Button type="primary"> <Icon type="to-top"/>提交</Button>
                            </Popconfirm>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    }
});
Editfrom = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(Editfrom);


const c = React.createClass({
    getDefaultProps(){
        return {
            title: '编辑事务所基本情况表',
            url: config.HOST + config.URI_API_PROJECT + '/client/swsjbqk',
            initUrl: config.HOST + config.URI_API_PROJECT + '/client/swsjbqkinit'
        }
    },
    getInitialState(){
        return {
            loading: true,
            data: {},
            scr: 'normal'
        }
    },
    back(){
        this.props.onBack();
    },

    //保存
    handleSave(values){
        const {url,id} = this.props;
        values.ztbj = 0;
        values.dwmc = this.state.data.dwmc;
        this.setState({loading:true,data:values});
        req({
            method:'put',
            url:url+ `/${id}`,
            data:values
        }).then(resp=>{
            this.setState({loading:false,scr:'success',successType:'save'})
        }).catch(e=>{
            this.setState({loading: false});
            if (e.status == 403){
                let res = JSON.parse(e.response);
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: res.text
                });
            }else{
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '报表数据保存失败，请稍后再尝试'
                });
            }
        });
    },
    //提交
    handleCommit(values){
        const {url,id} = this.props;
        values.ztbj = 1;
        values.dwmc = this.state.data.dwmc;
        this.setState({loading:true,data:values});
        req({
            method:'put',
            url:url+ `/${id}`,
            data:values
        }).then(resp=>{
            this.setState({loading:false,scr:'success',successType:'commit'})
        }).catch(e=>{
            this.setState({loading: false});
            if (e.status == 403){
                let res = JSON.parse(e.response);
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: res.text
                });
            }else{
                notification.error({
                    duration: 3,
                    message: '操作失败',
                    description: '报表数据保存失败，请稍后再尝试'
                });
            }
        });
    },

    //异步获取注册税务师人数和报表明细信息
    async fetchData(){
        const {url,initUrl,id} = this.props;
        let fetch1 = req({
            method: 'get',
            url: initUrl,
            data:{id:id}
        });
        let fetch2 =  req({
            method: 'get',
            url: url + `/${id}`
        });
        let [init, mx] = await Promise.all([fetch1, fetch2]);
        return {init: init, mx: mx}
    },

    componentDidMount(){
        //const {url,id}  = this.props;
        this.fetchData().then(resp=> {
            //将明细对象的所有属性名转成小写
            let values = mapKeys(resp.mx,function(value,key){
                return key.toLowerCase()
            });
            values.srze = resp.init.srze;
            values.zyzcswsrs = resp.init.zyzcswsrs;
            //将机构性质和城市代码转为字符串，城市下拉由于labelInValue，所以需采用下面的赋值方式
            values.jgxz_dm = ''+values.jgxz_dm;
            values.cs_dm = {key:''+values.cs_dm};
            this.setState({data: values, loading: false,zyzcswsrs:values.zyzcswsrs})
        }).catch(e=> {
            if (e.status == 403) {
                let res = JSON.parse(e.response);
                this.setState({scr: 'fail', loading: false, failtext: res.text})
            } else {
                this.setState({scr: 'fail', loading: false})
            }

        })
    },

    render(){
        const {title} = this.props;
        let {data,loading,scr,failtext,successType,zyzcswsrs} = this.state;
        const panelBar = <PanelBar>
            <Button onClick={this.back}>
                <Icon type="rollback"/>返回
            </Button>
        </PanelBar>;



        let content = {
            normal: <Editfrom data={data} onCommit={this.handleCommit} onSave={this.handleSave} zyzcswsrs={zyzcswsrs}/>,
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
import {SelectorYear, SelectorXZ, SelectorSWSXZ, SelectorCS} from 'component/compSelector'
import React from 'react'
import {Steps, Col, Row, Spin, notification, Icon, Button, Form, Input, InputNumber, Popconfirm} from 'antd'
import {mapKeys, remove} from 'lodash'
import RyList from './rylist'
import DialogRy from './dialogRy'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

let form = React.createClass({
    getInitialState(){
        return {
            rylist: [],
            data: [],
            selectedRowKeys: [],
            dialogRy: false
        }
    },
    handleSelected(selectedRowKeys){
        this.setState({selectedRowKeys: selectedRowKeys})
    },
    componentWillReceiveProps(nextProps){
        if (!!nextProps) {
            this.setState({rylist: nextProps.rylist})
        }
    },
    delRy(){
        let {selectedRowKeys, rylist} = this.state;
        let i = selectedRowKeys.length;
        while (i--) {
            remove(rylist, (value, index, array)=> {
                return selectedRowKeys[i] === index
            })
        }
        this.setState({rylist: rylist, selectedRowKeys: []})
    },
    addRy(value){
        let rylist = this.state.rylist;
        rylist.push(value);
        this.setState({rylist: rylist})
    },
    openDialogRy(){
        this.setState({dialogRy: true})
    },
    closeDialogRy(){
        this.setState({dialogRy: false})
    },
    commit(){
        this.props.onCommit(this.state.rylist);
    },
    getSrj(array){
        let c = 0;
        array.sort((a,b)=>b-a); //将数组降序排序
        for(let i = 0 ; i< array.length; i++){
            if(i%2 == 0){
                c += array[i]; //将偶数位的天数累加
            }
        }
        return c
    },
    getCost(list){
        const {pxxx} = this.props;
        let cost = 0,srjdays=[],drj=0;
        list.forEach(value=>{
            cost += value.zaoc * pxxx.zaoc + value.wuc * pxxx.wuc + value.wanc * pxxx.wanc;
            drj += (value.fjlx == '1' ? 1 : 0) ;
            if(value.fjlx=='2') srjdays.push(this.daydiff(value.rzsj,value.lksj));//将每人登记的双人间天数记录成数组
        });
        cost += drj * pxxx.drj;
        //计算双人间的所需数量
        let srj = this.getSrj(srjdays);
        cost += srj * pxxx.srj;
        return {
            cost:cost,srj:srj,drj:drj
        }
    },
    daydiff(first,second){
        first = new Date(first);
        second = new Date(second);
        return Math.round((second-first)/(1000*60*60*24));
    },
    render(){
        const {pxxx} = this.props;
        const {getFieldProps} = this.props.form;
        const layout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };
        let cost = this.getCost(this.state.rylist);
        return <div className="form">
            <DialogRy visible={this.state.dialogRy} onClose={this.closeDialogRy} onOk={this.addRy}/>
            <Form horizontal>
                <Row>
                    <Col offset={1}><h2>事务所信息</h2></Col>
                </Row>

                <Row>
                    <Col span="24">
                        <FormItem label="事务所名称" labelCol={{span: 3}} wrapperCol={{span: 19}}>
                            <Input disabled { ...getFieldProps('swsmc')} /></FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <FormItem label="单位电话"  {...layout}>
                            <Input disabled { ...getFieldProps('swsdh')} /></FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="单位传真"  {...layout}>
                            <Input disabled { ...getFieldProps('swscz')} /></FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="法人"  {...layout}>
                            <Input disabled { ...getFieldProps('fddbr')} /></FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="手机"  {...layout}>
                            <Input disabled { ...getFieldProps('swssj')} /></FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="地址"  {...layout}>
                            <Input disabled { ...getFieldProps('swsdz')} /></FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="电子邮件"  {...layout}>
                            <Input disabled { ...getFieldProps('swsdzyj')} /></FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col offset={1} span="4"><h2>参会人员信息</h2></Col>
                    <Col span="4">
                        <ButtonGroup>
                            <Button onClick={this.delRy}>删除人员</Button>
                            <Button onClick={this.openDialogRy}>增加人员</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row><RyList data={this.state.rylist}
                             onSelected={this.handleSelected}
                             selectedRowKeys={this.state.selectedRowKeys}/>
                </Row>
                <Row style={{marginTop: '8px'}}>
                    <Col span={5} offset={1}>
                        单人房：￥{pxxx.drj}/晚
                    </Col>
                    <Col span={5}>
                        双人房：￥{pxxx.srj}/晚
                    </Col>
                    <Col span={8}>
                        早餐：￥{pxxx.zaoc}/人&nbsp;&nbsp;&nbsp;&nbsp;
                        午餐：￥{pxxx.wuc}/人&nbsp;&nbsp;&nbsp;&nbsp;
                        晚餐：￥{pxxx.wanc}/人
                    </Col>
                </Row>
                <Row>
                    <Col span={20} offset={1}>
                        单人间：<span className="blue">{cost.drj} 间·天</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        双人间：<span className="blue">{cost.srj} 间·天</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        房费+餐费合计：<span className="blue">￥{cost.cost}元 </span>该值仅为估算，只供参考
                    </Col>
                </Row>
                <Row>
                    <Col offset={1} span="4"><h2>会员服务</h2></Col>
                </Row>
                <Row>
                    <Col span="5" offset={1}>宾馆总机：{pxxx.bgdh}</Col>
                    <Col span="5">会务组房间号码：{pxxx.hwwzfjh}</Col>
                    <Col span="5">联系电话：{pxxx.pxdddh}</Col>
                    <Col span="8">地点：{pxxx.pxdz}</Col>
                </Row>
                <Row style={{marginTop: '24px'}}>
                    <Col span="5" offset="10">
                        <ButtonGroup>
                            <Popconfirm placement="top" title="确定提交？" onConfirm={this.commit}>
                                <Button type="primary">提交</Button>
                            </Popconfirm>
                        </ButtonGroup>
                    </Col>
                </Row>

            </Form>
        </div>
    }
});
form = Form.create({
    mapPropsToFields(props) {
        let result = {};
        for (let prop in props.data) {
            result[prop] = {value: props.data[prop]}
        }
        return result;
    }
})(form);

module.exports = form;
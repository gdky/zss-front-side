import React from 'react';
import { Button, Row, Col, Icon, Card } from 'antd'
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/tooltip';

const c = React.createClass({
    getOption: function () {
        const option = {
            title: {
                text: '业务分类情况'
            },
            color: ['#003366','#006699', '#4cabce'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['协议金额','已收费金额', '发票金额'],
                bottom:16
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisLabel:{interval:0,showMaxLabel:true},
                    axisTick: {show: false},
                    data: [
                        '开发费加计扣除',
                        '税前扣除', 
                        '汇算清缴纳税调整',
                        '土地增值税',
                        '房地产涉税调整',
                        '其它报告',
                        '高新技术企业',
                        '企业注销',
                        '企业变更',
                        '个人所得税'
                    ]
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '协议金额',
                    type: 'bar',
                    barGap: 0,
                    data: [33034, 23020,24300,8565,12002,5203,6904,390,411,5000]
                },
                {
                    name: '已收费金额',
                    type: 'bar',
                    barGap: 0,
                    data: [35303, 23320,24300,8945,11834,5203,6904,362,400,111]
                },
                {
                    name: '发票金额',
                    type: 'bar',
                    data: [33244, 22320,22393,8245,9033,3000,1500,362,400,111]
                }
            ]
        };
        return option;
    },
    render() {
        return <div className="wrap">
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col className="gutter-row" span={6}>
                    <Card className="gutter-box" bordered={false} >
                        <Icon type="share-alt" style={{ fontSize: '54px', color: '#a7e1c4', float: 'left', marginRight: '16px' }} />
                        <p style={{ fontSize: '14px', marginBottom: '8px' }}>事务所</p>
                        <p style={{ fontSize: '24px' }}>702间</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card className="gutter-box" bordered={false} >
                        <Icon type="solution" style={{ fontSize: '54px', color: '#add8f7', float: 'left', marginRight: '16px' }} />
                        <p style={{ fontSize: '14px', marginBottom: '8px' }}>执业人员</p>
                        <p style={{ fontSize: '24px' }}>5723人</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card className="gutter-box" bordered={false} >
                        <Icon type="user" style={{ fontSize: '54px', color: '#add8f7', float: 'left', marginRight: '16px' }} />
                        <p style={{ fontSize: '14px', marginBottom: '8px' }}>非执业人员</p>
                        <p style={{ fontSize: '24px' }}>1155人</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card className="gutter-box" bordered={false} >
                        <Icon type="team" style={{ fontSize: '54px', color: '#add8f7', float: 'left', marginRight: '16px' }} />
                        <p style={{ fontSize: '14px', marginBottom: '8px' }}>从业人员</p>
                        <p style={{ fontSize: '24px' }}>6425人</p>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={24}>
                    <Card bordered={false}>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={this.getOption()}
                            style={{ height: '352px', width: '100%' }} />
                    </Card>
                </Col>
            </Row>
        </div>
    }
});

module.exports = c;
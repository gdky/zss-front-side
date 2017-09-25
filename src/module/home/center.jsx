import React from 'react';
import { Button, Row, Col, Icon, Card } from 'antd'

const c = React.createClass({
    render() {
        return <div className="wrap">
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <Card className="gutter-box" bordered={false} >
                        <Icon type="share-alt" style={{ fontSize: '54px', color: '#a7e1c4', float: 'left',marginRight:'16px' }} />
                        <p style={{fontSize:'14px',marginBottom:'8px'}}>事务所</p>
                        <p style={{fontSize:'24px'}}>768间</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card className="gutter-box" bordered={false} >
                        <Icon type="solution" style={{ fontSize: '54px', color: '#add8f7', float: 'left',marginRight:'16px' }} />
                        <p style={{fontSize:'14px',marginBottom:'8px'}}>执业人员</p>
                        <p style={{fontSize:'24px'}}>500人</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card className="gutter-box" bordered={false} >
                        <Icon type="solution" style={{ fontSize: '54px', color: '#fcb8d3', float: 'left',marginRight:'16px' }} />
                        <p style={{fontSize:'14px',marginBottom:'8px'}}>非执业人员</p>
                        <p style={{fontSize:'24px'}}>56人</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card className="gutter-box" bordered={false} >
                        <Icon type="team" style={{ fontSize: '54px', color: '#cfcaf6', float: 'left',marginRight:'16px' }} />
                        <p style={{fontSize:'14px',marginBottom:'8px'}}>从业人员</p>
                        <p style={{fontSize:'24px'}}>1200人</p>
                    </Card>
                </Col>
            </Row>
        </div>
    }
});

module.exports = c;
import React from 'react';
import {Button} from 'antd'
import { Button, Row, Col, Icon } from 'antd'

const c = React.createClass({
    render() {
        return <div className="wrap">
            管理端主页
            <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box"><Icon type="share-alt" style={{fontSize:'40px',color:'#76d0a3'}}/></div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">.ant-col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">.ant-col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">.ant-col-6</div>
            </Col>
          </Row>
        </div>
    }
});

module.exports = c;
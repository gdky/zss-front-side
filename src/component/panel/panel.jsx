import React from 'react'
import {Row,Col,Button,Icon} from 'antd'

const panel = React.createClass({
    getDefaultProps(){
        return ({
            closable: false,
            title: '',
            smalltitle:'',
            toolbar: '',
            className:'',
            onClose() {}
        })
    },
    getInitialState(){
        return ({
            closed: false
        })
    },

    render(){
        let {title,toolbar,closable} = this.props;
        let pt = null;
        if (title || toolbar ) {
            pt = <div className="panel-title">
                <Row>
                    <Col span="12"><h3>{title}</h3></Col>
                    <Col offset="16">
                        {toolbar}
                    </Col>
                </Row>
            </div>;
        }


        return this.state.closed ? null : (<div className={'panel '+this.props.className}>
            {pt}
            <div className="panel-body">
                {this.props.children}
            </div>
        </div>)
    }
});

module.exports = panel;

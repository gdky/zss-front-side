import React from 'react'
import {Table,Modal,Input,Button,Spin} from 'antd'
import config from 'common/configuration.js'
import req from 'reqwest'
import auth from 'common/auth.js'

const InputGroup = Input.Group;
const CUSTOMER_URL = config.HOST + config.URI_API_PROJECT + '/customers';

const columns = [{
    title: '单位名称',
    dataIndex: 'DWMC',
    key: 'DWMC',
    width: 200
}];


const customer = React.createClass({
    getInitialState() {
        return {
            value: '',
            loading: false,
            data: [],
            entity:{}
        };
    },
    handleSelect(record){
        this.setState({entity:record})
    },
    handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    },
    handleSearch(){
        const jid = auth.getJgid();
        const token = auth.getToken();

        this.setState({loading: true});
        let value = {dwmc: this.state.value};
        req({
            url: CUSTOMER_URL,
            method: 'get',
            type: 'json',
            data: {where: encodeURIComponent(JSON.stringify(value)), jid: jid, page: 1, pageSize: 10},
            headers: {'x-auth-token': token}
        }).then(resp=>{
            this.setState({loading: false, data: resp.data})
        })
    },
    handleOk(){
      this.props.onOk(this.state.entity);
    },
    render(){
        const rowSelection = {
            type: 'radio',
            onSelect: this.handleSelect
        };

        return <Modal {...this.props} title="选择客户" width="400" onOk={this.handleOk}>
            <div className="ant-search-input-wrapper" style={{ width: 240 }}>
                <InputGroup className="ant-search-input">
                    <Input placeholder="用单位名称查询"
                           onChange={this.handleInputChange}
                           onPressEnter={this.handleSearch}/>
                    <div className="ant-input-group-wrap">
                        <Button icon="search" className="ant-search-btn" onClick={this.handleSearch}/>
                    </div>
                </InputGroup>
            </div>

            <Spin spinning={this.state.loading}>
                <Table pagination={false}
                       dataSource={this.state.data}
                       size="small"
                       rowSelection={rowSelection}
                       columns={columns}
                       />
            </Spin>
        </Modal>
    }
});

module.exports = customer;
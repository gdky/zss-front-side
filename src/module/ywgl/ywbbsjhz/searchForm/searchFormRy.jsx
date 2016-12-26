import React from 'react'
import {Row, Col, Table, Form, Button, Input, Radio, Checkbox, Modal, notification} from 'antd'
import classNames from 'classnames'
import {SelectorYWLX, SelectorYear} from 'component/compSelector'
import req from 'reqwest'
import auth from 'common/auth'

const FormItem = Form.Item;
const createForm = Form.create;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

let searchForm = React.createClass({
    //初始化state
    getInitialState() {
        return {
            initialValue: this.props.initialValue,
            visible: false,
            entity: { id: this.props.initialValue.jgid, dwmc: this.props.initialValue.dwmc },
            cxdwmc: "",
            focus: false,
            data: [],
            loading: false,
            pagination: {
                size: "small",
                current: 1,
                pageSize: 5,
                showQuickJumper: true,
                showTotal(total) {
                    return `共 ${total} 条`
                }
            }
        }
    },

    getDefaultProps() {
        return {
            onSubmit: {}
        }
    },

    fetchData(params = { page: 1, pagesize: 5 }) {
        this.setState({ loading: true });
        const token = auth.getToken();
        const {apiUrl} = this.props;
        req({
            url: apiUrl + "/ywbbjg",
            type: 'json',
            method: 'get',
            data: params,
            headers: { 'x-auth-token': token }
        }).then(resp => {
            const p = this.state.pagination;
            p.current = params.page;
            p.pageSize = params.pagesize;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            this.setState({ data: resp.data, pagination: p, loading: false })
        }).fail(e => {
            this.setState({ loading: false });
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    //组件加载时读取数据
    componentDidMount() {
        this.fetchData();
    },

    handleReset(e) {
        e.preventDefault();
        this.setState({
            entity: { id: this.props.initialValue.jgid, dwmc: this.props.initialValue.dwmc }
        });
        this.props.form.resetFields();
    },

    handleSubmit(e) {
        e.preventDefault();
        let result = true;
        let value = this.props.form.getFieldsValue();
        value["jgId"] = this.state.entity.id;
        this.props.form.validateFields((errors, value) => {
            if (!!errors) {
                result = false;
                return;
            }
        });
        if (result) {
            this.props.onSubmit(value);
        }
    },

    //点击机构名称输入框，打开机构查询对话框
    onClick() {
        this.setState({ visible: true });
    },

    //点击对话框的确定按钮，关闭机构查询对话框
    onOk() {
        this.setState({ visible: false });
    },

    //请选择列
    renderSelect(text, record, index) {
        const that = this;
        const id = record.id;
        const dwmc = record.dwmc;
        const entity = { id: id, dwmc: dwmc };
        function onClick() {
            that.setState({
                entity: entity
            });
        }

        return <label className={"ant-radio-wrapper " + (id == this.state.entity.id ? " ant-radio-wrapper-checked " : " ") }>
            <span className={"ant-radio " + (id == this.state.entity.id ? " ant-radio-checked ant-radio-checked-1 " : " ") }>
                <span className="ant-radio-inner">
                </span>
                <input type="radio" className="ant-radio-input" value={id} name="action" onClick={onClick}/>
            </span>
            <span></span>
        </label>
    },

    //输入变化
    handleInputChange(e) {
        this.setState({
            cxdwmc: e.target.value
        });
    },

    //放开焦点和集中焦点
    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement
        });
    },

    //搜索
    handleSearch() {
        const where = { dwmc: this.state.cxdwmc };
        const pagination = this.state.pagination;
        const params = {
            page: 1,
            pagesize: pagination.pageSize,
            where: encodeURIComponent(JSON.stringify(where))
        }
        this.fetchData(params);
    },

    //改变页码
    handleChange(pagination, filters, sorter) {
        const where = { dwmc: this.state.cxdwmc };
        let param = {
            page: pagination.current,
            pagesize: pagination.pageSize,
            where: encodeURIComponent(JSON.stringify(where))
        };
        this.fetchData(param);
    },

    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.cxdwmc.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        const footer = <div>
            <Button type="primary" htmlType="submit" className="query"  onClick={this.onOk}>确定</Button>
        </div>;
        const columns = [
            { title: '机构名称', dataIndex: 'dwmc', key: 'dwmc' },
            { title: '法定代表（所长）', dataIndex: 'fddbr', key: 'fddbr' },
            { title: '机构状态', dataIndex: 'zt', key: 'zt' },
            { title: '请选择', dataIndex: 'action', key: 'action', render: this.renderSelect }
        ];
        const data = this.state.initialValue;
        const entity = this.state.entity;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };
        return <div className="search-form">
            <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="10">
                        <FormItem
                            {...formItemLayout}
                            label="提交报备年度">
                            <SelectorYear {...getFieldProps('bbnd', { initialValue: data.bbnd }) }/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="10">
                        <FormItem
                            {...formItemLayout}
                            label="机构单位名称">
                            <Input
                                {...getFieldProps('dwmc', { initialValue: data.dwmc }) }
                                value={entity.dwmc}
                                onClick={this.onClick}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="5" offset="5">
                        <Button type="primary" htmlType="submit" className="query" loading={this.props.loading}>数据分析</Button>
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
            <Modal wrapClassName="vertical-center-modal" width="50%" visible={this.state.visible} footer={footer} closable={false}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <Row type="flex" justify="center">
                            <Col span={4} style={{ textAlign: 'center', height: '25px', lineHeight: '25px', overflow: 'hidden' }}> 机构名称: </Col>
                            <Col span={8}>
                                <InputGroup  className={searchCls}>
                                    <Input value={this.state.cxdwmc} onChange={this.handleInputChange}
                                        onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
                                        />
                                    <div className="ant-input-group-wrap">
                                        <Button icon="search" className={btnCls} onClick={this.handleSearch} />
                                    </div>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <div style={{ margin: '10px' }}>
                            <Table columns={columns}
                                dataSource={this.state.data}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                onChange={this.handleChange}
                                rowKey={record => record["id"]}
                                rowClassName={(record) => { return record.id == this.state.entity.id ? 'row-selected' : '' } }
                                onRowClick={this.handleRowClick}/>
                        </div>
                    </Col>
                </Row>
                <div></div>
            </Modal>
        </div>
    }
});
searchForm = createForm()(searchForm);

module.exports = searchForm;
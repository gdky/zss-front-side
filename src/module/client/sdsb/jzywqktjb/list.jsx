import React from 'react'
import {Table, Row, Col, Button, Icon, notification, Alert} from 'antd'
import Panel from 'component/compPanel'
import req from 'reqwest';
import SearchForm from './searchForm'
import merge from 'lodash/merge';
import config from 'common/configuration'
import {isEmptyObject,jsonCopy} from 'common/utils'
import auth from 'common/auth'

const ToolBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const list = React.createClass({
    //初始化默认参数
    getDefaultProps(){
        let jgId = auth.getJgid();
        return {
            //接收的json数据中用来充当key的字段名
            keyCol: 'id',
            //默认每页显示数量
            pageSize: 10,
            //数据来源api
            apiUrl: config.HOST + config.URI_API_PROJECT + `/client/jzywqktjb`,
            //初始搜索条件
            defaultWhere:{},
            //栏目名称
            title:'鉴证业务情况表',
            //帮助信息title
            helperTitle:'使用说明',
            //帮助信息详细
            helperDesc:<div>
                <p>1.本表统计数据截至为统计年度的12月31日，上报截止期为次年3月31日。</p>
                <p>2.“企业汇算清缴总户数”是指税务机关掌握的本地区企业所得税汇算清缴的总户数。</p>
                <p>3.“调增应纳所得税额”和“调减应纳所得税额”的填报口径：以纳税人为计算单位，对同一纳税人，根据税务师事务所为纳税人实际调增或调减的应纳税额之差的绝对值填列。如调增大于调减，在“调增应纳所得税额”栏中填报；调减大于调增，在“调减应纳所得税额”栏中填报。对不同纳税人，应按税务师事务所为不同纳税人实际调增或调减的应纳税额之差的绝对值，在“调增应纳所得税额”和“调减应纳所得税额”栏中分别填报，不能相抵。</p>
                <p>4.“所得税汇算清缴鉴证业务”金额=“调增应纳所得税额”金额+“调减应纳所得税额”金额。</p>
                <p>5.在“其他鉴证业务小计”明细项目中的“（四）其他”，反映不属于“其他鉴证业务小计”中（一）、（二）、（三）明细项目的其他鉴证业务情况。</p>
                <p>6.“其他鉴证业务小计”=“其中：(一)高新技术企业认定鉴证业务”+“(二)企业注销税务登记税款清算鉴证业务”+“(三)研发费加计扣除鉴证业务”+“（四）其他”</p>
                <p>7.单位：万元（精确到小数点后两位）、户。</p>
            </div>
        }
    },
    //初始化state
    getInitialState(){
        return {
            loading: false,
            data: [],
            entity: {},
            where: this.props.defaultWhere,
            searchToggle: false,
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: this.props.pageSize,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '40'],
                showTotal (total) {
                    return `共 ${total} 条`
                }
            }
        }
    },
    //通过API获取数据
    fetchData(params = {page: 1, pagesize: this.props.pageSize}){
        this.setState({loading: true});
        const token = auth.getToken();
        const {apiUrl,defaultWhere} = this.props;
        let where = merge(jsonCopy(defaultWhere),params.where);
        if(!isEmptyObject(where)){
            params.where = encodeURIComponent(JSON.stringify(where))
        }
        req({
            url: apiUrl,
            type: 'json',
            method: 'get',
            data: params,
            headers: {'x-auth-token': token}
        }).then(resp=> {
            const p = this.state.pagination;
            p.current = params.page;
            p.pageSize = params.pagesize;
            p.total = resp.total > 1000 ? 1000 : resp.total;
            p.showTotal = total => {
                return `共 ${resp.total} 条，显示前 ${total} 条`
            };
            this.setState({data: resp.data, pagination: p, loading: false,where:where})
        }).fail(e=> {
            this.setState({loading: false});
            notification.error({
                duration: 2,
                message: '数据读取失败',
                description: '可能网络访问原因，请稍后尝试'
            });
        })
    },

    //改变页码
    handleChange(pagination, filters, sorter){
        let param = {
            page: pagination.current,
            pagesize: pagination.pageSize,
            where:this.state.where
        };
        this.fetchData(param)
    },

    //查询按钮开关
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle});
    },
    //查询提交
    handleSearchSubmit(values){
        const p = this.state.pagination;
        const param = {
            page: 1,
            pagesize: p.pageSize,
            where: values
        };
        this.fetchData(param);
    },
    //添加
    handleNew(){
        this.props.onNew();
    },

    //刷新按钮
    handleRefresh(){
        const p = this.state.pagination;
        this.fetchData({page:1, pagesize: p.pageSize});
    },
    //刷新当前页
    refreshCurrent(){
        const p = this.state.pagination;
        this.fetchData({page: p.current, pagesize: p.pageSize});
    },

    //帮助按钮开关
    helperToggle(){
        this.setState({helper: !this.state.helper})
    },
    //手动关闭帮助提示
    helperClose(){
        this.setState({helper: false})
    },
    //组件加载时读取数据
    componentDidMount(){
        if(isEmptyObject(this.props.stateShot)){
            this.fetchData();
        }else{
            this.setState({...this.props.stateShot})
        }
    },
    //unmount时记录目前状态
    componentWillUnmount(){
        this.props.grabState(this.state)
    },
    //行点击处理
    handleRowClick(record){
        this.state.entity = record;
        this.setState({entity:record})
    },
    render(){
        const {title, helperTitle, helperDesc, scrollx,keyCol,columns} = this.props;
        let toolbar = <ToolBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                    <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>

            <ButtonGroup>
                <Button  onClick={this.helperToggle}><Icon type="question"/></Button>
                <Button  onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>

            <ButtonGroup>
                <Button type="primary" onClick={this.handleNew}><Icon type="file-text" /> 添加</Button>
            </ButtonGroup>
        </ToolBar>;
        return <div>
            {this.state.helper && <Alert message={helperTitle}
                                         description={helperDesc}
                                         type="info"
                                         closable
                                         onClose={this.helperClose}/>}
            <Panel title={title} toolbar={toolbar}>
                {this.state.searchToggle && <SearchForm
                    onSubmit={this.handleSearchSubmit}/>}
                <Table columns={columns}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleChange}
                       rowKey={record => record[keyCol]}
                       rowClassName={(record)=>{return record.id==this.state.entity.id?'row-selected':''}}
                       onRowClick={this.handleRowClick} scroll={{x: scrollx}}/>
            </Panel>
        </div>

    }
});

module.exports = list;
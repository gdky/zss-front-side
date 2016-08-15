import React from 'react'
import {Table,Modal,Button,Spin,notification,Icon,Tab} from 'antd'
import Panel from 'component/compPanel'
import SearchForm from './searchForm.jsx'
import req from 'reqwest'

import {jsonCopy} from 'common/utils.js'

const PanelBar = Panel.ToolBar;
const ButtonGroup = Button.Group;

const list = React.createClass({
    getInitialState(){
        return {
            searchToggle: false,
            helper: false
        }
    },
    handleHelper(){
        this.setState({helper: !this.state.helper})
    },
    handleRefresh(){
        this.props.onRefresh()
    },
    handleSearchToggle(){
        this.setState({searchToggle: !this.state.searchToggle})
    },

    render(){
        const panelBar = <PanelBar>
            <Button onClick={this.handleSearchToggle}>
                <Icon type="search"/>查询
                { this.state.searchToggle ? <Icon className="toggle-tip" type="circle-o-up"/> :
                  <Icon className="toggle-tip" type="circle-o-down"/>}
            </Button>

            <ButtonGroup>
                <Button type="primary" onClick={this.handleHelper}><Icon type="question"/></Button>
                <Button type="primary" onClick={this.handleRefresh}><Icon type="reload"/></Button>
            </ButtonGroup>
        </PanelBar>;
        return <Spin spinning={false}>
            <Panel title="业务记录" toolbar={panelBar}>
                {this.state.searchToggle && <SearchForm
                    onSubmit={this.props.onSubmit}/>}
                <Table className="outer-border"
                       {...this.props}
                       rowKey={record => record.ID}/>
            </Panel>
        </Spin>
    }
});

module.exports = list;
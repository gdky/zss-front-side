import React from 'react'
import KhxxList from './list'
import QueueAnim from 'rc-queue-anim'
import KhxxNew from './new.jsx'
import './style.css'


//客户信息
const khxxgl = React.createClass({
    getInitialState(){
        return {
            isSaved: false,
            entity: {},
            type: 'add'
        }
    },
    refreshList(){
        this.refs.list.handleRefresh()

    },
    handleEditSave(boolean){
        this.setState({isSaved: true,type:'add'})
    },
    handleEdit(record){
        this.setState({entity: record, type: 'update'})
    },
    handleUpdateReset(){
      this.setState({type:'add',entity:{}});
    },

    render(){
        return <div className="khxxgl">
            <div className="wrap">
                <KhxxNew onSaved={this.handleEditSave}
                         data={this.state.entity}
                         type={this.state.type}
                         onReset={this.handleUpdateReset}
                         refresh={this.refreshList}/>
                <KhxxList onEdit={this.handleEdit} onDel={this.handleDel} ref="list"/>
            </div>
        </div>
    }
});

module.exports = khxxgl;
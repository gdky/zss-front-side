import React from 'react'
import ReactDom from 'react-dom'
import {Spin,Icon,Row,Col} from 'antd'
import './style.css'

const ywlxTable = React.createClass({
    //渲染空数据
    getEmptyText() {
    const data = this.props.dataSource;
    return !data.length ? (
      <div className={`ant-table-empty`}>
        <span><Icon type="frown" />暂无数据</span>
      </div>
    ) : null;
    },
    render(){
        const data=this.props.dataSource;
        const datalist=data.list;
        const headerColumns=this.props.header;
        const columns=this.props.columns;
        let headerCount = headerColumns.length;//表头列的个数
        let colCount = columns.length;//数据列的个数
        const colgroup = [];
        const th=[];
        const tr = [];
        let td = [];
        //渲染colgroup
        for (let i = 0; i < colCount; i++) {
            colgroup.push(<col key={columns[i].key}></col>);
        }
        //渲染表头
        for(let i=0;i<headerColumns.length;i++){
            let key=headerColumns[i].key;
            td.push(<th key={key} >{data[key]}</th>);
        }
        th.push(<tr key={0}>{td}</tr>);
        td=[];
        //渲染表数据
        if(!datalist||datalist.length==0){
            td.push(<td key="empty"  colSpan={headerCount} style={{height:"100px"}}>
            {this.getEmptyText()}
            </td>);
            tr.push(<tr className="ant-table-row  ant-table-row-level-0" >{td}</tr>);
            td=[];
        }else{
            for(let i=0;i<datalist.length;i++){
                let record=datalist[i];
                let index=i;
                let key=index;
                const rowKey=this.props.rowKey;
                if(typeof rowKey === 'function'){
                    key=rowKey(record,index);
                }else{
                    key=typeof record[rowKey] !== 'undefined' ? record[rowKey] : index;
                }
                for(let j=0;j<colCount;j++){
                    let column=columns[j];
                    const { dataIndex, render, className = '',colSpan} = column;
                    let text = record[dataIndex];
                    if (render) {
                        text = render(text, record, index);
                    }
                    td.push(<td key={column.key} colSpan={colSpan}>{text}</td>);
                }
                tr.push(<tr key={key} className="ant-table-row  ant-table-row-level-0">{td}</tr>);
                td=[];
            }
        }
        return <Spin spinning={this.props.loading}>
        <div>
        <Row type="flex" justify="space-around" align="middle">
        <Col span={10}>
        <div className={"ywlx-table" + (this.props.bordered?' table-bordered ':' ')}>
        <table>
        <colgroup>{colgroup}</colgroup>
        <thead>{th}</thead>
        <tbody>{tr}</tbody>
        </table>
        </div>
        </Col>
        </Row>
        </div>
        </Spin>
    }
}
);

module.exports=ywlxTable; 
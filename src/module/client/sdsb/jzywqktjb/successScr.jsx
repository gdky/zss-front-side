import React from 'react'
import {Alert} from 'antd'

const c = React.createClass({
    getDefaultProps(){
        return{
            type:'save'
        }
    },

    render(){
        const {type,text} = this.props;
        let element = {};
        element.commit = <Alert message="操作成功"
                             description={<div>
                                 <p>报表数据已提交</p>
                             </div>}
                             type="success" />;
        element.save =  <Alert message="操作成功"
                               description={<div>
                                   <p>报表数据已保存</p>
                               </div>}
                               type="success" />;

        return <div className="success-scr">
            {element[type]}
        </div>
    }
});

module.exports = c;
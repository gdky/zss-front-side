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
                                 <p>参会人员名单已提交，可从列表“回执”查看报名人员名单</p>
                             </div>}
                             type="success" />;
        element.save =  <Alert message="操作成功"
                               description={<div>
                                   <p>参会人员名单已更新，可从列表“回执”查看报名人员名单</p>
                               </div>}
                               type="success" />;

        return <div className="success-scr">
            {element[type]}
        </div>
    }
});

module.exports = c;
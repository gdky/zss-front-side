import React from 'react'
import {Alert} from 'antd'

const c = React.createClass({
    getDefaultProps(){
        return{
            type:'add',
            data:{}
        }
    },

    render(){
        const {type,data} = this.props;
        let element = {};
        element.add = <Alert message="报备添加成功"
                             description={<div>
                                 <p>业务报备编号 ： {data.bbhm}</p>
                                 <p>验证码 ： {data.yzm}</p>
                             </div>}
                             type="success" />;
        element.edit =  <Alert message="报备修改成功"
                               description={<div>
                                   <p>报备信息已更新</p>
                               </div>}
                               type="success" />;

        return <div className="sucz-scr">
            {element[type]}
        </div>
    }
});

module.exports = c;
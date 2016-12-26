import React from 'react'
import {Alert} from 'antd'

const c = React.createClass({
    render(){
        const {text} = this.props;

        let element = <Alert message="操作失败"
                             description={<div>
                                 <p>网络故障，无法读取基本信息数据，请返回。</p>
                                 <p>或请稍后再尝试。</p>
                             </div>}
                             type="error" />;
        if(!!text){
            element  = <Alert message="操作失败"
                              description={<div>{text}</div>}
                              type="error" />;
        }

        return <div className="fail-scr">
            {element}
        </div>
    }
});

module.exports = c;
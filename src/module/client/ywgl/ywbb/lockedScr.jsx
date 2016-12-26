import React from 'react'
import {Alert} from 'antd'

const c = React.createClass({
    render(){
        const {data} = this.props;
        let content = data.map((item,i)=> <Alert key={i}
            message="事务所报备资质被锁定"
            description={<div><p><b>被锁原因：{item.sdyy}</b></p><p>被锁时间：{item.sdtime}</p><p>锁定人:{item.sdr_role}</p></div>}
            type="warning"
        />);
        return <div>
            {content}
        </div>
    }
});

module.exports = c;
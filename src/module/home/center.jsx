import React from 'react';
import {Button} from 'antd'

const home = React.createClass({
    handleClick(){
        window.open("http://localhost:8080/html/jzbgfm+id")
    },
    render(){
        return <div className="wrap">
            管理端主页
            <Button onClick={this.handleClick}>打印</Button>
        </div>
    }
})

module.exports = home;
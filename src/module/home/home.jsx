import React from 'react'
import {Row, Col} from 'antd'
import auth from 'common/auth'
import Client from './client'
import Center from './center'

const c = React.createClass({
    render(){
        console.log(this.props.route.role)
        let out = '';
        let role = auth.getAuthorization().role;
        if (role == 3) {
            out = <Client/>
        } else if ((role <16 && role>10) || role == 101){
            out = <Center/>
        }

        return <div>{out}</div>;
    }
});

module.exports = c;
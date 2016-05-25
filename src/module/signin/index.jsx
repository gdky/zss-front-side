import React from 'react'
import LoginForm from './loginForm'
import req from 'reqwest'
import config from 'common/configuration'
import store from 'store2'
import {withRouter} from 'react-router'
import {Alert} from 'antd'

const API_URL = config.HOST + config.URI_API_FRAMEWORK + '/auth';

const signin = withRouter(React.createClass({
    getInitialState(){
        return {
            loading: false,
            authFail:false,
            authFailMes:''
        }
    },

    handleSubmit(value){
        this.setState({loading: true});
        req({
            url: API_URL,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(value)
        }).then(resp=> {
            for (let prop in resp) {
                store.set(prop, resp[prop]);
            }
            const { location } = this.props;

            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname)
            } else {
                this.props.router.replace('/')
            }
        }).fail((e)=>{
            let errMsg ;
            if(e.status == 401 || e.status == 403){
                errMsg = JSON.parse(e.response)
            }else{
                errMsg = "登录失败";
            }
            this.setState({
                loading:false,
                authFail:true,
                authFailMes:errMsg
            });
        })

    },
    componentWillMount(){
        if(store.get("token")){
            this.props.router.replace('/')
        }
    },
    render(){
        return <div className="sign-in">
            <LoginForm onSubmit={this.handleSubmit} loading={this.state.loading}/>
            <div className="feedback">
                {this.state.authFail &&
                <Alert
                  message={this.state.authFailMes}
                  type="error" showIcon />}
            </div>
        </div>
    }
}));


module.exports = signin;
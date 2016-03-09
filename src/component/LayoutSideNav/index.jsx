/**
 * 主界面侧栏导航组件
 * @datasource  api/fw/asidemenu
 * props.dataSource 菜单数据
 * @export LayoutSideNav
 */

import React from 'react';
import { Menu, Icon} from 'antd';
import "./index.css";

const SubMenu = Menu.SubMenu;

//使用es6语法定义组件
class LayoutSideNav extends React.Component{

    //在构造器中初始化state，不使用getInitialState()
    constructor(props) {
        super(props);
        this.state = {
            current:'1',
            openKeys:[]
        }
        this.dataSource = props.dataSource;
    }

    //load:this.props.load , //'lazy','all'
    handleClick(e) {
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1)
        });
    }
    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    }

    //产生无限分类菜单
    renderMenu(data) {
        return data.map(function (item) {
            if (item.children) {
                return <SubMenu key={item.id} title={item.name}>{renderMenu(item.children)}</SubMenu>;
                renderMenu(item.children);
            } else {
                return <Menu.Item key={item.id}><a href={item.href}>{item.name}</a></Menu.Item>
            }
        });
    }
    render() {
        return (
            <Menu onClick={this.handleClick.bind(this)}
                  openKeys={this.state.openKeys}
                  onOpen={this.onToggle}
                  onClose={this.onToggle}
                  selectedKeys={[this.state.current]}
                  mode="inline">
                {this.renderMenu(this.dataSource)}
            </Menu>
        );
    }
}

//兼容IE8的模块导出写法
module.exports = LayoutSideNav;
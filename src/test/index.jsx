/**
 * Created by ming on 2016/3/9.
 */
import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const __level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(__level, key, tns[index].children);
    });
};
generateData(z);

const Demo = React.createClass({
    getInitialState() {
        return {
            gData,
            expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
        };
    },
    onDragEnter(info) {
        console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    },
    onDrop(info) {
        console.log(info);
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = [...this.state.gData];
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });
        if (info.dropToGap) {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            ar.splice(i, 0, dragObj);
        } else {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        }
        this.setState({
            gData: data,
        });
    },
    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.key} title={item.key} />;
        });
        return (
            <Tree defaultExpandedKeys={this.state.expandedKeys} openAnimation={{}} draggable
                  onDragEnter={this.onDragEnter}
                  onDrop={this.onDrop}>
                {loop(this.state.gData)}
            </Tree>
        );
    },
});

ReactDOM.render(<Demo />,document.getElementById('react-content'));
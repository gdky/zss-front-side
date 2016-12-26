import React from 'react'
import {Tabs,Icon,Alert} from 'antd'
import YwbbGl from './ywbbGl.jsx'
import NewYwbb from './newYwbb.jsx'
import './style.css'

const TabPane = Tabs.TabPane;

const ywbb = React.createClass({
    getDefaultProps(){
        return {
            helperTitle:'使用说明',
            //帮助信息详细
            helperDesc:<div>
                <p>1.点击“查询”，可打开条件框进行查询操作；点击“刷新”按钮，可以更新业务情况列表。</p>
                <p>2.点击“添加”，可添加新的业务报备记录，业务报备中的必填项目必须全部按要求填满才能进行保存或报备操作。</p>
                <p>3.进行报备操作后的30天内，可以进行收费或修改操作</p>
                <p>4.超过30天后，必须把已报备记录申请退回，才能进行修改操作</p>
                <p>5.状态为“保存”的业务记录可以自行删除。</p>
                <p><b>6.打印封面时，请先在浏览器的打印设置中，把“页眉/页脚”设置为不显示，把打印内容缩放设置为“按实际/100%/不缩放”</b></p>
            </div>
        }
    },
    getInitialState(){
        return {
            data:[],
            pagination: {
                current: 1,
                showSizeChanger: true,
                pageSize: 10,
                showQuickJumper: true,
                pageSizeOptions: ['5', '10', '20']

            }
        }
    },
    refreshList(){
        this.refs.ywgl.refreshList()
    },

    render(){
        const {helperTitle,helperDesc} = this.props;
        return <div className="client-ywbb">
            <div className="wrap">
                <Alert message={helperTitle}
                       description={helperDesc}
                       type="info"
                       closable/>
                <Tabs type="card">
                    <TabPane tab="业务报备记录" key="1">
                        <YwbbGl ref="ywgl" />
                    </TabPane>
                    <TabPane tab= {<span><Icon type="plus-circle-o" />添加</span>} key="2">
                        <NewYwbb refreshList={this.refreshList}/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    }
});

module.exports = ywbb;
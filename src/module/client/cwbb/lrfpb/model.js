/**
 * Created by ming on 2016/4/11.
 */
import React from 'react'
import {Button, Icon} from 'antd'
import numeral from 'numeral'
var model = {
     
    columns: [
        { title: '序号', dataIndex: 'key', key: 'key' },
        { title: '事务所名称', dataIndex: 'DWMC', key: 'DWMC' },
        { title: '年度', dataIndex: 'nd', key: 'nd' },
        { title: '状态', key: 'ZTBJ', dataIndex: 'ZTBJ' },

        {
            title: '操作',
            key: 'operation',
            render(text, record, index) {
                return (
                    <span>
                        <Button size="small" onClick={this.handleRowButton} >
                            <Icon type="edit" />编辑
                        </Button>

                        <Button size="small" >
                            <Icon type="arrow-up" />提交
                        </Button>

                        <Button size="small" >
                            <Icon type="book" />查看
                        </Button>


                    </span>
                );
            }
        }
    ],

    entityModel: [
        {
            id: 'JLR',
            name: '净利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        }, 
        {
            id: 'NCWFPLR',
            name: '年初未分配利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        }, 
        {
            id: 'QTZR',
            name: '其他转入',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'KFPLR',
            name: '可供分配的利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'YYGJ',
            name: '提取盈余公积',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'NCWFPLRUPYEAR',
            name: '年初未分配利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JLFLJJ',
            name: '提取职工奖励福利基金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CBJJ',
            name: '提取储备基金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'QYFZJJ',
            name: '提取企业发展基金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'LRGHTZ',
            name: '利润归还投资',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZZFPLR',
            name: '可供投资者分配的利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'YXGL',
            name: '减：应付优先股股利',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'PTGL',
            name: '应付普通股股利',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'ZHPTGL',
            name: '转作资本（或股本）的普通股股利',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'WFPLR',
            name: '四、未分配利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JLRUPYEAR',
            name: '净利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        }, 
        {
            id: 'NCWFPLRUPYEAR',
            name: '年初未分配利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        }, 
        {
            id: 'QTZRUPYEAR',
            name: '其他转入',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'KFPLRUPYEAR',
            name: '可供分配的利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'YYGJUPYEAR',
            name: '提取盈余公积',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'NCWFPLRUPYEARUPYEAR',
            name: '年初未分配利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JLFLJJUPYEAR',
            name: '提取职工奖励福利基金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'CBJJUPYEAR',
            name: '提取储备基金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'QYFZJJUPYEAR',
            name: '提取企业发展基金',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'LRGHTZUPYEAR',
            name: '利润归还投资',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'TZZFPLRUPYEAR',
            name: '可供投资者分配的利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'YXGLUPYEAR',
            name: '减：应付优先股股利',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'PTGLUPYEAR',
            name: '应付普通股股利',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'ZHPTGLUPYEAR',
            name: '转作资本（或股本）的普通股股利',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'WFPLRUPYEAR',
            name: '四、未分配利润',
            render(num) {
                return numeral(num).format('0,0.00')
            }
        },
        {
            id: 'JSSJ',
            name: '结束时间',
            render(num) {
                let date = new Date(num);
                return date.toLocaleDateString()
            }
        },
        {
            id: 'TJRQ',
            name: '提交日期',
            render(num) {
                let date = new Date(num);
                return date.toLocaleDateString()
            }
        }
    ]

};

module.exports = model;
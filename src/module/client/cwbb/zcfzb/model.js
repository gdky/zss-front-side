/**
 * Created by ming on 2016/4/11.
 */
import React from 'react'
import {Button ,Icon } from 'antd'
var model = {
    // handleRowButton(){},

    columns: [
        {title: '序号', dataIndex: 'key', key: 'key'},
        {title: '结束时间', dataIndex: 'JSSJ', key: 'JSSJ'},
        {title: '事务所名称', dataIndex: 'DWMC', key: 'DWMC'},
        {title: '年度', dataIndex: 'nd', key: 'nd'},
        {title: '状态', key: 'ZTBJ', dataIndex: 'ZTBJ'},
       
        {
        title: '操作',
    key: 'operation',
     render(text,record,index) {
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
            id: 'JSSJ',
            name: '结束时间',
            render(num){
                let date = new Date(num);
               
                return date.toLocaleDateString()
            }
        },
       
    ]

};

module.exports = model;
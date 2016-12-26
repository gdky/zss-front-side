const autoformba = {
   colGroupNum: 2,
  props: [
    {id:'BT',
     name: '标题：',required:true,groupspan:2,width:'50%' 
    }, {id:'PXDD',
     name: '培训地点：',required:true,groupspan:2,width:'50%' 
    },  {id:'QS',
     name: '期数：',required:true,groupspan:2,inputType:'number'
    }, { id:'PXKSSJ',
     name:  '培训开始时间：',
     inputType:'date',required:true,type: 'date' ,groupspan:2
    },  { id:'PXJSSJ',
     name:  '培训结束时间：',
     inputType:'date',required:true,type: 'date' ,groupspan:2
    },  { id:'BMJZSJ',
     name:  '报名截止时间：',
     inputType:'date',required:true,type: 'date' ,groupspan:2
    }, {id:'PXDDDH',
     name: '培训地点电话：',required:true,groupspan:2
    },{id:'PXLXR',
     name: '培训联系人：',required:true,groupspan:2
    },{id:'PXNR',
     name:  '培训内容：',
     inputType:'wys',rows:20,groupspan:2,height:'700px'
    }, {id:'ZYSX',
     name:  '注意事项：',
     inputType:'wys',rows:20,groupspan:2 
    },  {id:'ZSYQ',
     name: '住宿要求：', inputType:'unInput',groupspan:2
    },{id:'ZAOC',
     name: '早餐（元/餐）：', 
    },  {id:'SRJ',
     name: '标准双人间（元/间）：', 
    },  {id:'WUC',
     name: '午餐（元/餐）：', 
    }, {id:'DRJ',
     name: '标准单人间（元/间）：', 
    },   {id:'WANC',
     name: '晚餐（元/餐）：', 
    }, {id:'HYFW',
     name: '会员服务：', inputType:'unInput',groupspan:2
    }, {id:'BGZJ',
     name: '宾馆总机：', 
    }, {id:'HWZDHHM',
     name: '会务组房间号码：', 
    }, 
    
  ]
}
const ryjl2 = {
rowNum:6,
startCol:1,
rows:[{ //设定列
  title: '起止年月', //设定该列名称
  dataIndex: 'qzny', //设定该列对应后台字段名
  key: 'qzny', //列key，必须设置，建议与字段名相同
}, {
  title: '何时何地单位工作学习及职称（职务）',
  dataIndex: 'xxxx',
  key: 'xxxx',
 
}, {
  title: '证明人',
  dataIndex: 'zmr',
  key: 'zmr',

}]}
const model = {
  autoformba:autoformba,
  ryjl2:ryjl2,
} 
module.exports = model
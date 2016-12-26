import React from 'react'
import './style.css'

const detailBox = React.createClass({

    render(){
        const obj = this.props.data;
  

        return <div className="fix-table table-bordered table-striped">
             <table>
         
            <tbody>
             <tr >
            <td colSpan="3">编制地区（单位）：{obj.DWMC}</td>
            <td colSpan="4">统计时间：{obj.A} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至：{obj.B}</td>
            
            <td >单位：元</td>
            </tr>
            </tbody>
               <colgroup>
            <col className ="col-4"></col>
            <col className="col-2"></col>
            <col className="col-2"></col>
            <col className="col-4"></col>
            <col className ="col-4"></col>
            <col className="col-2"></col>
            <col className="col-3"></col>
            <col className="col-3"></col>
            </colgroup>
            
            
            <tbody>
            <tr>
            <td>项目</td>
            <td>行次</td>
            <td>本期数</td>
            <td>本年累计数</td>
            <td>项目</td>
            <td>行次</td>
            <td>本期数</td>
            <td>本年累计数</td>
            </tr>

            <tr>
            <td>一、主营业务成本</td>
            <td>1</td>
            <td>{obj.ZYYWCB1}</td>
            <td>{obj.ZYYWCB}</td>
            <td>一、主营业务税金及附加</td>
            <td>17</td>
            <td>{obj.ZYYWSJFJ1}</td>
            <td>{obj.ZYYWSJFJ}</td>
            </tr>
            
             <tr>
            <td>&nbsp;&nbsp;&nbsp;1、工资费用</td>
            <td>2</td>
            <td>{obj.GZFY1}</td>
            <td>{obj.GZFY}</td>
            <td>三、其他业务支出</td>
            <td>18</td>
            <td>{obj.QTYWZC1}</td>
            <td>{obj.QTYWZC}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;2、福利费</td>
            <td>3</td>
            <td>{obj.FLF1}</td>
            <td>{obj.FLF}</td>
            <td>四、管理费用</td>
            <td>19</td>
            <td>{obj.GLFY1}</td>
            <td>{obj.GLFY}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;3、教育费</td>
            <td>4</td>
            <td>{obj.JYF1}</td>
            <td>{obj.JYF}</td>
            <td>&nbsp;&nbsp;&nbsp;1、工资费</td>
            <td>20</td>
            <td>{obj.GLFY_GZFY1}</td>
            <td>{obj.GLFY_GZFY}</td>
            </tr>
            
             <tr>
            <td>&nbsp;&nbsp;&nbsp;4、公会经费</td>
            <td>5</td>
            <td>{obj.GHJF1}</td>
            <td>{obj.GHJF}</td>
            <td>&nbsp;&nbsp;&nbsp;2、福利费</td>
            <td>21</td>
            <td>{obj.GLFY_FLF1}</td>
            <td>{obj.GLFY_FLF}</td>
            </tr>
            
             <tr>
            <td>&nbsp;&nbsp;&nbsp;5、社会统筹</td>
            <td>6</td>
            <td>{obj.SHTC1}</td>
            <td>{obj.SHTC}</td>
            <td>&nbsp;&nbsp;&nbsp;3、业务招待费</td>
            <td>22</td>
            <td>{obj.GLFY_YWZDF1}</td>
            <td>{obj.GLFY_YWZDF}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;6、办公费</td>
            <td>7</td>
            <td>{obj.BGF1}</td>
            <td>{obj.BGF}</td>
            <td>&nbsp;&nbsp;&nbsp;4、办公费</td>
            <td>23</td>
            <td>{obj.GLFY_BGF1}</td>
            <td>{obj.GLFY_BGF}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;7、差旅费</td>
            <td>8</td>
            <td>{obj.CLF1}</td>
            <td>{obj.CLF}</td>
            <td>&nbsp;&nbsp;&nbsp;5、其他税金</td>
            <td>24</td>
            <td>{obj.GLFY_QTSJ1}</td>
            <td>{obj.GLFY_QTSJ}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;8、会费</td>
            <td>9</td>
            <td>{obj.HF1}</td>
            <td>{obj.HF}</td>
            <td>&nbsp;&nbsp;&nbsp;6、汽车费用</td>
            <td>25</td>
            <td>{obj.GLFY_QCFY1}</td>
            <td>{obj.GLFY_QCFY}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;9、培训及资料费</td>
            <td>10</td>
            <td>{obj.PXZLF1}</td>
            <td>{obj.PXZLF}</td>
            <td>&nbsp;&nbsp;&nbsp;7、职业风险基金</td>
            <td>26</td>
            <td>{obj.GLFY_ZYFXJJ1}</td>
            <td>{obj.GLFY_ZYFXJJ}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;10、会务费</td>
            <td>11</td>
            <td>{obj.HWF1}</td>
            <td>{obj.HWF}</td>
            <td>&nbsp;&nbsp;&nbsp;8、职业责任保险</td>
            <td>27</td>
            <td>{obj.GLFY_ZYZRBX1}</td>
            <td>{obj.GLFY_ZYZRBX}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;11、租凭费</td>
            <td>12</td>
            <td>{obj.ZPF1}</td>
            <td>{obj.ZPF}</td>
            <td>&nbsp;&nbsp;&nbsp;9、差旅费</td>
            <td>28</td>
            <td>{obj.GLFY_CLF1}</td>
            <td>{obj.GLFY_CLF}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;12、折旧</td>
            <td>13</td>
            <td>{obj.ZJ1}</td>
            <td>{obj.ZJ}</td>
            <td>&nbsp;&nbsp;&nbsp;10、其他费用</td>
            <td>29</td>
            <td>{obj.GLFY_QTFY1}</td>
            <td>{obj.GLFY_QTFY}</td>
            </tr>
            
             <tr>
            <td>&nbsp;&nbsp;&nbsp;13、住房公积金</td>
            <td>14</td>
            <td>{obj.ZFGJJ1}</td>
            <td>{obj.ZFGJJ}</td>
            <td>五、财务费用 </td>
            <td>30</td>
            <td>{obj.CWFY1}</td>
            <td>{obj.CWFY}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;14、顾问咨询费</td>
            <td>15</td>
            <td>{obj.GWZXF1}</td>
            <td>{obj.GWZXF}</td>
            <td>六、营业外支出 </td>
            <td>31</td>
            <td>{obj.YYWZC1}</td>
            <td>{obj.YYWZC}</td>
            </tr>
            
            <tr>
            <td>&nbsp;&nbsp;&nbsp;15、其他</td>
            <td>16</td>
            <td>{obj.QT1}</td>
            <td>{obj.QT}</td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支出总计 </td>
            <td>32</td>
            <td>{obj.ZCZJ1}</td>
            <td>{obj.ZCZJ}</td>
            </tr>
            </tbody>
            
            <tbody>
            <tr >
            <td colSpan="3">所长（主任）：{obj.SZ}</td>
            <td colSpan="2">主管会计：{obj.AGKJ}</td>
            <td colSpan="3">制表人：{obj.ZB}</td>
            </tr>
            </tbody>
            
          

            
            </table>
        </div>
    }
});

module.exports = detailBox;
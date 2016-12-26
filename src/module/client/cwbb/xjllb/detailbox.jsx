import React from 'react'
import { Spin } from 'antd'
import './style.css'

const detailBox = React.createClass({

    render() {
        const obj = this.props.data;
        return <div className="fix-table table-bordered table-striped">
            <Spin spinning={this.props.loading}>
                <table>
                    <tbody>
                        <tr >
                            <td >编制地区（单位）：{obj.DWMC}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 时间：{obj.TJRQ}</td>
                            <td ></td>
                            <td colSpan="3">单位：元</td>
                        </tr>
                    </tbody>
                    <colgroup>
                        <col className="col-16"></col>
                        <col className="col-2"></col>
                        <col className="col-6"></col>
                    </colgroup>

                    <tbody>
                        <tr>
                            <td>项目</td>
                            <td>行次</td>
                            <td>金额</td>
                        </tr>

                        <tr>
                            <td>一、经营活动产生的现金流量：</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 销售商品、提供劳务收到的现金</td>
                            <td>1</td>
                            <td>{obj.JYHD_XJLR_XSLW}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 收到的税费返还</td>
                            <td>2</td>
                            <td>{obj.JYHD_XJLR_SKFH}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 收到的其它与经营活动有关的现金</td>
                            <td>3</td>
                            <td>{obj.JYHD_XJLR_QTJY}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 现金流入小计</td>
                            <td>4</td>
                            <td>{obj.JYHD_XJLR_XJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 购买商品、接收劳务支付的现金</td>
                            <td>5</td>
                            <td>{obj.JYHD_XJLC_GMLW}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 支付给职工以及为职工支付的现金</td>
                            <td>6</td>
                            <td>{obj.JYHD_XJLC_ZFZG}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 支付的各项税费</td>
                            <td>7</td>
                            <td>{obj.JYHD_XJLC_SF}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 支付的其它与经营活动有关的现金</td>
                            <td>8</td>
                            <td>{obj.JYHD_XJLC_QTJY}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 现金流出小计</td>
                            <td>9</td>
                            <td>{obj.JYHD_XJLC_XJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 经营活动产生的现金流量净额</td>
                            <td>10</td>
                            <td>{obj.JYHD_JE}</td>
                        </tr>

                        <tr>
                            <td>二、投资活动产生的现金流量：</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 收回投资所收到的现金</td>
                            <td>11</td>
                            <td>{obj.TZHD_XJLR_SHTZ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 取得投资收益所收到的现金</td>
                            <td>12</td>
                            <td>{obj.TZHD_XJLR_TZSY}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 处置固定资产、无形资产和其他长期资产所收回的现金净额</td>
                            <td>13</td>
                            <td>{obj.TZHD_XJLR_CZZC}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 收到其他与投资活动有关的现金</td>
                            <td>14</td>
                            <td>{obj.TZHD_XJLR_QTTZ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 投资活动现金流入小计</td>
                            <td>15</td>
                            <td>{obj.TZHD_XJLR_XJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 购建固定资产、无形资产和其他长期资产所支付的现金</td>
                            <td>16</td>
                            <td>{obj.TZHD_XJLC_GJZC}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 投资所支付的现金</td>
                            <td>17</td>
                            <td>{obj.TZHD_XJLC_TZ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 支付的其他与投资活动有关的现金</td>
                            <td>18</td>
                            <td>{obj.TZHD_XJLC_QTTZ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 投资活动现金流出小计</td>
                            <td>19</td>
                            <td>{obj.TZHD_XJLC_XJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 投资活动产生的现金流量净额</td>
                            <td>20</td>
                            <td>{obj.TZHD_JE}</td>
                        </tr>

                        <tr>
                            <td>三、筹资活动产生的现金流量：</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 吸收投资所收到的现金</td>
                            <td>21</td>
                            <td>{obj.CZHD_XJLR_XSTZ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 借款所收到的现金</td>
                            <td>22</td>
                            <td>{obj.CZHD_XJLR_JK}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 收到的其它与筹资活动有关的现金</td>
                            <td>23</td>
                            <td>{obj.CZHD_XJLR_QTCZ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 筹资活动现金流入小计</td>
                            <td>24</td>
                            <td>{obj.CZHD_XJLR_XJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 偿还债务所支付的现金</td>
                            <td>25</td>
                            <td>{obj.CZHD_XJLC_CHZW}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 分配股利、利润或偿付利息所支付的现金</td>
                            <td>26</td>
                            <td>{obj.CZHD_XJLC_FPLR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 支付的其它与筹资活动有关的现金</td>
                            <td>27</td>
                            <td>{obj.CZHD_XJLC_QTCZ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 筹资活动现金流出小计</td>
                            <td>28</td>
                            <td>{obj.CZHD_XJLC_XJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp; 筹资活动产生的现金流量净额</td>
                            <td>29</td>
                            <td>{obj.CZHD_JE}</td>
                        </tr>

                        <tr>
                            <td>四、汇率变动对现金的影响</td>
                            <td>30</td>
                            <td>{obj.HLBDYX}</td>
                        </tr>

                        <tr>
                            <td>五、现金及现金等价物净增加额</td>
                            <td>31</td>
                            <td>{obj.XJJZZJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;补充资料</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;1、将净利润调节为经营活动的现金流量</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;补充资料净利润</td>
                            <td>32</td>
                            <td>{obj.BCZL_JLR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;加：计提的资产减值准备</td>
                            <td>33</td>
                            <td>{obj.BCZL_JTZCJZ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;固定资产折旧</td>
                            <td>34</td>
                            <td>{obj.BCZL_GDZCZJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;无形资产摊销</td>
                            <td>35</td>
                            <td>{obj.BCZL_WXZCTX}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;长期待摊费用摊销</td>
                            <td>36</td>
                            <td>{obj.BCZL_CQDTFY}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;待摊费用减少（减：增加）</td>
                            <td>37</td>
                            <td>{obj.BCZL_DTFYJS}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;预提费用减少（减：减少）</td>
                            <td>38</td>
                            <td>{obj.BCZL_YTFYJS}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;处置固定资产、无形资产和其他长期资产的损失（减：收益）</td>
                            <td>39</td>
                            <td>{obj.BCZL_ZCSS}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;固定资产报废损失</td>
                            <td>40</td>
                            <td>{obj.BCZL_GDZCBF}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;财务费用</td>
                            <td>41</td>
                            <td>{obj.BCZL_CWFY}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;投资损失（减：收益）</td>
                            <td>42</td>
                            <td>{obj.BCZL_TZSS}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;递延税款贷项（减：借项）</td>
                            <td>43</td>
                            <td>{obj.BCZL_DYSDDX}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;存货的减少（减：增加）</td>
                            <td>44</td>
                            <td>{obj.BCZL_CHJS}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;经营性应收项目的减少（减：增加）</td>
                            <td>45</td>
                            <td>{obj.BCZL_YSXMJS}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;经营性应付项目的增加（减：减少）</td>
                            <td>46</td>
                            <td>{obj.BCZL_YFXMZJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;其它</td>
                            <td>47</td>
                            <td>{obj.BCZL_QT}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;补充资料经营活动产生的现金流量净额</td>
                            <td>48</td>
                            <td>{obj.BCZL_XJLLJE}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;2、不涉及现金收支的投资和筹资活动：</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;债务转为资本</td>
                            <td>49</td>
                            <td>{obj.BCZL_ZWZWZB}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;一年内到期的可转换公司债券</td>
                            <td>50</td>
                            <td>{obj.BCZL_YNDQZJ}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;融资租入固定资产</td>
                            <td>51</td>
                            <td>{obj.BCZL_RZZRZC}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;3、现金及现金等价物净增加情况：</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;现金的期末余额</td>
                            <td>52</td>
                            <td>{obj.BCZL_XJQMYE}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;减：现金的期初余额</td>
                            <td>53</td>
                            <td>{obj.BCZL_XJQCYE}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;加：现金的等价物的期末余额</td>
                            <td>54</td>
                            <td>{obj.BCZL_XJDJWQMYE}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;减：现金等价物的期初余额</td>
                            <td>55</td>
                            <td>{obj.BCZL_XJDJWQCYE}</td>
                        </tr>

                        <tr>
                            <td>&nbsp;&nbsp;&nbsp;补充资料现金及现金等价物净增加额</td>
                            <td>56</td>
                            <td>{obj.BCZL_XJDJWJEZJ}</td>
                        </tr>

                    </tbody>
                </table>
            </Spin>
        </div>
    }
});

module.exports = detailBox;
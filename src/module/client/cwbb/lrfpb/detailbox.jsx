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
                        <tr className="bb-table-title">
                            <td colSpan="2">编制地区（单位）：{obj.DWMC}</td>
                            <td >时间：{obj.TJRQ}</td>
                            <td >单位：元</td>
                        </tr>
                    </tbody>
                    <colgroup>
                        <col className="col-12"></col>
                        <col className="col-2"></col>
                        <col className="col-5"></col>
                        <col className="col-5"></col>
                    </colgroup>

                    <tbody>
                        <tr>
                            <td>项目</td>
                            <td>行次</td>
                            <td>本年实际</td>
                            <td>上年实际</td>
                        </tr>

                        <tr>
                            <td>一、净利润</td>
                            <td>1</td>
                            <td>{obj.JLR}</td>
                            <td>{obj.JLRUPYEAR}</td>
                        </tr>

                        <tr>
                            <td> &nbsp; &nbsp; 加：年初未分配利润</td>
                            <td>2</td>
                            <td>{obj.NCWFPLR}</td>
                            <td>{obj.NCWFPLRUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; 其他转入</td>
                            <td>3</td>
                            <td>{obj.QTZR}</td>
                            <td>{obj.QTZRUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>二、可供分配的利润</td>
                            <td>4</td>
                            <td>{obj.KFPLR}</td>
                            <td>{obj.KFPLRUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; 减：提取盈余公积</td>
                            <td>5</td>
                            <td>{obj.YYGJ}</td>
                            <td>{obj.YYGJUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; 提取职工奖励福利基金</td>
                            <td>6</td>
                            <td>{obj.JLFLJJ}</td>
                            <td>{obj.JLFLJJUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; 提取储备基金</td>
                            <td>7</td>
                            <td>{obj.CBJJ}</td>
                            <td>{obj.CBJJUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; 提取企业发展基金</td>
                            <td>8</td>
                            <td>{obj.QYFZJJ}</td>
                            <td>{obj.QYFZJJUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; 利润归还投资</td>
                            <td>9</td>
                            <td>{obj.LRGHTZ}</td>
                            <td>{obj.LRGHTZUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>三、可供投资者分配的利润</td>
                            <td>10</td>
                            <td>{obj.TZZFPLR}</td>
                            <td>{obj.TZZFPLRUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; 减：应付优先股股利</td>
                            <td>11</td>
                            <td>{obj.YXGL}</td>
                            <td>{obj.YXGLUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; 应付普通股股利</td>
                            <td>12</td>
                            <td>{obj.PTGL}</td>
                            <td>{obj.PTGLUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>&nbsp; &nbsp; &nbsp; &nbsp; 转作资本（或股本）的普通股股利</td>
                            <td>13</td>
                            <td>{obj.ZHPTGL}</td>
                            <td>{obj.ZHPTGLUPYEAR}</td>
                        </tr>

                        <tr>
                            <td>四、未分配利润</td>
                            <td>14</td>
                            <td>{obj.WFPLR}</td>
                            <td>{obj.WFPLRUPYEAR}</td>
                        </tr>


                    </tbody>
                    <tbody>
                        <tr>
                            <td colSpan="2">单位负责人：{obj.DWFZR}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 财会负责人：{obj.CKFZR}  </td>
                            <td >复核：{obj.FHR}</td>
                            <td >制表人：{obj.ZBR}</td>
                        </tr>
                    </tbody>
                </table>
            </Spin>
        </div>
    }
});

module.exports = detailBox;
import React, { Component } from 'react';
import {
    Form,    Radio,
     Button,  Rate,message,Input
} from 'antd';

import './Form.css';
import $ from 'jquery'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const popArr=[
    {
        label:'毕晓琴',
        value:'毕晓琴'
    }, {
        label:'张成林',
        value:'张成林'
    }, {
        label:'王晓臣',
        value:'王晓臣'
    }, {
        label:'王凌海',
        value:'王凌海'
    }, {
        label:'吕成龙',
        value:'吕成龙'
    }, {
        label:'宫 辉',
        value:'宫 辉'
    }, {
        label:'蒋家斌',
        value:'蒋家斌'
    }, {
        label:'张 凯',
        value:'张 凯'
    }, {
        label:'李君永',
        value:'李君永'
    },{
        label:'王 辰',
        value:'王 辰'
    },{
        label:'王 宇',
        value:'王 宇'
    },{
        label:'闫佳男',
        value:'闫佳男'
    }
];
const popArr2=[
    {
        label:'王晓敏',
        value:'王晓敏'
    },{
        label:'王婷婷',
        value:'王婷婷'
    },{
        label:'陈梅燕',
        value:'陈梅燕'
    },{
        label:'胡 军',
        value:'胡 军'
    },{
        label:'刘 伟',
        value:'刘 伟'
    },{
        label:'王相武',
        value:'王相武'
    },{
        label:'王海丽',
        value:'王海丽'
    }
];
const popArr3=[
    {
        label:'徐大鹏',
        value:'徐大鹏'
    }, {
        label:'丛儒伟',
        value:'丛儒伟'
    },{
        label:'宋芳芳',
        value:'宋芳芳'
    },{
        label:'苏 丽',
        value:'苏 丽'
    },{
        label:'王怀祥',
        value:'王怀祥'
    },{
        label:'张一平',
        value:'张一平'
    },{
        label:'周 忱',
        value:'周 忱'
    },{
        label:'毕伟康',
        value:'毕伟康'
    }

];
const popArr4=[
    {
        label:'侯点波',
        value:'侯点波'
    },
    {
        label:'穆 升',
        value:'穆 升'
    }, {
        label:'孙 达',
        value:'孙 达'
    },{
        label:'陈新宇',
        value:'陈新宇'
    },{
        label:'王艺安',
        value:'王艺安'
    },{
        label:'孙元莹',
        value:'孙元莹'
    }
];


class Formsl extends Component{
    state={
        group:'',
        name:'',
        pingwei:''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var _self=this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //alert(JSON.stringify(values));
                $.ajax(
                    {
                        url:'/ScoreRecords/Create',
                        method:'post',
                        data:values
                    }

                ).done((data)=>{
                   console.log(data);
                    message.info('提交成功');
                    _self.setState({
                        group:'',
                        name:'',
                    })
                }).fail((err)=>{
                   console.log(err);
                    message.info('提交失败');
                    _self.setState({
                        group:'',
                        name:'',
                    })
                });
            }
        });
    }
    onChangeEvent=(e)=>{
       console.log(e);
       this.setState({
           group:e.target.value
       })

    }
    componentDidMount=(e)=>{
        var _self=this;

        /* eslint-disable */
        if(XuntongJSBridge){
            XuntongJSBridge.call('getPersonInfo',{},function (result) {
                if (typeof (result) == "string") {
                    result = JSON.parse(result);
                }
                //alert("用户数据："+JSON.stringify(result));
                _self.setState({
                    pingwei:result.data.name
                });
                _self.props.form.setFieldsValue({
                    pingwei:result.data.name
                });
            });
        }
        /* eslint-enable */

    }
    onChangeEvent2=(e)=>{
        console.log(e);
        this.setState({
            name:e.target.value
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return(
            <Form onSubmit={this.handleSubmit} className="form-echo">
                <FormItem
                    {...formItemLayout}
                    label="答辩组"
                >
                    {getFieldDecorator('Group',{
                        rules: [{ required: true, message: '请选择答辩组' }]
                    })(
                        <RadioGroup onChange={this.onChangeEvent} className="group-radio">
                            <Radio value="IT设施与软件开发服务">IT设施与软件开发服务</Radio>
                            <Radio value="ERP服务">ERP服务</Radio>
                            <Radio value="流程服务">流程服务</Radio>
                            <Radio value="综合服务">综合服务</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                {
                    this.state.group==='IT设施与软件开发服务'
                    && <FormItem
                        {...formItemLayout}
                        label="答辩人"
                    >
                        {getFieldDecorator('Name',{
                            rules: [{ required: true, message: '请选择答辩人' }]
                        })(
                            <RadioGroup options={popArr} onChange={this.onChangeEvent2} className="human-radio">
                            </RadioGroup>
                        )}
                    </FormItem>

                }
                {
                    this.state.group==='ERP服务'
                    && <FormItem
                        {...formItemLayout}
                        label="答辩人"
                    >
                        {getFieldDecorator('Name',{
                            rules: [{ required: true, message: '请选择答辩人' }]
                        })(
                            <RadioGroup options={popArr2} onChange={this.onChangeEvent2} className="human-radio">
                            </RadioGroup>
                        )}
                    </FormItem>

                }
                {
                    this.state.group==='流程服务'
                    && <FormItem
                        {...formItemLayout}
                        label="答辩人"
                    >
                        {getFieldDecorator('Name',{
                            rules: [{ required: true, message: '请选择答辩人' }]
                        })(
                            <RadioGroup options={popArr3} onChange={this.onChangeEvent2} className="human-radio">
                            </RadioGroup>
                        )}
                    </FormItem>

                }
                {
                    this.state.group==='综合服务'
                    && <FormItem
                        {...formItemLayout}
                        label="答辩人"
                    >
                        {getFieldDecorator('Name',{
                            rules: [{ required: true, message: '请选择答辩人' }]
                        })(
                            <RadioGroup options={popArr4} onChange={this.onChangeEvent2} className="human-radio">
                            </RadioGroup>
                        )}
                    </FormItem>

                }
                <FormItem
                    {...formItemLayout}
                    label="答辩评分"
                >
                    {getFieldDecorator('Score1', {
                        initialValue: 3,rules: [{ required: true, message: '请选择答辩评分' }]
                    })(
                        <Rate count={5} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="工作综合能力评分"
                >
                    {getFieldDecorator('Score2', {
                        initialValue: 3,rules: [{ required: true, message: '请选择工作综合能力评分' }]
                    })(
                        <Rate count={5} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label=""
                   >
                    {
                        getFieldDecorator('pingwei')
                        (<Input type="hidden"  className="hidden"/>)
                    }

                </FormItem>
                <FormItem
                    wrapperCol={{ span: 10, offset: 0 }}
                >
                    <Button className="button" type="primary" htmlType="submit" size="large">提交</Button>
                </FormItem>
            </Form>
        )
    }
}

const FormSubmit =Form.create()(Formsl);
export default FormSubmit;
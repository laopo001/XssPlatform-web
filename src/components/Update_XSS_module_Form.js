import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message, notification, Modal, Form, Input, Button, Row, Col, Menu, Dropdown, Icon, Table, Switch, Popconfirm } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
var CodeMirror = require('./Codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');

let uuid = 0;
var Update_XSS_module_Form = React.createClass({

    getInitialState() {
        return {};
    },
    componentWillUpdate(nextProps, nextState) {
        if (this.props.xss.Update_XSS_module_id == nextProps.xss.Update_XSS_module_id) {
            return;
        }
        if (nextProps.xss.Update_XSS_module_id == null) { return; }
        let obj = this.props.xss.XSS_modules.find((x) => {
            if (x.id == nextProps.xss.Update_XSS_module_id) {
                return true;
            }
        })
        this.props.form.setFieldsValue({
            keys: JSON.parse(obj.xssQuerys),
        });
        this.props.form.setFieldsValue({
            keys2: JSON.parse(obj.xssJsQuerys),
        });
        this.props.form.resetFields(["xssModuleName", "xssModuleDescribe", "xssModuleCode", "isPublic"]);
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            //  console.log(values);
            var obj = {};
            var xssQuerys = [];
            var xssJsQuerys = [];
            for (var x in values) {
                if (x.match(/xssQuerys/)) {
                    xssQuerys.push(values[x]);
                }
                if (x.match(/xssJsQuerys/)) {
                    xssJsQuerys.push(values[x]);
                }
            }
            obj.id = this.props.xss.Update_XSS_module_id;
            obj.isPublic = values.isPublic ? 1 : 0;
            obj.xssModuleName = values.xssModuleName;
            obj.xssModuleDescribe = values.xssModuleDescribe;
            obj.xssModuleCode = values.xssModuleCode;
            obj.xssQuerys = JSON.stringify(xssQuerys);
            obj.xssJsQuerys = JSON.stringify(xssJsQuerys);
            this.props.dispatch({
                type: 'xss/Update_XSS_module',
                payload: obj
            });

        });

    },
    xssModuleExists(rule, value, callback) {
        setTimeout(() => {
            callback();
        }, 300);
    },
    add() {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    },
    add2() {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys2');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys2: nextKeys,
        });
    },
    remove(k) {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    },
    remove2(k) {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys2');
        // We need at least one passenger
        // if (keys.length === 1) {
        //     return;
        // }

        // can use data-binding to set
        form.setFieldsValue({
            keys2: keys.filter(key => key !== k),
        });
    },
    // shouldComponentUpdate( nextProps,  nextState){
    //     if(nextProps.xss.Update_XSS_module_id==null||nextProps.xss.Update_XSS_module_Model==false){
    //         return false;
    //     }else{
    //         return true;
    //     }
    // },
    render() {
        if (this.props.xss.Update_XSS_module_id == null) { return <div></div> }
        let obj = this.props.xss.XSS_modules.find((x) => {
            if (x.id == this.props.xss.Update_XSS_module_id) {
                return true;
            }
        })
        // this.props.form.setFieldsValue({
        //     keys: obj.xssQuerys
        // });
        const { getFieldDecorator, getFieldValue, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: { span: 12, offset: 7 },
        };
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            var temp;
            if (typeof k === "number") { temp = ""; } else {
                temp = k;
            }
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                    label={index === 0 ? '服务器接收参数' : ''}
                    required={true}
                    key={k}
                    >
                    {getFieldDecorator(`xssQuerys-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "请输入参数名，或者删除",
                        }],
                        initialValue: temp
                    })(
                        <Input style={{ width: '60%', marginRight: 8 }} />
                        )}
                    <Icon
                        className="delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                        />
                </FormItem>
            );
        });

        const keys2 = getFieldValue('keys2');
        let formItems2 = keys2.map((k, index) => {
            var temp;
            if (index >= JSON.parse(obj.xssQuerys).length) { temp = ""; } else {
                temp = k;
            }
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                    label={index === 0 ? '配置参数' : ''}
                    required={false}
                    key={k}
                    >
                    {getFieldDecorator(`xssJsQuerys-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入参数名，或者删除",
                        }],
                        initialValue: temp
                    })(
                        <Input style={{ width: '60%', marginRight: 8 }} />
                        )}
                    <Icon
                        className="delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove2(k)}
                        />
                </FormItem>
            );
        });
        if (keys2.length === 0) {
            formItems2 = <FormItem
                {...formItemLayout}
                label={'配置参数'}
                required={false}
                >
                <Input disabled style={{ width: '60%', marginRight: 8 }} />
                <Icon
                    className="delete-button"
                    type="minus-circle-o"
                    />
            </FormItem>
        }


        return (
            <Modal title="修改模块" width={1000} visible={this.props.xss.Update_XSS_module_Model} footer={[]} onCancel={() => {
                this.props.dispatch({
                    type: 'xss/update',
                    payload: { Update_XSS_module_Model: false }
                })
            } }>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="模块名称"
                        hasFeedback
                        help={isFieldValidating('xssModuleName') ? '校验中...' : (getFieldError('xssModuleName') || []).join(', ')}
                        >
                        {getFieldDecorator('xssModuleName', {
                            rules: [
                                { required: true, message: '请填写模块名称' },
                                { validator: this.xssModuleExists },
                            ],
                            initialValue: obj.xssModuleName
                        })(<Input placeholder="请填写模块名称" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                        hasFeedback
                        >
                        {getFieldDecorator('xssModuleDescribe', {
                            rules: [
                                { required: true, whitespace: true, message: '请填写备注' },
                            ],
                            initialValue: obj.xssModuleDescribe
                        })(<Input placeholder="请填写备注" />)}


                    </FormItem>

                    {formItems}
                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> Add
                </Button>
                    </FormItem>
                    {formItems2}
                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="dashed" onClick={this.add2} style={{ width: '60%' }}>
                            <Icon type="plus" /> Add
                </Button>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否公开"
                        >
                        {getFieldDecorator('isPublic', { valuePropName: 'checked', initialValue: obj.isPublic })(
                            <Switch />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 3 }}
                        wrapperCol={{ span: 18 }}
                        required={true}
                        label="代码"
                        hasFeedback
                        >
                        {getFieldDecorator('xssModuleCode', {
                            rules: [
                                { required: true, whitespace: true, message: '请写下代码' },
                            ],
                            initialValue: obj.xssModuleCode
                        })(
                            //<Input placeholder="代码($projectId为项目id,{set.***}为***配置参数),如：(使用此模块时需要配置的参数，如参数名为user，则代码引用：{set.user})。" type="textarea" rows={4} />
                            <CodeMirror  options={{ lineNumbers:true,mode: 'javascript'}} />
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={this.handleSubmit} htmlType="submit">提交</Button>
                        <Popconfirm title="确定删除该模块吗?" onConfirm={() => {
                            this.props.dispatch({
                                type: 'xss/DELETE_XSS_module',
                                payload: {
                                    id: this.props.xss.Update_XSS_module_id
                                }
                            });
                        } } onCancel={() => { } } okText="Yes" cancelText="No">
                            <Button style={{ background: "red" }} type="ghost" size="large"><Icon type="delete" />删除</Button>
                        </Popconfirm>
                        
                    </FormItem>
                </Form>
            </Modal>
        );
    }
});

Update_XSS_module_Form = createForm()(Update_XSS_module_Form);
Update_XSS_module_Form = connect(({xss}) => {
    return { xss };
})(Update_XSS_module_Form);

export default Update_XSS_module_Form;

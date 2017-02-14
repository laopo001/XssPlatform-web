import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message, notification, Modal, Form, Input, Button, Row, Col, Menu, Dropdown, Icon, Table, Switch, Select } from 'antd';
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


var Create_XSS_projects_Form = React.createClass({

    getInitialState() {
        return {};
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            // console.log(this.props)
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log(values)
            this.props.dispatch({
                type: 'xss/Create_XSS_project',
                payload: values
            });
        });

    },
    xssProjectExists(rule, value, callback) {
        setTimeout(() => {
            callback();
        }, 300);
    },
    render() {
        const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        var arr=this.props.xss.XSS_modules.concat(this.props.xss.XSS_public_modules)
        var modules = arr.map((x, index) => {
            return <Option key={"modules" + x.id} value={x.id.toString()}>{x.xssModuleName}</Option>
        })
        return (
            <Modal title="创建项目" visible={this.props.xss.Create_XSS_project_Model} footer={[]} onCancel={() => {
                this.props.dispatch({
                    type: 'xss/update',
                    payload: { Create_XSS_project_Model: false }
                })
            } }>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="项目名称"
                        hasFeedback
                        help={isFieldValidating('xssProjectName') ? '校验中...' : (getFieldError('xssProjectName') || []).join(', ')}
                        >
                        {getFieldDecorator('xssProjectName', {
                            rules: [
                                { required: true, message: '请填写项目名称' },
                                { validator: this.xssProjectExists },
                            ],

                        })(<Input placeholder="请填写项目名称" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                        hasFeedback
                        >
                        {getFieldDecorator('xssProjectDescribe', {
                            rules: [
                                { required: true, whitespace: true, message: '请填写备注' },
                            ],
                        })(<Input placeholder="请填写备注" />)}


                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="模块选择"
                        >
                        {getFieldDecorator('xssModuleIDs', {
                            rules: [
                                { required: true, message: '请选择模块', type: 'array' },
                            ],
                        })(
                            <Select multiple placeholder="请选择模块">
                                {modules}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={this.handleSubmit} htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
});

Create_XSS_projects_Form = createForm()(Create_XSS_projects_Form);
Create_XSS_projects_Form = connect(({xss}) => {
    return { xss };
})(Create_XSS_projects_Form);

export default Create_XSS_projects_Form;
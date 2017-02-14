import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message, notification, Modal, Form, Input, Button, Row, Col, Menu, Dropdown, Icon, Table, Switch, Select } from 'antd';
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


var Update_XSS_projects_Form = React.createClass({

    getInitialState() {
        return {};
    },
    componentWillUpdate(nextProps, nextState) {
        if (this.props.xss.Update_XSS_project_id == nextProps.xss.Update_XSS_project_id) {
            return;
        }
        if (nextProps.xss.Update_XSS_project_id == null) { return; }
        this.props.form.resetFields(["xssProjectName", "xssProjectDescribe", "xssModuleIDs"]);
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            // console.log(this.props)
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            //console.log(values)
            values = Object.assign(values, { id: this.props.xss.Update_XSS_project_id })
            this.props.dispatch({
                type: 'xss/Update_XSS_project',
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
        if (this.props.xss.Update_XSS_project_id == null) { return <div></div> }

        const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        var arr = this.props.xss.XSS_modules.concat(this.props.xss.XSS_public_modules)
        var modules = arr.map((x, index) => {
            return <Option key={"modules" + x.id} value={x.id.toString()}>{x.xssModuleName}</Option>
        })
        var obj = this.props.xss.XSS_projects.find((x) => {
            if (this.props.xss.Update_XSS_project_id == x.id) {
                return true;
            }
        })

        return (
            <Modal title="修改项目" width={800} visible={this.props.xss.Update_XSS_project_Model} footer={[]} onCancel={() => {
                this.props.dispatch({
                    type: 'xss/update',
                    payload: { Update_XSS_project_Model: false }
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
                            initialValue: obj.xssProjectName
                        })(<Input placeholder="请填写项目名称" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                        hasFeedback
                        >
                        {getFieldDecorator('xssProjectDescribe', {
                            rules: [
                                { required: true,  message: '请填写备注' },
                            ],
                            initialValue: obj.xssProjectDescribe
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
                            initialValue: JSON.parse(obj.xssModuleIDs)
                        })(
                            <Select multiple placeholder="请选择模块" >
                                {modules}
                            </Select>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="JS网址"
                        >
                        <Input type="textarea" id="jsContent" onClick={(e) => {
                            var dom = e.target||e.srcElement;//对象是content 
                            dom.select(); //选择对象 
                            document.execCommand("Copy"); //执行浏览器复制命令
                            message.success("复制成功")
                        } } rows={2} onChange={()=>{}} value={location.origin + "/receive/GET_XSS_JS/" + obj.uuid}></Input>


                    </FormItem>


                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={this.handleSubmit} htmlType="submit">修改</Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
});

Update_XSS_projects_Form = createForm()(Update_XSS_projects_Form);
Update_XSS_projects_Form = connect(({xss}) => {
    return { xss };
})(Update_XSS_projects_Form);

export default Update_XSS_projects_Form;
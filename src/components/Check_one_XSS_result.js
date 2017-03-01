import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message, notification, Modal, Form, Input, Button, Row, Col, Menu, Dropdown, Icon, Table, Switch } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


let uuid = 0;
var Check_one_XSS_result = React.createClass({

    getInitialState() {
        return {};
    },
    componentWillUpdate(nextProps, nextState) {

    },
    handleSubmit(e) {
    },


    render() {
      //  const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        var  columns=[];
        columns=columns.concat(this.props.xss.one_project_xss.columns);
        columns.push('IP_address')
        var FormItemArr=columns.map((x,index)=>{
            var title,dataIndex;
            var arr=x.split("|");
            if(arr.length==1){
                title=x;
                dataIndex=x;
            }else{
                title=arr[1];
                dataIndex=arr[0];
            }
            return     <FormItem
                        key={index}
                        {...formItemLayout}
                        label={title}
                        
                        >
                       <Input placeholder=""  value={this.props.xss.Check_one_XSS_result_obj[dataIndex]} onClick={(e) => {
                            var dom = e.target||e.srcElement;//对象是content 
                            dom.select()   //选择对象 
                            if(window.getSelection().toString().length===0){
                                message.warning("复制失败")
                                return;
                            }
                            document.execCommand("Copy"); //执行浏览器复制命令
                            message.success("复制成功")
                        } } onChange={()=>{}}/>
                    </FormItem>
        })
        return (
            <Modal title="查看结果" width={1000} visible={this.props.xss.Check_one_XSS_result_Model} footer={[]} onCancel={() => {
                this.props.dispatch({
                    type: 'xss/update',
                    payload: { Check_one_XSS_result_Model: false }
                })
            } }>
                <Form horizontal onSubmit={this.handleSubmit}>

                    {FormItemArr}


                </Form>
            </Modal>
        );
    }
});

// Check_one_XSS_result = createForm()(Check_one_XSS_result);
Check_one_XSS_result = connect(({xss}) => {
    return { xss };
})(Check_one_XSS_result);

export default Check_one_XSS_result;

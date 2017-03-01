import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message, notification, Modal, Form, Input, Button, Row, Col, Menu, Dropdown, Icon, Table, Switch,Popconfirm } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
var moment = require('moment');

var Projects = React.createClass({

    getInitialState() {
        return {};
    },
    componentDidMount() {
        this.props.dispatch({
            type: 'xss/GET_XSS_project'
        });
    },
    render() {
        return <Table dataSource={this.props.xss.XSS_projects} columns={[{
            title: '项目名称',
            dataIndex: 'xssProjectName',
            key: 'xssProjectName',
            render(text, row) {
                return <a href={"#/main/project/" + row.id}>{text}</a>
            }
        }, {
            title: '项目描述',
            dataIndex: 'xssProjectDescribe',
            key: 'xssProjectDescribe',
        }, {
            title: '内容数',
            dataIndex: 'cout',
            key: 'cout',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(text, row) {
                if (text === "" || text == null) { return ""; }
                return moment(new Date(text)).format('YYYY-MM-DD')
            }
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: (text, row) => {
                //console.log(this)
                return <div>
                <Popconfirm title="确定删除该项目吗?" onConfirm={()=>{
                    this.props.dispatch({
                        type: 'xss/DELETE_XSS_project',
                        payload: { id: text }
                    })
                }} onCancel={()=>{}} okText="Yes" cancelText="No">
                 <Button >删除</Button>
            </Popconfirm>
                <Button onClick={() => {
                    this.props.dispatch({
                        type: 'xss/update',
                        payload: { Update_XSS_project_id: text,Update_XSS_project_Model:true }
                    })
                } }>修改</Button></div>
            }
        }]} />
    }
});


Projects = connect(({xss}) => {
    return { xss };
})(Projects);

export default Projects;
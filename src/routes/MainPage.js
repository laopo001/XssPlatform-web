import React, { Component, PropTypes } from 'react';


//var CodeMirror = require('./ReactCodeMirror');
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';
//import Ex from '../components/example'
import { message, notification, Modal, Form, Input, Button, Row, Col, Menu, Dropdown, Icon, Table, Switch, Breadcrumb } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
var moment = require('moment');
import Create_XSS_module_Form from "../components/Create_XSS_module_Form"
import Create_XSS_projects_Form from "../components/Create_XSS_projects_Form"
import Update_XSS_module_Form from "../components/Update_XSS_module_Form"
import Update_XSS_projects_Form from "../components/Update_XSS_projects_Form"
import Check_XSS_projects_Form from "../components/Check_XSS_module_Form"




class mainPage extends Component {
    constructor() {
        super();
        this.state = {
            code:'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
        }
    }
    componentDidMount() {

        this.props.dispatch({
            type: 'users/checkLogin'
        });
        this.props.dispatch({
            type: 'xss/Get_XSS_module'
        });
        this.props.dispatch({
            type: 'xss/Get_XSS_public_module'
        });
        setTimeout(() => {
            if (!this.props.users.isLogin) {
                location.href = "#/login"
            }
        }, 1000)
    }
    MenuClick(e) {
        //console.log('click ', e);
        //console.log(this);
        if (e.key.match(/^publicModules/)) {
            var id = e.key.replace(/^publicModules/, "")
            this.props.dispatch({
                type: 'xss/update',
                payload: { Check_XSS_module_Model: true, Check_XSS_module_id: id }
            });
            return;
        }
        if (e.key.match(/^modules/)) {
            var id = e.key.replace(/^modules/, "")
            this.props.dispatch({
                type: 'xss/update',
                payload: { Update_XSS_module_Model: true, Update_XSS_module_id: id }
            });
        } else {
            switch (e.key) {
                case "1": this.props.dispatch({
                    type: 'xss/update',
                    payload: { Create_XSS_project_Model: true }
                });
                    break;
                case "2": this.props.dispatch({
                    type: 'xss/update',
                    payload: { Create_XSS_module_Model: true }
                });
                    break;
            }
        }
    }
    render() {
        var temp;
        if (this.props.users.isLogin) {
            temp = <div style={{ float: 'right' }}><label>欢迎您</label>&nbsp;&nbsp;<Dropdown overlay={<Menu>
                <Menu.Item>
                    <a href="#" >返回登录</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="#" onClick={() => {
                        this.props.dispatch({
                            type: 'users/exitLogin'
                        });
                    } }>退出</a>
                </Menu.Item>
            </Menu>}>
                <Button type="ghost" style={{ marginLeft: 8 }}>
                    {this.props.users.userName}<Icon type="down" />
                </Button>
            </Dropdown></div>
        }
        var modules = this.props.xss.XSS_modules.map((x, index) => {
            if(x.isPublic==1){
                return <Menu.Item key={"modules" + x.id}>{x.xssModuleName+"(公共)"}</Menu.Item>
            }
            return <Menu.Item key={"modules" + x.id}>{x.xssModuleName}</Menu.Item>
        })
        var modules2 = this.props.xss.XSS_public_modules.map((x, index) => {
            return <Menu.Item key={"publicModules" + x.id}>{x.xssModuleName}</Menu.Item>
        })
        var isDeveloper;
        if(this.props.users.isDeveloper){

            isDeveloper=  <Menu onClick={this.MenuClick.bind(this)}
                                style={{ width: '100%' }}
                                defaultOpenKeys={['sub1', 'sub2','sub3']}
                                mode="inline"
                                >
                                <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>功能</span></span>}>
                                <Menu.Item key="1">创建项目</Menu.Item>
                                <Menu.Item key="2">创建模块</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>我的模块</span></span>}>
                                    {modules}
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>公共模块</span></span>}>
                                    {modules2}
                                </SubMenu>
                            </Menu>
        }else{
            isDeveloper=<Menu onClick={this.MenuClick.bind(this)}
                                style={{ width: '100%' }}
                                defaultOpenKeys={['sub1', 'sub2','sub3']}
                                mode="inline"
                                >
                <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>功能</span></span>}>
                      <Menu.Item key="1">创建项目</Menu.Item>   
               </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>公共模块</span></span>}>
                       {modules2}
               </SubMenu>
               </Menu>
        }
        return (<div>
            <Row type="flex" className={styles.bg} align="middle">
                <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8, offset: 4 }}><h1>平台</h1></Col>
                <Col xs={{ span: 11 }} lg={{ span: 4, offset: 3 }} >
                    {temp}
                </Col>
            </Row>
            <Row >
                <Col md={{ span: 24 }} lg={{ span: 22, offset: 1 }}>
                    <Row gutter={16}>
                        <Col span={5}>
                                {isDeveloper}
                        </Col>
                        <Col span={19} >

                            <div
                                style={{
                                    marginBottom: 15,
                                    marginTop: 15,
                                    paddingBottom: 15,
                                    borderBottom: '1px dashed #ccc',
                                }}
                                >  
                                
                                 <Breadcrumb {...this.props}  /> </div>
  
                            {this.props.children}
                            {
                                // <Table dataSource={this.props.xss.XSS_projects} columns={[{
                                //     title: '项目名称',
                                //     dataIndex: 'xssProjectName',
                                //     key: 'xssProjectName',
                                // }, {
                                //     title: '项目描述',
                                //     dataIndex: 'xssProjectDescribe',
                                //     key: 'xssProjectDescribe',
                                // }, {
                                //     title: '内容数',
                                //     dataIndex: 'cout',
                                //     key: 'cout',
                                // }, {
                                //     title: '创建时间',
                                //     dataIndex: 'createTime',
                                //     key: 'createTime',
                                //     render(text, row) {
                                //         if (text === "" || text == null) { return ""; }
                                //         return moment(new Date(text)).format('YYYY-MM-DD')
                                //     }
                                // }, {
                                //     title: '操作',
                                //     dataIndex: 'id',
                                //     key: 'id',
                                //     render: (text, row) => {
                                //         //console.log(this)
                                //         return <Button onClick={() => {
                                //             this.props.dispatch({
                                //                 type: 'xss/DELETE_XSS_project',
                                //                 payload: { id: text }
                                //             })
                                //         } }>删除</Button>
                                //     }
                                // }]} />
                            }
                        </Col>
                    </Row>

                </Col>
            </Row>

            <Create_XSS_projects_Form />
            <Update_XSS_projects_Form />
            <Create_XSS_module_Form />
            <Update_XSS_module_Form />
            <Check_XSS_projects_Form/>
        </div >
        )
    }
}

// mainPage.propTypes = {
//     router: React.PropTypes.object.isRequired
// };
// mainPage.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

function mapStateToProps({users, xss}) {
    return { users, xss };
}

export default connect(mapStateToProps)(mainPage);

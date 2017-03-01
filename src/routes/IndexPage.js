import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';
//import Ex from '../components/example'
import { withRouter } from 'dva/router';
import { message, notification, Modal, Form, Input, Button, Row, Col, Menu, Dropdown, Icon } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;


function noop() {
    return false;
}



var LoginForm = React.createClass({

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
            this.props.dispatch({
                type: 'users/login',
                payload: { userObj: values }
            });
        });

    },
    userExists(rule, value, callback) {
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
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                    help={isFieldValidating('userName') ? '校验中...' : (getFieldError('userName') || []).join(', ')}
                >
                    {getFieldDecorator('userName', {
                        rules: [
                            { required: true, message: '请填写用户名' },
                            //    { validator: this.userExists },
                        ],
                    })(<Input addonBefore={<Icon type="user" />} placeholder="请填写用户名" />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, whitespace: true, message: '请填写密码' },
                        ],
                    })(<Input addonBefore={<Icon type="lock" />} type="password" autoComplete="off" placeholder="请填写密码" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />)}


                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.handleSubmit} htmlType="submit">登录</Button>
                </FormItem>
            </Form>
        );
    }
});

LoginForm = createForm()(LoginForm);
LoginForm = connect(({users}) => {
    return { users };
})(LoginForm);

class IndexPage extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'users/checkLogin'
        });
        if(Notification!=null){
            Notification.requestPermission( function(status) {});
        }
        

        
    }
    render() {
        var temp;

        if (this.props.users.isLogin) {
            temp = <div style={{ float: 'right' }}><label>欢迎您</label>&nbsp;&nbsp;<Dropdown overlay={<Menu>
                <Menu.Item>
                    <a href="#/main" onClick={() => {
                        // location.href="#/main";
                        //   this.context.router.push('main')
                        //  console.log(this);


                    }}>进入后台</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="#" onClick={() => {
                        this.props.dispatch({
                            type: 'users/exitLogin'
                        });
                    }}>退出</a>
                </Menu.Item>
            </Menu>}>
                <Button type="ghost" style={{ marginLeft: 8 }}>
                    {this.props.users.userName}<Icon type="down" />
                </Button>
            </Dropdown></div>
        } else {
            temp = <div style={{ float: 'right' }}><ButtonGroup>
                <Button type="ghost" onClick={() => {
                    this.props.dispatch({
                        type: 'users/updateLoginVisible',
                        payload: { loginVisible: true }
                    })
                }}>登录</Button>&nbsp;<Button type="ghost">注册</Button>
            </ButtonGroup></div>
        }
        return (<div>
            <Row type="flex" className={styles.bg} align="middle">

                <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8, offset: 4 }}><h1>平台</h1></Col>
                <Col xs={{ span: 11 }} lg={{ span: 4, offset: 3 }} >
                    {temp}
                </Col>

            </Row>

            <Modal title="登录" visible={this.props.users.loginVisible} footer={[]} onCancel={() => {
                this.props.dispatch({
                    type: 'users/updateLoginVisible',
                    payload: { loginVisible: false }
                })
            }}>
                <LoginForm />
            </Modal>
        </div >
        )
    }
}

// IndexPage.propTypes = {
//       router: React.PropTypes.object.isRequired
// };
IndexPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};


function mapStateToProps({users}) {
    return { users };
}

export default withRouter(connect(mapStateToProps)(IndexPage));

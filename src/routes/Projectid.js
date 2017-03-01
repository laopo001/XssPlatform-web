import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message, notification, Modal, Form, Input, Button, Row, Col, Menu, Dropdown, Icon, Table, Switch, Pagination, Popover } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
var moment = require('moment');
import Check_one_XSS_result from "../components/Check_one_XSS_result"

var Projectid = React.createClass({

    getInitialState() {
        return {
            index: 1,
            page_size: 10,
            loading: false,
        };
    },
    componentDidMount() {

        this.select();
    },
    select() {

        this.props.dispatch({
            type: "xss/Get_one_project_xss",
            payload: {
                id: this.props.params.id,
                index: this.state.index,
                size: this.state.page_size
            }
        })
    },
    render() {
        var columns = this.props.xss.one_project_xss.columns.map((x, index) => {
            var title, dataIndex;
            var arr = x.split("|");
            if (arr.length == 1) {
                title = x;
                dataIndex = x;
            } else {
                title = arr[1];
                dataIndex = arr[0];
            }
            return {
                title: title,
                dataIndex: dataIndex,
                key: index,
                render: (text) => {
                    try {
                        if (text.length > 45) {
                            // return <Tooltip placement="bottom" title={text}>
                            //     <p style={{ width: "500px" }} className="plus_omit">{text}</p>
                            // </Tooltip>;
                            return <Popover content={text} trigger="hover">
                                <p style={{ width: "250px" }} className="plus_omit">{text}</p>
                            </Popover>
                        }
                        else {
                            return text;
                        }
                    }
                    catch (e) {
                        return "";
                    }

                }
            }
        })
        columns.push({
            title: "IP",
            dataIndex: "IP_address",
            key: "IP_address",
            // render: (ip) => {
            //     if (ip.substr(0, 7) === "::ffff:") {
            //         ip = ip.substr(7)
            //     }
            //     if(ip === "::1"){
            //         ip='127.0.0.1'
            //     }
            //     return ip;
            // }
        })
        columns.unshift({
            title: "添加时间",
            dataIndex: "createTime",
            key: "createTime",
            render: (text) => {
                if (text === "" || text == null) { return ""; }
                return moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')
            },
        })
        columns.unshift({
            title: "操作",
            dataIndex: "id",
            key: "id",
            fixed: 'left',
            render: (text, row) => {
                return <Button onClick={() => {
                    
                    this.props.dispatch({
                        type: 'xss/update',
                        payload: { Check_one_XSS_result_obj: row, Check_one_XSS_result_Model: true }
                    })
                } }>查看</Button>

            },
        })
        let data = this.props.xss.one_project_xss.items;
        data.map((x) => {
            var temp = "{}";
            for (var i in x) {
                if (i == 'info') {
                    temp = x[i];

                }
            }
            Object.assign(x, JSON.parse(temp))
        })
        return <div><Table dataSource={this.props.xss.one_project_xss.items} columns={columns} pagination={false} />
            <Pagination showTotal={(total) => { return `共 ${total} 条`; } } showSizeChanger onShowSizeChange={(current, pageSize) => { this.setState({ page_size: pageSize }, () => { this.select(); }) } }
                onChange={(index) => { this.setState({ index: index }, () => { this.select(); }) } } defaultCurrent={1} current={this.state.index} total={this.props.xss.one_project_xss.count} />
            <Check_one_XSS_result />
        </div>
    }
});

Projectid = connect(({xss}) => {
    return { xss };
})(Projectid);

export default Projectid;
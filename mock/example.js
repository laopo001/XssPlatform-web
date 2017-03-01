'use strict';

module.exports = {

  'GET /users/checkLogin': function (req, res) {
    setTimeout(function () {
       res.json({ status: 1, messages: "登录成功", data: { userName:'123456', email: '353272497@qq.com', isDeveloper: 1 } });
    }, 500);
  },
  'GET /xss/GET_XSS_project': function (req, res) {
    setTimeout(function () {
       res.json({"status":1,"messages":"查询成功","data":[{"id":27,"xssProjectName":"1123","xssProjectDescribe":"1123","createTime":"2016-11-23T02:34:52.000Z","cout":9,"xssModuleIDs":"[\"15\",\"16\",\"17\",\"18\"]","createrID":1,"uuid":"69826b80-b125-11e6-909e-390e43ed2ed6"}]});
    }, 500);
  }, 
  'POST /xss/Get_XSS_module': function (req, res) {
    setTimeout(function () {
        res.json({ status: 1, messages: "查询成功", data: [] });
    }, 500);
  },
  'POST /xss/Get_XSS_public_module': function (req, res) {
    setTimeout(function () {
        res.json({ status: 1, messages: "查询成功", data: [] });
    }, 500);
  },
    'POST /xss/Get_one_project_xss': function (req, res) {
    setTimeout(function () {
        res.json({ status: 1, messages: "查询成功", data:{ items:[],count:0,columns:[] }});
    }, 500);
  },
};

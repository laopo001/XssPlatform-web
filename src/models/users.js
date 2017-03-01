
import { message } from 'antd';
import { login, checkLogin, exitLogin } from '../services/services'
var io = require('socket.io-client')

function RunSocket(data) {
  if(Notification==null){return;}
  var socket = io('/');
  socket.on('connect', function () {
    console.log('connect');
    socket.emit("join", { userName: data.data.userName })
  });
  socket.on('receive', function (data) {
    console.log('receive')
    var n = new Notification(data.userName + "---通知来了", { body: data.xssProjectName + "---项目更新了" ,icon:"img/message.jpg"});
  });
  socket.on('disconnect', function () { console.log('disconnect') });
}
export default {

  namespace: 'users',

  state: {
    isDeveloper: 0,
    loginVisible: false,
    isLogin: false,
    userName: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(login, payload.userObj);
      if (!data) { return; }
      if (data.status == 1) {
        RunSocket(data);

        yield put({
          type: "updateLogin",
          payload: {
            isLogin: true,
            userName: data.data.userName,
            isDeveloper: data.data.isDeveloper,
          }
        });
        yield put({
          type: "updateLoginVisible",
          payload: {
            loginVisible: false
          }
        });
        message.success(data.messages);
      } else {
        message.warning(data.messages);
      }
    },
    *checkLogin({ payload }, { call, put }) {
      const { data } = yield call(checkLogin);
      if (!data) { return; }
      if (data && data.status == 1) {
        RunSocket(data);
        yield put({
          type: "updateLogin",
          payload: {
            isLogin: true,
            userName: data.data.userName,
            isDeveloper: data.data.isDeveloper
          }
        });
      } else {
        yield put({
          type: "updateLogin",
          payload: {
            isLogin: false,
            userName: ""
          }
        });
      }
    },
    *exitLogin({ payload }, { call, put }) {
      const { data } = yield call(exitLogin);
      if (!data) { return; }
      if (data && data.status == 1) {
        yield put({
          type: "updateLogin",
          payload: {
            isLogin: false,
            userName: ""
          }
        });
        message.success(data.messages);
      }
    },
  },

  reducers: {
    updateLogin(state, action) {
      return { ...state, ...action.payload };
    },
    updateLoginVisible(state, action) {
      return { ...state, ...action.payload };
    },
  },

}

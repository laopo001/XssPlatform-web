
import { message } from 'antd';
import { GET_XSS_project, Create_XSS_project, DELETE_XSS_project, Create_XSS_module, Get_XSS_module, Update_XSS_module, DELETE_XSS_module, Get_one_project_xss, Update_XSS_project ,Get_XSS_public_module} from '../services/services'
export default {
  namespace: 'xss',

  state: {
    XSS_projects: [],
    XSS_modules: [],
    XSS_public_modules:[],
    Update_XSS_project_id: null,
    one_project_xss: {
      columns: [],
      items: [],
      count: 0
    },
    Create_XSS_project_Model: false,
    Create_XSS_module_Model: false,
    Update_XSS_module_Model: false,
    Update_XSS_project_Model: false,
    Check_XSS_module_Model:false,
    Check_one_XSS_result_Model:false,
    Check_one_XSS_result_obj:{},
    Update_XSS_module_id: null,
    Check_XSS_module_id:null
  },
  effects: {
    *GET_XSS_project({ payload }, { call, put }) {
      const { data } = yield call(GET_XSS_project, payload);
      if (data && data.status == 1) {
        yield put({
          type: "update",
          payload: {
            XSS_projects: data.data
          }
        });
      } else {
        message.warning(data.messages);
      }
    },
    *Create_XSS_project({ payload }, { select, call, put }) {
      const { data } = yield call(Create_XSS_project, payload);
      // console.log(yield select());
      if (!data) { return; }
      if (data && data.status == 1) {
        yield put({
          type: "GET_XSS_project",
          payload: {}
        });
        yield put({
          type: "update",
          payload: {
            Create_XSS_project_Model: false
          }
        });
        message.success(data.messages);
      } else {
        message.warning(data.messages);
      }
    },
    *DELETE_XSS_project({ payload }, { select, call, put }) {
      const { data } = yield call(DELETE_XSS_project, payload);
      if (data && data.status == 1) {
        yield put({
          type: "GET_XSS_project",
          payload: {}
        });
        message.success(data.messages);
      } else {
        message.warning(data.messages);
      }
    },
    *Create_XSS_module({ payload }, { call, put }) {
      const { data } = yield call(Create_XSS_module, payload);
      if (!data) { return; }
      if (data.status == 1) {
        message.success(data.messages);
        yield put({
          type: "Get_XSS_module",
          payload: {}
        });
        yield put({
          type: "update",
          payload: {
            Create_XSS_module_Model: false
          }
        });
      } else {
        message.warning(data.messages);
      }
    },
    *Get_XSS_module({ payload }, { call, put }) {
      const { data } = yield call(Get_XSS_module, payload);
      if (!data) { return; }
      if (data.status == 1) {
        yield put({
          type: "update",
          payload: {
            XSS_modules: data.data
          }
        });
      }
    },
    *Update_XSS_module({ payload }, { call, put }) {
      const { data } = yield call(Update_XSS_module, payload);
      if (!data) { return; }
      if (data.status == 1) {
        message.success(data.messages);
        yield put({
          type: "Get_XSS_module",
          payload: {}
        });
        yield put({
          type: "update",
          payload: {
            Update_XSS_module_Model: false
          }
        });
      } else {
        message.warning(data.messages);
      }
    },
    *DELETE_XSS_module({ payload }, { call, put }) {
      const { data } = yield call(DELETE_XSS_module, payload);
      if (!data) { return; }
      if (data.status == 1) {
        message.success(data.messages);
        yield put({
          type: "update",
          payload: {
            Update_XSS_module_Model: false,Update_XSS_module_id:null
          }
        })
        yield put({
          type: "Get_XSS_module",
          payload: {}
        });

      } else {
        message.warning(data.messages);
      }
    },
    *Get_one_project_xss({ payload }, { call, put }) {
      const { data } = yield call(Get_one_project_xss, payload);
      if (!data) { return; }
      if (data.status == 1) {
        data.data.items=data.data.items.map((x)=>{
            x.IP_address=((ip)=>{
              if (ip.substr(0, 7) === "::ffff:") {
                    ip = ip.substr(7)
                }
                if(ip === "::1"){
                    ip='127.0.0.1'
                }
                return ip;
            })(x.IP_address)
              return x
            })
        yield put({
          type: "update",
          payload: {
            one_project_xss: data.data
          }
        });
      }
    },

    *Update_XSS_project({ payload }, { call, put }) {
      const { data } = yield call(Update_XSS_project, payload);
      if (!data) { return; }
      if (data.status == 1) {
        message.success(data.messages);
        yield put({
          type: "GET_XSS_project",
          payload: {}
        });
        yield put({
          type: "update",
          payload: {
            Update_XSS_project_Model: false
          }
        })
      } else {
        message.warning(data.messages);
      }
    },
    *Get_XSS_public_module({ payload }, { call, put }) {
      const { data } = yield call(Get_XSS_public_module, payload);
      if (!data) { return; }
      if (data.status == 1) {
        yield put({
          type: "update",
          payload: {
            XSS_public_modules: data.data
          }
        })
      } 
    },
  },

  reducers: {
    update(state, action) {
      return { ...state, ...action.payload };
    }
  },

}

import request from '../utils/request';

// var parseParam = function (param, key) {
//   var paramStr = "";
//   var t = typeof (param);
//   if (t == 'string' || t == 'number' || t == 'boolean') {
//     paramStr += "&" + key + "=" + encodeURIComponent(param);
//   } else {

//     for (var i in param) {
//       var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
//       paramStr += '&' + parseParam(param[i], k);
//     };
//   }
//   return paramStr.substr(1);
// };
var parseParam = function (param) {
  var paramStr="";
	for(var x in param) {
			if(typeof param[x] === 'object') {
				param[x] = JSON.stringify(param[x])
			}
			param[x] = encodeURIComponent(param[x])
			paramStr += '&' + x + '=' + param[x]
		}

  return paramStr.substr(1);
};

export async function login(userObj) {
  return request('/users/login', {
    method: "post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    credentials: 'include',
    body: parseParam(userObj)
  });
}

export async function checkLogin(userObj) {
  return request('/users/checkLogin', { method: 'get', credentials: 'include' });
}
export async function exitLogin(userObj) {
  return request('/users/exitLogin', { method: 'get', credentials: 'include' });
}
export async function GET_XSS_project(userObj) {
  return request('/xss/GET_XSS_project', { method: 'get', credentials: 'include' });
}
export async function Create_XSS_project(userObj) {
  return request('/xss/Create_XSS_project', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}

export async function DELETE_XSS_project(userObj) {
  return request('/xss/DELETE_XSS_project', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}

export async function Create_XSS_module(userObj) {
  return request('/xss/Create_XSS_module', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}
export async function Get_XSS_module(userObj) {
  return request('/xss/Get_XSS_module', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}
export async function Update_XSS_module(userObj) {
  return request('/xss/Update_XSS_module', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}
export async function DELETE_XSS_module(userObj) {
  return request('/xss/DELETE_XSS_module', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}
export async function Get_one_project_xss(userObj) {
  return request('/xss/Get_one_project_xss', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}
export async function Update_XSS_project(userObj) {
  return request('/xss/Update_XSS_project', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}
export async function Get_XSS_public_module(userObj) {
  return request('/xss/Get_XSS_public_module', {
    method: 'post', credentials: 'include', headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, body: parseParam(userObj)
  });
}
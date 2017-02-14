import fetch from 'dva/fetch';
import { message } from 'antd';
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }else{
    message.error(response.status+'-'+response.statusText);
    console.error(response.status+'-'+response.statusText);
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function checkStatus2(data){
    if(data.status==1){
      // message.success(data.messages);
      return data;
    }
    if(data.status==0){
      message.warning(data.messages);
      console.warn(data.messages)
      return null;
    }
    if(data.status==2){
      console.warn(data.messages)
      return null;
    }
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    //.then(checkStatus2)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

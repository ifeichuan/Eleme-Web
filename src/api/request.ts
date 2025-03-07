import axios from 'axios';
import { showDialog } from 'vant';

const request = axios.create({
  // baseURL: 'https://dog.ceo',
  timeout: 5000,
});

request.interceptors.response.use((response) => {
  const { data: _data } = response;
  const { data, msg, code } = _data;
  if (code !== 200) {
    showDialog({
      message: msg,
    }).then(() => {
      // 关闭弹窗的逻辑
    });
    return Promise.reject(msg);
  }
  return data;
});

export default request;

import axios from 'axios';
import { showDialog } from 'vant';

const request = axios.create({
  // baseURL: 'http://localhost:8000/api',
  timeout: 5000,
  headers: {
    // 'Content-Type': 'application/json',
    "Cache-Control": 'max-age=31536000'
  },
});

request.interceptors.response.use((response) => {
  const { data: _data } = response;
  const { data, msg, code } = _data;
  console.log(response.data)
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

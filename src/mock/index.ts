import mockjs from 'mockjs';

import './user';
import './home';
import './search';
import './shopList';
const Mock = mockjs;
Mock.setup({
  timeout: '1000',
});

console.log('mock server is running', Mock.Random.cname());
export default Mock;

import mockjs from 'mockjs';

import './user';
import './home';
import './search';

const Mock = mockjs;
Mock.setup({
  // timeout: '3000',
});

console.log('mock server is running', Mock.Random.cname());
export default Mock;

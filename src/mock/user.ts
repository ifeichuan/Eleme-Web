import mockjs from 'mockjs';
const Mock = mockjs;

Mock.mock('/api/user', 'get', {
	msg: 'random',
	code: '200',
	data: {
		name: '@cname',
		age: '@integer',
		phone: Mock.Random.image('500x200', 'red', 'Mock.js'),
	},
});

export default Mock;
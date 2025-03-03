使用Mock来模拟数据

## 1. 安装

```bash
pnpm add @types/mockjs mockjs
```

在src文件夹下创建`/mock/index.ts`

```ts
import mockjs from 'mockjs';
const Mock = mockjs;
Mock.mock('/api/user', 'get', {
	message: 'random',
	data: {
		name: '@cname',
		age: '@integer',
		phone: Mock.Random.image('500x200', 'red', 'Mock.js'),
	},
});
console.log('mock server is running', Mock.Random.cname());
export default Mock;
```

在`main.ts`中引入

```ts
import '@/mock/index';
```

## 2. 使用

1. 暂时注释Axios二次封装的baseURL
2. 正常使用

```ts
let data = ref()
async()=>{
    const a = await axios('/api/user',{
        method:"POST",
        headers:{

        }
    })
    data.value = {a.data}
}
```

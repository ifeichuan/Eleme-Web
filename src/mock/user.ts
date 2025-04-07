import mockjs from 'mockjs';
// import * as jwt from 'jsonwebtoken'

const Mock = mockjs;

const userList = [
  {
    username: 'Feichuan',
    password: "Feichuan05",
    avatar: '/serverImgs/me_page/serve.png',
    nickname: "方川川"
  },
  {
    username: "test",
    password: "test123",
    avatar: 'serverImgs/me_page/avatar.png',
    nickname: '测试'
  }
]
const Secret = 'Fuck Muke'
const createToken = (payload: string) => {
  // return jwt.sign(payload, Secret, {
  //   expiresIn: "7d",
  //   encoding: "utf-8"
  // })


}

Mock.mock('/api/login', (req) => {
  const { username, password } = req.body
  const user = userList.find((e) => e.username === username)
  if (user) {

  }
  else {
    return {
      code: 401,
      message: "账号不存在"
    }
  }
})

export default Mock;

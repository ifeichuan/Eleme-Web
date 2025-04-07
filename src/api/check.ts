import request from "./request";

export async function checkLogin() {
  const status = (await request.post('/api/user/checkLogin')).status
  return status === 200 ? true : false
}

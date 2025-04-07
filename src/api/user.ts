import request from "./request"
import type { ILoginInfo } from "@/types"

export const auth = ({ username, password }: ILoginInfo) => {
  return request.post('/api/auth', {
    username,
    password
  })
}

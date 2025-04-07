import type { IMeInfo } from "@/types";
import request from "./request";

export function fetchMePageData() {
  return request.get<IMeInfo, IMeInfo>('/api/me_page')
}

import request from 'Utils/request';
import { api } from 'Utils/config';


const { userLogin } = api;

export function loginService (data) {

  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}

import request from 'Utils/request';
import { api } from 'Utils/config';


const { userLoginApi,userLogoutApi } = api;

export function loginService (data) {
  return request({
    url: userLoginApi,
    method: 'post',
    data,
  })
}

export function logoutService (data) {
  return request({
    url: userLogoutApi,
    method: 'post',
    data,
  })
}

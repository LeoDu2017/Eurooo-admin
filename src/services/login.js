import request from 'Utils/request';
import { api } from 'Utils/config';

const { userLoginApi,userLogoutApi,changePasswordApi } = api;

export function loginService (data) {
  return request({
    url: userLoginApi,
    method: 'post',
    data,
  })
}

export function logoutService () {
  return request({
    url: userLogoutApi,
    method: 'get'
  })
}

export function changePasswordService (data) {
  return request({
    url: changePasswordApi,
    method: 'post',
    data,
  })
}

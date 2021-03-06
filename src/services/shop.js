import request from 'Utils/request';
import { api } from 'Utils/config';


const { getShopInfoApi,updateShopInfoApi,usersApi,delShopAdminApi,createShopAdminApi,resetPasswordApi } = api;

export function getShopInfoService () {
  return request({
    url: getShopInfoApi,
    method: 'get'
  })
}
export function updateShopInfoService(data){
  return request({
    url: updateShopInfoApi,
    method: 'post',
    data,
  })
}
export function getShopAdminsService(data){
  return request({
    url: usersApi,
    data,
    method: 'get'
  })
}
export function delShopAdminService(data){
  return request({
    url: delShopAdminApi,
    method: 'post',
    data,
  })
}
export function createShopAdminService(data){
  return request({
    url: createShopAdminApi,
    method: 'post',
    data,
  })
}
export function updateShopAdminService(id, values){
  const data = {...values,id};
  return request({
    url: createShopAdminApi,
    method: 'post',
    data,
  })
}
export function resetPasswordService(id){
  const data = {id};
  return request({
    url: resetPasswordApi,
    method: 'post',
    data,
  })
}
// export function delShopAdminService(id) {
//   return request(`/shop/admins/${id}`, {
//     method: 'DELETE',
//   });
// }

import request from 'Utils/request';
import { api } from 'Utils/config';

const { getBrandsListApi,delBrandApi,getBannedApi,udateBannedApi,getAllBrandsApi,updateBrandsListApi } = api;

export function getBrandsListService(data){
  return request({
    url: getBrandsListApi,
    method: 'get',
    data
  })
}
export function delBrandService(data){
  return request({
    url: delBrandApi,
    data,
    method: 'post'
  })
}
export function getBannedService(data){
  return request({
    url: getBannedApi,
    method: 'get'
  })
}
export function getAllBrandsService(data){
  return request({
    url: getAllBrandsApi,
    data,
    method: 'get'
  })
}
export function saveBannedService(data){
  return request({
    url: udateBannedApi,
    data,
    method: 'post'
  })
}
export function saveMyBrandService(data){
  return request({
    url: updateBrandsListApi,
    data,
    method: 'post'
  })
}

import request from 'Utils/request';
import { api } from 'Utils/config';

const {fetchProductApi} = api;
export function fetchProductService (data){
  return request({
    url:fetchProductApi,
    method:'get',
    data
  })
}

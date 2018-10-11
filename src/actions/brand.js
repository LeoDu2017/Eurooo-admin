import _ from "lodash"
import { Modal } from 'antd';
import { routerRedux } from 'dva/router';

const confirm = Modal.confirm;
export function getCountry(id,countries){
  return _.find(countries, { 'id': id }) && countries[_.findIndex(countries, { 'id': id })].name
}
export function removeBrand(dispatch,id,event){
  event.preventDefault();
  confirm({
    title: '提示',
    content: '您确定要删除此品牌吗？',
    onOk() {
      dispatch({
        type:'brand/removeBrand',
        payload:{id}
      })
    },
    onCancel() {
      console.log('close')
    }
  })
}
export function saveBanned(dispatch,id,areas){
  console.log(areas);
  const area = areas['areas'].join(',');

  dispatch({
    type:'brand/saveBanned',
    payload:{id,area}
  })
}
export function onChange(dispatch,id,areas){
  console.log(areas.join(','));
  dispatch({
    type:'brand/saveChanged',
    payload:{area,id}
  })
}
export function onCollection(dispatch,resetFields,changedValue){
  dispatch({
    type:'brands/saveCollection',
    payload:{changedValue,resetFields}
  })
}
export function changePageHandel(dispatch,page){
  dispatch(
    routerRedux.push({
      pathname: '/spots/brand/list',
      query: { page }
    })
  )
}
export function uploadBrandsHandler(dispatch,data){
  // console.log(data)
}

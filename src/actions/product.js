import { routerRedux } from 'dva/router';

// 翻页
export function changePageHandel(dispatch,page){
  dispatch(
    routerRedux.push({
      pathname: '/spots/product/list',
      query: { page }
    })
  )
}
// 删除商品
export function deleteHandler(dispatch,id){
  console.log(id)
}

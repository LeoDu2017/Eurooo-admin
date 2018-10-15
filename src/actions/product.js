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

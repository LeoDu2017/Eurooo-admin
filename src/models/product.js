import { fetchProductService } from 'Services/product'
export default {
  namespace:'product',
  state:{
    total:0,
    current:1,
    products:[]
  },
  reducers:{
    setTotal(state,{payload:total}){
      return{ ...state,total}
    },
    setCurrent(state,{payload:current}){
      return{ ...state,current}
    },
    setProducts(state,{payload:products}){
      return{ ...state,products}
    }
  },
  effects:{
    *fetchProducts({payload},{put,select,call}){
      const result = yield call(fetchProductService,payload);

      if(result.success){
        yield put({
          type:'setProducts',
          payload:result.data
        });
        yield put({
          type:'setTotal',
          payload: result.total
        })
      }
    }
  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({pathname,query}) => {
        let arr = pathname.split('/');
        let subChildLink = arr[2];
        if(subChildLink === 'product'){
          dispatch({
            type:'fetchProducts',
            payload:query,
          });
          dispatch({
            type:'setCurrent',
            payload:query.page ? Number(query.page) : 1
          })
        }
      })
    }
  }
}

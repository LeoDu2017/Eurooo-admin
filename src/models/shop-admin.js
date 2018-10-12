import { message } from 'antd';
import {
  getShopAdminsService,
  delShopAdminService,
  createShopAdminService,
  updateShopAdminService,
  resetPasswordService} from 'Services/shop';
const admin = {
  namespace:'admin',
  state:{
    shopAdmins:[],
    total:0,
    current:1,
  },
  reducers:{
    setShopAdmins(state,{payload:shopAdmins}){
      return {...state,shopAdmins}
    },
    setTotal(state,{payload:total}){
      return {...state,total}
    },
    setCurrent(state,{payload:current}){
      return {...state,current}
    }
  },
  effects:{
    *getShopAdmins({payload},{select,call, put}){
      debugger
      const {data,total} = yield call(getShopAdminsService, payload);

      yield put({
        type:'setShopAdmins',
        payload:data
      });
      yield put({
        type:'setTotal',
        payload:total
      })
    },
    *deleteShopAdmin({payload},{select,call, put}){
      const data = yield call(delShopAdminService, payload);
      if(data.status === 1){
        message.success(data.msg);
        yield put({
          type:'getShopAdmins'
        })
      }
    },
    *createShopAdmin({ payload: values }, { call, put, select }) {
      const data = yield call(createShopAdminService, values);
      // const page = yield select(state => state.users.page);
      if(data.status === 1) {
        message.success(data.msg);
        yield put({type: 'getShopAdmins', payload: {}});
      }
    },
    *editShopAdmin({ payload }, { call, put, select }) {
      const {id,values} = payload;
      const data = yield call(updateShopAdminService, id, values);
      if(data.status === 1) {
        message.success('编辑成功');
        yield put({type: 'getShopAdmins', payload: {}});
      }

      // const page = yield select(state => state.users.page);
      // yield put({ type: 'fetch', payload: { page } });
    },
    *resetPassword({ payload:id }, { call, put, select }) {
      const data = yield call(resetPasswordService,id);
      if(data.status === 1) {
        message.success('重置成功');
      }

      // const page = yield select(state => state.users.page);
      // yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ pathname,query}) => {
        let arr = pathname.split('/');
        let subChildLink = arr[3];
        if(subChildLink === 'admin'){
          dispatch({
            type:'getShopAdmins',
            payload:query
          });
          dispatch({
            type:'setCurrent',
            payload:Number(query.page)
          });
        }
      });
    }
  }
};
export default admin;



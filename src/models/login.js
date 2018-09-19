import { loginService } from 'Services/login';
import { routerRedux } from 'dva/router';
export default{
  namespace:'login',
  state:{
    isLogin: false,
    loginFail: false,
    currentIndex: 0,
  },
  reducers:{
    change(state,{payload:index}){
      return{...state,currentIndex:index}
    },
    checklogin(state,action) {
      return {...state,isLogin:action.payload.isLogin };
    },
    loginFail(state, action) {
      return {...state, loginFail:action.payload.loginFail};
    }
  },
  effects:{
    *loginHandler({ payload },{ call,put }) {
      const data = yield call(loginService, payload);
      if (data && data.success) {
        yield put({
          type: 'checklogin',
          payload:{
            isLogin:true,
          }
        });
        yield put(routerRedux.push('/'));
      }else{
        yield put({
          type: 'loginFail',
          payload:{
            loginFail:true,
          }
        });
      }
    }
  },
  subscriptions:{}
}

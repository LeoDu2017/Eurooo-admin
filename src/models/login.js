import { loginService,logoutService } from 'Services/login';
import { routerRedux } from 'dva/router';
import appCookie from 'react-cookies';

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
      const { administrator } = data;

      if (data && data.success) {
        yield put({
          type: 'checklogin',
          payload:{
            isLogin:true,
          }
        });
        yield put(routerRedux.push('/'));
        yield put({
          type:'app/setAdmin',
          payload:administrator
        })
      } else {
        yield put({
          type: 'loginFail',
          payload:{
            loginFail:true,
          }
        });
      }
    },
    *logoutHandler({ payload },{ call,put }){
      const data = yield call(logoutService,payload);
      if(data.success){
        yield appCookie.remove('token');
        yield put(window.location.reload())
      }
    }
  }
}

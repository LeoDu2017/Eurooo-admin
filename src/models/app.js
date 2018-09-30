import appCookie                  from 'react-cookies';
import { routerRedux }            from 'dva/router';
import { changePasswordService }  from 'Services/app';

export default{
  namespace:'app',
  state:{
    collapsed: false,
    currentIndex: 0,
    administrator: {
      id:'',
      username:'',
      avatar:'',
      title:'',
      contactNumber:'',
      notifyCount: 0,
    }
  },
  reducers:{
    setAdmin(state,{payload:administrator}){
      return{ ...state,administrator }
    },
    setCollapsed(state,{payload:collapsed}){
      return{ ...state,collapsed }
    },
    setCurrentIndex(state,{payload:currentIndex}){
      return{ ...state,currentIndex }
    }
  },
  effects:{},
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ pathname,query }) => {
        const token = appCookie.load('token');
        // 设置系统语言
        dispatch({ type:'lang/setLocale',payload:{query} });

        if(pathname !== '/login'){
          // 设置登录状态
          !token ? dispatch(routerRedux.push('/login')) :
            dispatch({
              type:'setAdmin',
              payload: token.administrator
            });
          // 设置导航打开状态
          dispatch({
            type:'sideMenu/getAppMenuData',
            payload:pathname
          })
        }
      });
    }
  }
}

import appCookie                  from 'react-cookies';
import { routerRedux }            from 'dva/router';
import { changePasswordService }  from 'Services/app';
import { triggerResizeEvent } from 'Actions/layout/menu';
export default{
  namespace:'app',
  state:{
    collapsed: false,
    isMobile: false,
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
    },
    setUserAgent(state,{payload:isMobile}){
      return{ ...state,isMobile }
    },
  },
  effects:{},
  subscriptions:{
    setup({ dispatch,history}){
      triggerResizeEvent();
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
          });
          // 设置设备类型
          let useerAgent = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
          dispatch({
            type:'setUserAgent',
            payload: useerAgent
          })
        }
      });
    }
  }
}

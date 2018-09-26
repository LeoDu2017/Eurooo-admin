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
    }
  },
  reducers:{
    setAdmin(state,{payload:administrator}){
      debugger
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
        dispatch({ type:'lang/setLocale',payload:{query} });
        if(pathname !== '/login'){
          !token ? dispatch(routerRedux.push('/login')) :
            dispatch({
              type:'setAdmin',
              payload: token.administrator
            })
        }
      });
    }
  }
}

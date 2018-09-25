import appCookie        from 'react-cookies';
import { routerRedux }  from 'dva/router';

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
        !token ? dispatch(routerRedux.push('/login')) :
          dispatch({
            type:'setAdmin',
            payload: token.administrator
          })
      });
    }
  }
}

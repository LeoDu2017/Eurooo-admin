export default{
  namespace:'login',
  state:{
    isLogin: false,
    loginfail:false,
    currentIndex: 0,
  },
  reducers:{
    change(state,{payload:index}){
      return{...state,currentIndex:index}
    },
    checklogin(state,action) {
      return {...state,isLogin:action.payload.isLogin };
    },
    loginfail(state,action) {
      return {...state, loginfail:action.payload.loginfail};
    }
  },
  effect:{},
  subscriptions:{}
}

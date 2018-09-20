export default{
  namespace:'app',
  state:{
    collapsed:false
  },
  reducers:{
    setCollapsed(state,{payload:collapsed}){
      return{ ...state,collapsed }
    }
  },
  effects:{},
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ pathname,query }) => {
        dispatch({ type:'lang/setLocale',payload:{query} });
      });
    }
  }
}

export default{
  namespace:'app',
  state:{},
  reducers:{},
  effects:{},
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ pathname,query }) => {
        dispatch({ type:'lang/setLocale',payload:{query} });
      });
    }
  }
}

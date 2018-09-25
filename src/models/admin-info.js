export default{
  namespace:'adminInfo',
  state:{},
  reducer:{},
  effects:{},
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ pathname,query }) => {

      });
    }
  }
}

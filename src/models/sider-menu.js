export default {
  namespace:'siderMenu',
  state:{
    openKeys:[]
  },
  reducers:{
    setOpenKeys(state,{payload:openKeys}){
      return { ...state,openKeys}
    }
  },
  effects:{},
  subscriptions:{}
}

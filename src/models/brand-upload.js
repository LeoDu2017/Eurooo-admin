export default{
  namespace:'uploadBrand',
  state:{
    logo:''
  },
  reducers:{
    saveUploadBrand(state,{payload:logo}){
      return { ...state,logo}
    }
  }
}

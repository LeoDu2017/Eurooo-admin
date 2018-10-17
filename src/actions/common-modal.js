export function show(dispatch,id,event){
  if (event) event.stopPropagation();
  dispatch({
    type:'commonModal/setVisible',
    payload:{[id]:true}
  })
}
export function hide(dispatch,resetFields,id){
  resetFields && resetFields();
  dispatch({
    type:'commonModal/setVisible',
    payload:{[id]:false}
  })
}
export function ok(dispatch,validateFields,callBack,id){
  if(validateFields){
    validateFields({ force: true },(err, values) => {
      console.log(values);
      if (!err) {
        dispatch({
          type:'commonModal/setVisible',
          payload:{[id]:false}
        });
        callBack(values);
      }
    })
  }else{
    dispatch({type:'commonModal/setVisible',payload:{[id]:false}});
  }
}

export function unequalNext(validateFields,rule,value,callback){
  if(value){
    validateFields(['newPassword'],{ force: true })
  }
}
export function unequalPrevAndEqualNext(validateFields,getFieldValue,errorMsg,rule,value,callback){
  if (value && value === getFieldValue('originalPassword')) {
    validateFields(['renewPassword'],{ force: true });
    callback(errorMsg)
  } else {
    callback()
  }
}
export function equalPrev(getFieldValue,errorMsg,rule,value,callback){
  if (value && value !== getFieldValue('newPassword')) {
    callback(errorMsg)
  } else {
    callback()
  }
}
export function ok(dispatch,getFieldValue,userID,callback){
  const values = {
    id:userID,
    originalPassword:getFieldValue('originalPassword'),
    newPassword:getFieldValue('newPassword')
  };
  values && callback(dispatch,values)
}

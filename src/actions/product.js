import { routerRedux } from 'dva/router';

// 翻页
export function changePageHandel(dispatch,page){
  dispatch(
    routerRedux.push({
      pathname: '/spots/product/list',
      query: { page }
    })
  )
}
// 删除商品
export function deleteHandler(dispatch,id){
  console.log(id)
}

// 添加功能
const add = (keyName,getFieldValue,setFieldsValue) => {
  let num="";
  for(let i=0;i<4;i++){
    num+=Math.floor(Math.random()*10)
  }
  const keys = getFieldValue(keyName);

  const nextKeys = keys.concat({key:num,stock:num});

  setFieldsValue({
    [keyName]: nextKeys,
  });
};
// 删除功能
const remove = (k,keyName,getFieldValue,setFieldsValue) => {
  // can use data-binding to get
  const keys = getFieldValue(keyName);
  // We need at least one passenger
  if (keys.length === 1) { return }
  // can use data-binding to set
  setFieldsValue({
    [keyName]: keys.filter(key => Number(key.key) !== Number(k.key))
  });
};
// 编辑功能
const edit = (keyName,getFieldValue,setFieldsValue,k,attr,value) => {
  const keys = getFieldValue(keyName);
  const nextKeys = keys.map(item => {
    if(Number(item.key) === Number(k.key)){
      item[attr] = value
    }
    return item
  });
  setFieldsValue({
    [keyName]: nextKeys,
  });
};

export { add,remove,edit }

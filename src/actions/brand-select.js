export function nextStepHandler(dispatch,currentStep){
  dispatch({
    type:'brandSelect/setCurrentStep',
    payload:currentStep
  });
}
export function pageChangeHandler(dispatch,page){
  dispatch({
    type:'brands/setCurrent',
    payload:page
  });
  dispatch({
    type:'brands/fetchBrandsList',
    payload:{ page }
  })
}
export function selectBrandHandler(dispatch,selecteds){
  dispatch({
    type:'brandSelect/setSelected',
    payload:selecteds
  });
}
export function saveMyBrands(dispatch){
  dispatch({
    type:'brand/saveMyBrands'
  })
}
export function changeAreaHandler(dispatch,changedValues){
  const data = changedValues.reverse()[0].split('-');
  const id = data[0];
  const a = data[1];
  dispatch({
    type:'brand/setMyBrands',
    payload:{id,a}
  })
}

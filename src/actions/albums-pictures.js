export function getPictures(id,dispatch,page){
  dispatch({
    type:'albumsPictures/getPictures',
    payload:{page,id}
  })
}

export function selectImgs(dispatch,id,single){
  dispatch({
    type:'albumsPictures/setSelectImgs',
    payload:{id,single}
  })
}

export function removeSelected(dispatch,id,event){
  event.stopPropagation();
  dispatch({
    type:'albumsPictures/removeSelectImgs',
    payload:id
  })
}

export function useSelected(dispatch,selected){
  dispatch({
    type:'albumsPictures/useSelectImgs',
    payload:selected
  })
}

export function viewImg(file){

}

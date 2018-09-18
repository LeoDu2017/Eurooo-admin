export function showAlbums(dispatch,boolenValue){
  dispatch({
    type:'albums/setDisplay',
    payload:boolenValue
  })
}



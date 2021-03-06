import _ from "lodash";
import { getPicture } from 'Services/albums';
const pictures = {
  namespace:'albumsPictures',
  state:{
    list:[],
    page:1,
    total:0,
    selected:[],
    single:true
  },
  reducers:{
    save(state,{payload:{list,page,total}}){
      return { ...state,list,page,total}
    },
    saveSelected(state,{payload:selected}){
      return { ...state,selected }
    }
  },
  effects:{
    *getPictures({ payload:{page=1,id=-1}},{select,call, put}){
      const {data,total} = yield call(getPicture,page,id);
      yield put({
        type:'save',
        payload:{
          list:data,
          total,
          page
        }
      })
    },
    *setSelectImgs({ payload:{id,single}},{select,call, put}){
      let imgs = yield select(({albumsPictures}) => albumsPictures.list);
      let selectedImgs = yield select(({albumsPictures}) => albumsPictures.selected);

      if(single){
        selectedImgs = [];
        selectedImgs.push(imgs.filter(i => i.id === id)[0]);
      }else{
        !_.find(selectedImgs, { id: id }) && selectedImgs.push(imgs.filter(i => i.id === id)[0]);
      }
      yield put({
        type:'saveSelected',
        payload:selectedImgs
      })
    },
    *removeSelectImgs({payload:id},{select,call,put}){
      let data = yield select(({albumsPictures}) => albumsPictures.selected);
      let selectedImgs = data.filter(item => Number(item.id) !== Number(id));
      yield put({
        type:'saveSelected',
        payload:selectedImgs
      })
    },
    *useSelected({payload},{select,call,put}){
      // let data = yield select(({pictures}) => pictures.selected);

    }
  }
};
export default  pictures;

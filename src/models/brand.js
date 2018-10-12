import _ from 'lodash';
import {
  delBrandService,
  getBannedService,
  saveBannedService,
  saveMyBrandService,
  getBrandsListService } from 'Services/brand';

const brand = {
  namespace:'brand',
  state:{
    myBrands:[],
    total:0,
    current:1,
    banned:[]
  },
  reducers:{
    setBrands(state,{payload:myBrands}){
      return {...state,myBrands}
    },
    setCurrent(state,{payload:current}){
      return {...state,current}
    },
    setTotal(state,{payload:total}){
      return {...state,total}
    },
    setBanned(state,{payload:banned}){
      return {...state,banned}
    },
    saveChanged(state,{payload}){
      let {brands} = state;
      let {id,area} = payload;
      area = area.join(',');
      brands = brands.map(item =>{
        if(item.id === id){
          return item = {...item,area}
        }else{
          return item
        }
      });
      return {...state,brands}
    },
  },
  effects:{
    *fetchBrands({payload},{select,call, put}){
      const brads = yield call(getBrandsListService, payload);
      yield put({
        type:'setBrands',
        payload:brads.data
      });
      yield put({
        type:'setTotal',
        payload:brads.total
      })
    },
    *fetchBanned({payload},{select,call, put}){
      const banned = yield call(getBannedService, payload);
      yield put({
        type:'setBanned',
        payload:banned.data
      })
    },
    *removeBrand({payload:data},{select,call,put}){
      const result = yield call(delBrandService,data);
      if(result.success){
        yield put({
          type:'fetchBrands'
        })
      }
    },
    *saveBanned({payload:{id,area}},{select,call,put}){
      const result = yield call(saveBannedService,{area,id});
      if(result.success){
        yield put({
          type:'fetchBrands'
        })
      }
    },
    *saveMyBrands({payload:id},{select,call, put}){
      const { selected } = yield select(({ brandSelect }) => brandSelect);
      const result = yield call(saveMyBrandService,selected);
      if(result.success){
        yield put({
          type:'fetchBrands'
        });
        yield put({
          type:'commonModal/setVisible',
          payload:{[id]:false}
        });
      }
    },
    *setMyBrands({payload:{id,a}},{select}){
      const { selected } = yield select(({ brandSelect }) => brandSelect);
      let { area } = yield _.find(selected,{id});
      !area.includes(a) && area.push(a);
    },
    *uploadMyBrand({payload:data},{select,call, put}){
      const key = Math.random().toString(36).substring(2);
      const serial = new Date().getTime().toString().replace(/\//g,'');
      const result = yield call(saveMyBrandService,[{...data,serial,id:key,key}]);

      if(result.success){
        yield put({
          type:'fetchBrands'
        });
        yield put({
          type:'commonModal/setVisible',
          payload:{'uploadBrands':false}
        });
      }
    }
  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ pathname,query}) => {
        let arr = pathname.split('/');
        let childLink = arr[2];
        let subChildLink = arr[3];
        if(childLink === 'brand' && subChildLink === 'list'){
          dispatch({
            type:'fetchBrands',
            payload:query
          });
          dispatch({
            type:'setCurrent',
            payload:Number(query.page)
          });
          dispatch({
            type:'fetchBanned'
          })
        }
      });
    }
  }
};

export default brand

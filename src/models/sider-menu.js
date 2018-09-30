import {
  getMenuData,
  getFlatMenuKeys,
  getSelectedKeys,
  getSelectedMenuKeys,
  getDefaultCollapsedSubMenus } from 'Actions/layout/menu';

export default {
  namespace:'sideMenu',
  state:{
    openKeys:[],
    flatMenuKeys:[],
    selectedKeys:[],
    menu:[],
    pathname:''
  },
  reducers:{
    setMenu(state,{payload:menu}){
      return { ...state,menu}
    },
    setPathname(state,{payload:pathname}){
      return { ...state,pathname}
    },
    setOpenKeys(state,{payload:openKeys}){
      return { ...state,openKeys}
    },
    setFlatMenuKeys(state,{payload:flatMenuKeys}){
      return { ...state,flatMenuKeys}
    },
    setSelectedKeys(state,{payload:selectedKeys}){
      return { ...state,selectedKeys}
    },
  },
  effects:{
    *getMenu({ payload },{ put }){
      const data = yield getMenuData();
      yield put({
        type: 'setMenu',
        payload: data
      })
    },
    *getFlatMenuKeys({ payload },{ put,select }){
      const menu = yield select( state => state['sideMenu'].menu );
      const data = yield getFlatMenuKeys( menu );
      yield put({
        type: 'setFlatMenuKeys',
        payload: data
      })
    },
    *getSelectedAndOpenKeys({ payload },{ put,select }){
      const pathname = yield select( state => state['sideMenu'].pathname );
      const flatMenuKeys = yield select( state => state['sideMenu'].flatMenuKeys );
      const data = yield getSelectedMenuKeys( pathname,flatMenuKeys );
      yield put({
        type: 'setSelectedKeys',
        payload: data
      });
      yield put({
        type: 'setOpenKeys',
        payload: data
      })
    },
    *getAppMenuData({ payload },{ put }){
      yield put({
        type:'setPathname',
        payload
      });
      yield put({type:'getMenu'}); // 获得导航数据
      yield put({type:'getFlatMenuKeys'}); // 获得一级导航
      yield put({type:'getSelectedAndOpenKeys'}); // 获得选中导航与展开导航
    }
  }
}

import appCookie                  from 'react-cookies';
import { routerRedux }            from 'dva/router';
import { changePasswordService }  from 'Services/app';
import {
  getMenuData,
  triggerResizeEvent }            from 'Actions/layout/menu';

import intl from "react-intl-universal";
export default{
  namespace:'app',
  state:{
    collapsed: false,
    isMobile: false,
    currentIndex: 0,
    administrator: {
      id:'',
      username:'',
      avatar:'',
      title:'',
      contactNumber:'',
      notifyCount: 0,
    }
  },
  reducers:{
    setAdmin(state,{payload:administrator}){
      return{ ...state,administrator }
    },
    setCollapsed(state,{payload:collapsed}){
      return{ ...state,collapsed }
    },
    setCurrentIndex(state,{payload:currentIndex}){
      return{ ...state,currentIndex }
    },
    setUserAgent(state,{payload:isMobile}){
      return{ ...state,isMobile }
    },
  },
  effects:{},
  subscriptions:{
    setup({ dispatch,history}){
      triggerResizeEvent();
      return history.listen(({ pathname,query }) => {
        const token = appCookie.load('token');
        // 设置系统语言
        dispatch({ type:'lang/setLocale',payload:{query} });
        if(pathname !== '/login'){
          const menuData = {
            index:[{
              name: intl.get('HOME'),
              icon: 'home',
              path: '',
              children: []
            }],
            spots:[
              {
                name:'',
                path:'',
                children: []
              },
              {
                name: intl.get('HOME'),
                icon: 'home',
                path: 'main',
                children: []
              },
              {
                name: intl.get('SHOP'),
                icon: 'shop',
                path: 'shop',
                children: [
                  {
                    name:intl.get('SHOPINFO'),
                    path:'info'
                  },
                  {
                    name:intl.get('SHOPADMIN'),
                    path:'admin'
                  }
                ]
              },
              {
                name:intl.get('BRAND'),
                icon: 'tags',
                path: 'brand',
                children:[
                  {
                    name:intl.get('BRANDLIST'),
                    path:'list'
                  }
                ]
              },
            {
              name: 'Pages',
              icon: 'dashboard',
              path: 'dashboard',
              children: [
                {
                  name: '分析页',
                  path: 'analysis',
                },
                {
                  name: '监控页',
                  path: 'monitor',
                },
                {
                  name: '工作台',
                  path: 'workplace',
                  // hideInBreadcrumb: true,
                  // hideInMenu: true,
                },
              ],
            }],
            futures:[{
              name: 'Home',
              icon: 'home',
              path: '/',
              children: []
            }],
          };
          // 设置登录状态
          !token ? dispatch(routerRedux.push('/login')) :
            dispatch({
              type:'setAdmin',
              payload: token.administrator
            });
          // 设置导航打开状态
          const menu = getMenuData( pathname,menuData );
          dispatch({
            type:'sideMenu/getAppMenuData',
            payload:{ pathname,menu }
          });
          // 设置设备类型
          let useerAgent = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
          dispatch({
            type:'setUserAgent',
            payload: useerAgent
          })
        }
      });
    }
  }
}

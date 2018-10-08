import {
  urlToList,
  formatter,
  isMainMenu,
  getMeunMatcheys,
  getSubMenuOrItem,
  checkPermissionItem } from 'Utils/menu-tools';

export const getMenuData          = (pathname,menuData) => {
  const menuType = pathname.split('/')[1] ? pathname.split('/')[1] : 'index';
  return formatter(menuData[menuType],`${menuType}/`)
};
export const getFlatMenuKeys      = menus => {
  let keys = [];
  menus.forEach(item => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
};
export const getNavMenuItems      = (menus,Authorized,pathname,isMobile) =>{
  if (!menus) {
    return [];
  }
  return menus
    .filter(item => item.name && !item.hideInMenu)
    .map(item => {
      // make dom
      const ItemDom = getSubMenuOrItem(item,pathname,isMobile);
      return checkPermissionItem(item.authority, ItemDom,Authorized);
    })
    .filter(item => item);
};
export const handleOpenChange     = (dispatch,menu,openKeys) => {
  const lastOpenKey = openKeys[openKeys.length - 1];
  const moreThanOne = openKeys.filter(openKey => isMainMenu(openKey,menu)).length > 1;
  dispatch({
    type:'sideMenu/setOpenKeys',
    payload: moreThanOne ? [lastOpenKey] : [...openKeys]
  });
};
export const getSelectedMenuKeys  = (pathname,flatMenuKeys) =>
  urlToList(pathname)
    .map(itemPath =>getMeunMatcheys(flatMenuKeys, itemPath).pop());


export const getDefaultCollapsedSubMenus = (pathname,flatMenuKeys) =>
  urlToList(pathname)
  .map(item => getMeunMatcheys(flatMenuKeys, item)[0])
  .filter(item => item);
export const triggerResizeEvent = () => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, false);
  window.dispatchEvent(event);
};

import {
  isUrl,
  urlToList,
  formatter,
  isMainMenu,
  getMeunMatcheys,
  getSubMenuOrItem,
  checkPermissionItem } from 'Utils/menu-tools';
import { menuData }     from 'Utils/constant';

export const getMenuData          = () => formatter(menuData);
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
export const getNavMenuItems      = (menusData,Authorized,pathname,isMobile) =>{
  if (!menusData) {
    return [];
  }
  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => {
      // make dom
      const ItemDom = getSubMenuOrItem(item,pathname,isMobile);
      return checkPermissionItem(item.authority, ItemDom,Authorized);
    })
    .filter(item => item);
}
export const handleOpenChange     = (dispatch,menu,openKeys) => {
  const lastOpenKey = openKeys[openKeys.length - 1];
  const moreThanOne = openKeys.filter(openKey => isMainMenu(openKey,menu)).length > 1;
  dispatch({
    type:'siderMenu/setOpenKeys',
    payload: moreThanOne ? [lastOpenKey] : [...openKeys]
  });
};
export const getSelectedMenuKeys  = (pathname,flatMenuKeys) => {
  return urlToList(pathname).map(itemPath => getMeunMatcheys(flatMenuKeys, itemPath).pop());
};












